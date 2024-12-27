import { config } from "dotenv"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

config()

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL no definido")
}

const sql = neon(process.env.DATABASE_URL)

export const db = drizzle(sql, { schema })
