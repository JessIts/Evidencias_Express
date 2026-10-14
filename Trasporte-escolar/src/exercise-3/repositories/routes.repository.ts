import { prisma } from "../config/prisma.js";
import { getPrismaErrorCode } from "../utils/prismaErrors.js";

import type {
  CreateRouteDTO,
  UpdateRouteDTO
} from "../dtos/route.dto.js";
import type { Route } from "../types/route.types.js";

export class RoutesRepository {
  findPaginated(page: number, limit: number): Promise<Route[]> {
    return prisma.route.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { id: "asc" }
    });
  }

  count(): Promise<number> {
    return prisma.route.count();
  }

  findById(id: number): Promise<Route | null> {
    return prisma.route.findUnique({ where: { id } });
  }

  create(data: CreateRouteDTO): Promise<Route> {
    return prisma.route.create({ data });
  }

  async update(
    id: number,
    data: UpdateRouteDTO
  ): Promise<Route | null> {
    try {
      return await prisma.route.update({
        where: { id },
        data
      });
    } catch (error) {
      if (getPrismaErrorCode(error) === "P2025") {
        return null;
      }

      throw error;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.route.delete({ where: { id } });
      return true;
    } catch (error) {
      if (getPrismaErrorCode(error) === "P2025") {
        return false;
      }

      throw error;
    }
  }
}