import mysql, { Pool, PoolOptions } from "mysql2/promise";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const poolOptions: PoolOptions = {
  host: requiredEnv("DB_HOST"),
  port: Number(process.env.DB_PORT || 3306),
  user: requiredEnv("DB_USER"),
  password: requiredEnv("DB_PASSWORD"),
  database: requiredEnv("DB_NAME"),
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
  timezone: "Z",
};

// Shared MySQL pool for all API route handlers.
export const dbPool: Pool = mysql.createPool(poolOptions);

export async function query<T>(sql: string, params: Array<string | number | null> = []) {
  const [rows] = await dbPool.execute(sql, params);
  return rows as T;
}
