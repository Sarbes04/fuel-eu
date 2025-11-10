import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

export async function testDbConnection() {
  try {
    const res = await pool.query('SELECT 1 AS test');
    console.log('✅ DB connected:', res.rows);
  } catch (err) {
    console.error('❌ DB connection error:', err);
  }
}

export default { pool, testDbConnection };
