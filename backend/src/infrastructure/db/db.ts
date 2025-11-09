// src/infrastructure/db/db.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

export const db = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // Neon requires SSL
  },
});

// Test connection
export async function testDbConnection() {
  try {
    const res = await db.query('SELECT 1 AS test');
    console.log('✅ DB connected:', res.rows);
  } catch (err) {
    console.error('❌ DB connection error:', err);
  }
}
