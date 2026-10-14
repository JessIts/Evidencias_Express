import { DriversRepository } from "../repositories/drivers.repository.js";
import { RoutesRepository } from "../repositories/routes.repository.js";
import type {
  CreateDriverDTO,
  UpdateDriverDTO
} from "../dtos/driver.dto.js";

import type { DriverWithRoutes } from "../types/driver.types.js";
import { AppError } from "../errors/AppError.js";

function driverNotFound(): AppError {
  return new AppError(
    "Conductor no encontrado",
    404,
    "DRIVER_NOT_FOUND"
  );
}

export class DriversService {
  constructor(
    private readonly repository: DriversRepository,
    private readonly routesRepository: RoutesRepository
  ) {}

  async getPaginated(
    page: number,
    limit: number
  ): Promise<{ drivers: DriverWithRoutes[]; total: number }> {
    const [drivers, total] = await Promise.all([
      this.repository.findPaginated(page, limit),
      this.repository.count()
    ]);

    return { drivers, total };
  }

  async getById(id: number): Promise<DriverWithRoutes> {
    const driver = await this.repository.findById(id);

    if (!driver) {
      throw driverNotFound();
    }

    return driver;
  }

  create(data: CreateDriverDTO): Promise<DriverWithRoutes> {
    return this.repository.create(data);
  }

  async update(
    id: number,
    data: UpdateDriverDTO
  ): Promise<DriverWithRoutes> {
    const driver = await this.repository.update(id, data);

    if (!driver) {
      throw driverNotFound();
    }

    return driver;
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.repository.delete(id);

    if (!deleted) {
      throw driverNotFound();
    }
  }

  async assignRoute(
    driverId: number,
    routeId: number
  ): Promise<DriverWithRoutes> {
    await this.ensureDriverAndRouteExist(driverId, routeId);

    return this.repository.assignRoute(driverId, routeId);
  }

  async unassignRoute(
    driverId: number,
    routeId: number
  ): Promise<DriverWithRoutes> {
    await this.ensureDriverAndRouteExist(driverId, routeId);

    return this.repository.unassignRoute(driverId, routeId);
  }

  private async ensureDriverAndRouteExist(
    driverId: number,
    routeId: number
  ): Promise<void> {
    const driver = await this.repository.findById(driverId);

    if (!driver) {
      throw driverNotFound();
    }

    const route = await this.routesRepository.findById(routeId);

    if (!route) {
      throw new AppError(
        "Ruta no encontrada",
        404,
        "ROUTE_RESOURCE_NOT_FOUND"
      );
    }
  }
}