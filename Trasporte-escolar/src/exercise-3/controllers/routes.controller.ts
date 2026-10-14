import type {
  Request,
  Response,
  NextFunction
} from "express";

import { RoutesRepository } from "../repositories/routes.repository.js";
import { RoutesService } from "../services/route.services.js";

import type {
  CreateRouteDTO,
  UpdateRouteDTO
} from "../dtos/route.dto.js";

import type { Route } from "../types/route.types.js";
import type {
  ApiResponse,
  PaginatedResponse
} from "../types/api.types.js";

const repository = new RoutesRepository();
const service = new RoutesService(repository);

export async function getRoutes(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await service.getPaginated(page, limit);

    const response: PaginatedResponse<Route> = {
      data: result.routes,
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

export async function getRouteById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const route = await service.getById(Number(req.params.id));

    const response: ApiResponse<Route> = { data: route };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function createRoute(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data: CreateRouteDTO = req.body;
    const route = await service.create(data);

    const response: ApiResponse<Route> = { data: route };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

export async function updateRoute(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data: UpdateRouteDTO = req.body;
    const route = await service.update(Number(req.params.id), data);

    const response: ApiResponse<Route> = { data: route };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function deleteRoute(
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