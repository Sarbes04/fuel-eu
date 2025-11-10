import { Route } from "../domain/Route";

export interface RouteRepositoryPort {
  getAllRoutes(): Promise<Route[]>;
  getRouteById(routeId: string): Promise<Route | null>;
  addRoute(route: Route): Promise<Route>;
  setBaseline(routeId: string): Promise<Route | null>;
}