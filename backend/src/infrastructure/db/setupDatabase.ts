import {pool} from "./db";

export async function setupDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS routes (
        route_id VARCHAR(255) PRIMARY KEY,
        vessel_type VARCHAR(50) NOT NULL CHECK (vessel_type IN ('Container', 'BulkCarrier', 'Tanker', 'RoRo')),
        fuel_type VARCHAR(50) NOT NULL CHECK (fuel_type IN ('HFO', 'LNG', 'MGO')),
        year INT NOT NULL,
        ghg_intensity NUMERIC(10, 3) NOT NULL,
        fuel_consumption NUMERIC(10, 3) NOT NULL,
        distance NUMERIC(10, 3) NOT NULL,
        total_emissions NUMERIC(10, 3) NOT NULL,
        is_baseline BOOLEAN DEFAULT FALSE
      );

      CREATE TABLE IF NOT EXISTS ship_compliance (
        id SERIAL PRIMARY KEY,
        ship_id VARCHAR(100) NOT NULL,
        year INT NOT NULL,
        cb_gco2eq NUMERIC(12, 3) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS bank_entries (
        id SERIAL PRIMARY KEY,
        ship_id VARCHAR(100) NOT NULL,
        year INT NOT NULL,
        amount_gco2eq NUMERIC(12, 3) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS pools (
        id SERIAL PRIMARY KEY,
        year INT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS pool_members (
        id SERIAL PRIMARY KEY,
        pool_id INT NOT NULL REFERENCES pools(id) ON DELETE CASCADE,
        ship_id VARCHAR(100) NOT NULL,
        cb_before NUMERIC(12, 3),
        cb_after NUMERIC(12, 3),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("✅ All tables ensured in database");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  }
}
