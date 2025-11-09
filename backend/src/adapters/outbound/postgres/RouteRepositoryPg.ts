// src/adapters/outbound/postgres/RouteRepositoryPg.ts
import { Pool } from "pg";
import  {RouteRepositoryPort}  from "../../../core/ports/RouteRepositoryPort";
import { Route } from "../../../core/domain/Route";

export class RouteRepositoryPg implements RouteRepositoryPort {
  constructor(private db: Pool) {}

  async addRoute(route: Route): Promise<Route> {
    const client = await this.db.connect();
    try {
      const query = `
        INSERT INTO routes
          (route_id, vessel_type, fuel_type, year, ghg_intensity, fuel_consumption, distance, total_emissions, is_baseline)
        VALUES
          ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING *;
      `;

      const values = [
        route.routeId,
        route.vesselType,
        route.fuelType,
        route.year,
        route.ghgIntensity,
        route.fuelConsumption,
        route.distance,
        route.totalEmissions,
        route.isBaseline || false,
      ];

      const { rows } = await client.query(query, values);

      return rows[0]; // return the newly inserted Route
    } finally {
      client.release();
    }
  }

  async getAllRoutes(): Promise<Route[]> {
    const res = await this.db.query("SELECT * FROM routes");
    return res.rows.map(row => new Route(row));
  }

  async getRouteById(routeId: string): Promise<Route | null> {
    const res = await this.db.query("SELECT * FROM routes WHERE route_id = $1", [routeId]);
    if (!res.rows[0]) return null;
    return new Route(res.rows[0]);
  }

  async setBaseline(routeId: string): Promise<Route | null> {
    const client = await this.db.connect();
    try {
        await client.query("BEGIN");

        // Get the year of the route
        const { rows } = await client.query(
            `SELECT * FROM routes WHERE route_id = $1`,
            [routeId]
        );
        if (rows.length === 0) {
            await client.query("ROLLBACK");
            return null; // Route not found
        }
        const route = rows[0];

        // Unset previous baseline for the same year
        await client.query(
            `UPDATE routes SET is_baseline = false WHERE year = $1`,
            [route.year]
        );

        // Set the new baseline
        await client.query(
            `UPDATE routes SET is_baseline = true WHERE route_id = $1`,
            [routeId]
        );

        await client.query("COMMIT");

        // Return the updated route
        return { ...route, is_baseline: true };
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
}
}
