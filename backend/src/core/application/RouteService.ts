import { RouteRepositoryPort } from "../ports/RouteRepositoryPort";
import { Route, RouteProps } from "../domain/Route";

export class RouteService {
  constructor(private routeRepo: RouteRepositoryPort) {}

  async getAllRoutes(): Promise<Route[]> {
    return this.routeRepo.getAllRoutes();
  }

  async getRouteById(routeId: string): Promise<Route | null> {
    return this.routeRepo.getRouteById(routeId);
  }

  async addRoute(props: RouteProps): Promise<Route> {
    const route = new Route(props);
    return this.routeRepo.addRoute(route);
  }

  async setBaseline(routeId: string): Promise<Route | null> {
    return this.routeRepo.setBaseline(routeId);
  }
}
