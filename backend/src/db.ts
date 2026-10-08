import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

let db: any;
let pool: Pool;

export async function connectDatabase() {
  const contract = require("../prisma/contract.json");
  const { default: postgres } = await import("@prisma/orm-postgres/runtime");

  db = postgres({
    url: process.env.DATABASE_URL,
    contract,
  });

  await db.connect();

  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  console.log("Prisma 8 PostgreSQL connected");
}

export async function getOrderByNumber(orderNumber: string) {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
  const res = await pool.query(
    'SELECT * FROM "Order" WHERE "orderNumber" = $1 LIMIT 1',
    [orderNumber]
  );
  return res.rows[0] || null;
}

export async function closeDatabase() {
  if (db) {
    await db.close();
  }
  if (pool) {
    await pool.end();
  }
}
