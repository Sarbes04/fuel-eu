// src/adapters/inbound/http/routesController.ts
import { Router, Request, Response } from "express";
import { RouteService } from "../../../core/application/RouteService";
import { Route } from "../../../core/domain/Route";

export function createRoutesController(routeService: RouteService) {
  const router = Router();

  // GET /routes - fetch all routes
  router.get("/", async (_req: Request, res: Response) => {
    try {
      const routes: Route[] = await routeService.getAllRoutes();
      res.json(routes);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET /routes/:routeId - fetch a specific route
  router.get("/:routeId", async (req: Request, res: Response) => {
    try {
      const route: Route | null = await routeService.getRouteById(req.params.routeId);
      if (!route) return res.sendStatus(404);
      res.json(route);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST /routes - add a new route
  router.post("/", async (req: Request, res: Response) => {
    try {
      const newRoute: Route = await routeService.addRoute(req.body);
      res.status(201).json(newRoute);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // POST /routes/:routeId/baseline - set a route as baseline
  router.post("/:routeId/baseline", async (req: Request, res: Response) => {
    try {
      const updatedRoute: Route | null = await routeService.setBaseline(req.params.routeId);
      if (!updatedRoute) return res.sendStatus(404);
      res.json(updatedRoute);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });


  return router;
}
