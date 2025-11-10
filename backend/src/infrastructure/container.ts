// src/infrastructure/container.ts
import { pool } from "./db/db";
import { RouteRepositoryPg } from "../adapters/outbound/postgres/RouteRepositoryPg";
import { RouteService } from "../core/application/RouteService";
import { createRoutesController } from "../adapters/inbound/http/routesController";

// Repositories
export const routeRepository = new RouteRepositoryPg(pool);
//console.log("RouteRepositoryPg constructed:", routeRepository);

// Services
export const routeService = new RouteService(routeRepository);
//console.log(routeService);
// Controllers
export const routesController = createRoutesController(routeService);
