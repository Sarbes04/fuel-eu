// src/infrastructure/container.ts
import { db } from "./db/db";
import { RouteRepositoryPg } from "../adapters/outbound/postgres/RouteRepositoryPg";
import { RouteService } from "../core/application/RouteService";
import { createRoutesController } from "../adapters/inbound/http/routesController";

// Repositories
export const routeRepository = new RouteRepositoryPg(db);

// Services
export const routeService = new RouteService(routeRepository);

// Controllers
export const routesController = createRoutesController(routeService);
