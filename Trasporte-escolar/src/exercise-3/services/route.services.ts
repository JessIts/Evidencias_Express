import { RoutesRepository } from "../repositories/routes.repository.js";
import type {
  CreateRouteDTO,
  UpdateRouteDTO
} from "../dtos/route.dto.js";

import type { Route } from "../types/route.types.js";
import { AppError } from "../errors/AppError.js";

export class RoutesService {
  constructor(
    private readonly repository: RoutesRepository
  ) {}

  async getPaginated(
    page: number,
    limit: number
  ): Promise<{ routes: Route[]; total: number }> {
    const [routes, total] = await Promise.all([
      this.repository.findPaginated(page, limit),
      this.repository.count()
    ]);

    return { routes, total };
  }

  async getById(id: number): Promise<Route> {
    const route = await this.repository.findById(id);

    if (!route) {
      throw new AppError(
        "Ruta no encontrada",
        404,
        "ROUTE_RESOURCE_NOT_FOUND"
      );
    }

    return route;
  }

  create(data: CreateRouteDTO): Promise<Route> {
    return this.repository.create(data);
  }

  async update(
    id: number,
    data: UpdateRouteDTO
  ): Promise<Route> {
    const route = await this.repository.update(id, data);

    if (!route) {
      throw new AppError(
        "Ruta no encontrada",
        404,
        "ROUTE_RESOURCE_NOT_FOUND"
      );
    }

    return route;
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.repository.delete(id);

    if (!deleted) {
      throw new AppError(
        "Ruta no encontrada",
        404,
        "ROUTE_RESOURCE_NOT_FOUND"
      );
    }
  }
}