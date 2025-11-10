import { pool } from "./db";

export async function seedData() {
  try {
    // 1️⃣ Check if the table already has data
    const result = await pool.query("SELECT COUNT(*) FROM routes");
    const count = parseInt(result.rows[0].count, 10);

    if (count > 0) {
      console.log("⚠️  Routes table already has data — skipping seed.");
      return;
    }

    console.log("🌱 Seeding KPI data...");

    // 2️⃣ Define mock KPI data
    const kpiData = [
      { route_id: "R001", vessel_type: "Container", fuel_type: "HFO", year: 2024, ghg_intensity: 91.0, fuel_consumption: 5000, distance: 12000, total_emissions: 4500 },
      { route_id: "R002", vessel_type: "BulkCarrier", fuel_type: "LNG", year: 2024, ghg_intensity: 88.0, fuel_consumption: 4800, distance: 11500, total_emissions: 4200 },
      { route_id: "R003", vessel_type: "Tanker", fuel_type: "MGO", year: 2024, ghg_intensity: 93.5, fuel_consumption: 5100, distance: 12500, total_emissions: 4700 },
      { route_id: "R004", vessel_type: "RoRo", fuel_type: "HFO", year: 2025, ghg_intensity: 89.2, fuel_consumption: 4900, distance: 11800, total_emissions: 4300 },
      { route_id: "R005", vessel_type: "Container", fuel_type: "LNG", year: 2025, ghg_intensity: 90.5, fuel_consumption: 4950, distance: 11900, total_emissions: 4400 },
    ];

    // 3️⃣ Insert data
    for (const row of kpiData) {
      await pool.query(
        `INSERT INTO routes (route_id, vessel_type, fuel_type, year, ghg_intensity, fuel_consumption, distance, total_emissions)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (route_id) DO NOTHING`,
        [
          row.route_id,
          row.vessel_type,
          row.fuel_type,
          row.year,
          row.ghg_intensity,
          row.fuel_consumption,
          row.distance,
          row.total_emissions,
        ]
      );
    }

    console.log("✅ KPI seed data inserted successfully.");
  } catch (err) {
    console.error("❌ Error seeding data:", err);
  }
}
