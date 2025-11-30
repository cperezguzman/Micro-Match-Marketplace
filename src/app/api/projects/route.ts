import { NextRequest, NextResponse } from "next/server";
import { ResultSetHeader } from "mysql2";
import { dbPool, query } from "@/lib/db";

const USER_ID_HEADER = "x-user-id";
const ALLOWED_STATUSES = ["draft", "open", "in_progress", "completed"] as const;

type Project = {
  id: number;
  userId: number;
  title: string;
  description: string | null;
  budget: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

function requireUserId(req: NextRequest): number | null {
  const header = req.headers.get(USER_ID_HEADER);
  const userId = header ? Number(header) : NaN;
  if (!header || Number.isNaN(userId)) {
    return null;
  }
  return userId;
}

export async function GET(req: NextRequest) {
  const userId = requireUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "Missing or invalid user id header" }, { status: 401 });
  }

  try {
    const projects = await query<Project>(
      `
      SELECT
        id,
        user_id AS userId,
        title,
        description,
        budget,
        status,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM projects
      WHERE user_id = ?
      ORDER BY created_at DESC
      `,
      [userId],
    );

    return NextResponse.json(projects);
  } catch (error) {
    console.error("[projects][GET] failed", error);
    return NextResponse.json({ error: "Failed to load projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = requireUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "Missing or invalid user id header" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const title = body?.title?.toString().trim();
  const description = body?.description?.toString().trim() || null;
  const budget = body?.budget != null ? Number(body.budget) : 0;
  const status = body?.status?.toString().trim() || "open";

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  if (!ALLOWED_STATUSES.includes(status as (typeof ALLOWED_STATUSES)[number])) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    const [result] = await dbPool.execute<ResultSetHeader>(
      `
      INSERT INTO projects (user_id, title, description, budget, status)
      VALUES (?, ?, ?, ?, ?)
      `,
      [userId, title, description, budget, status],
    );

    const [project] = await query<Project>(
      `
      SELECT
        id,
        user_id AS userId,
        title,
        description,
        budget,
        status,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM projects
      WHERE id = ?
      `,
      [result.insertId],
    );

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("[projects][POST] failed", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
