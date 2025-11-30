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

function parseId(param: string): number | null {
  const id = Number(param);
  if (!param || Number.isNaN(id)) {
    return null;
  }
  return id;
}

async function fetchProject(id: number, userId: number) {
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
    WHERE id = ? AND user_id = ?
    `,
    [id, userId],
  );
  return projects[0];
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const userId = requireUserId(_req);
  if (!userId) {
    return NextResponse.json({ error: "Missing or invalid user id header" }, { status: 401 });
  }

  const id = parseId(params.id);
  if (!id) {
    return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
  }

  try {
    const project = await fetchProject(id, userId);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    console.error("[project][GET] failed", error);
    return NextResponse.json({ error: "Failed to load project" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = requireUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "Missing or invalid user id header" }, { status: 401 });
  }

  const id = parseId(params.id);
  if (!id) {
    return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  const updates: string[] = [];
  const values: Array<string | number | null> = [];

  if (body?.title != null) {
    const title = body.title.toString().trim();
    if (!title) {
      return NextResponse.json({ error: "Title cannot be empty" }, { status: 400 });
    }
    updates.push("title = ?");
    values.push(title);
  }

  if (body?.description !== undefined) {
    const description = body.description === null ? null : body.description.toString().trim();
    updates.push("description = ?");
    values.push(description);
  }

  if (body?.budget !== undefined) {
    const budget = Number(body.budget);
    if (Number.isNaN(budget)) {
      return NextResponse.json({ error: "Budget must be a number" }, { status: 400 });
    }
    updates.push("budget = ?");
    values.push(budget);
  }

  if (body?.status !== undefined) {
    const status = body.status.toString().trim();
    if (!ALLOWED_STATUSES.includes(status as (typeof ALLOWED_STATUSES)[number])) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    updates.push("status = ?");
    values.push(status);
  }

  if (updates.length === 0) {
    return NextResponse.json({ error: "No fields provided to update" }, { status: 400 });
  }

  try {
    const [result] = await dbPool.execute<ResultSetHeader>(
      `
      UPDATE projects
      SET ${updates.join(", ")}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?
      `,
      [...values, id, userId],
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const project = await fetchProject(id, userId);
    return NextResponse.json(project);
  } catch (error) {
    console.error("[project][PATCH] failed", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = requireUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "Missing or invalid user id header" }, { status: 401 });
  }

  const id = parseId(params.id);
  if (!id) {
    return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
  }

  try {
    const [result] = await dbPool.execute<ResultSetHeader>(
      `
      DELETE FROM projects
      WHERE id = ? AND user_id = ?
      `,
      [id, userId],
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[project][DELETE] failed", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
