import type {
  Request,
  Response,
  NextFunction
} from "express";

import { DriversRepository } from "../repositories/drivers.repository.js";
import { RoutesRepository } from "../repositories/routes.repository.js";
import { DriversService } from "../services/driver.services.js";

import type {
  CreateDriverDTO,
  UpdateDriverDTO
} from "../dtos/driver.dto.js";

import type { DriverWithRoutes } from "../types/driver.types.js";
import type {
  ApiResponse,
  PaginatedResponse
} from "../types/api.types.js";

const service = new DriversService(
  new DriversRepository(),
  new RoutesRepository()
);

export async function getDrivers(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await service.getPaginated(page, limit);

    const response: PaginatedResponse<DriverWithRoutes> = {
      data: result.drivers,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit)
      }
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function getDriverById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const driver = await service.getById(Number(req.params.id));

    const response: ApiResponse<DriverWithRoutes> = { data: driver };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function createDriver(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data: CreateDriverDTO = req.body;
    const driver = await service.create(data);

    const response: ApiResponse<DriverWithRoutes> = { data: driver };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

export async function updateDriver(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data: UpdateDriverDTO = req.body;
    const driver = await service.update(Number(req.params.id), data);

    const response: ApiResponse<DriverWithRoutes> = { data: driver };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function deleteDriver(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await service.delete(Number(req.params.id));

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function assignRoute(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const driver = await service.assignRoute(
      Number(req.params.id),
      Number(req.params.routeId)
    );

    const response: ApiResponse<DriverWithRoutes> = { data: driver };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function unassignRoute(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const driver = await service.unassignRoute(
      Number(req.params.id),
      Number(req.params.routeId)
    );

    const response: ApiResponse<DriverWithRoutes> = { data: driver };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}