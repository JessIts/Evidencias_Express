import { prisma } from "../config/prisma.js";
import { getPrismaErrorCode } from "../utils/prismaErrors.js";

import type {
  CreateDriverDTO,
  UpdateDriverDTO
} from "../dtos/driver.dto.js";
import type { DriverWithRoutes } from "../types/driver.types.js";

const withRoutes = { routes: true } as const;

export class DriversRepository {
  findPaginated(
    page: number,
    limit: number
  ): Promise<DriverWithRoutes[]> {
    return prisma.driver.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { id: "asc" },
      include: withRoutes
    });
  }

  count(): Promise<number> {
    return prisma.driver.count();
  }

  findById(id: number): Promise<DriverWithRoutes | null> {
    return prisma.driver.findUnique({
      where: { id },
      include: withRoutes
    });
  }

  create(data: CreateDriverDTO): Promise<DriverWithRoutes> {
    return prisma.driver.create({
      data,
      include: withRoutes
    });
  }

  async update(
    id: number,
    data: UpdateDriverDTO
  ): Promise<DriverWithRoutes | null> {
    try {
      return await prisma.driver.update({
        where: { id },
        data,
        include: withRoutes
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
      await prisma.driver.delete({ where: { id } });
      return true;
    } catch (error) {
      if (getPrismaErrorCode(error) === "P2025") {
        return false;
      }

      throw error;
    }
  }

  assignRoute(
    driverId: number,
    routeId: number
  ): Promise<DriverWithRoutes> {
    return prisma.driver.update({
      where: { id: driverId },
      data: { routes: { connect: { id: routeId } } },
      include: withRoutes
    });
  }

  unassignRoute(
    driverId: number,
    routeId: number
  ): Promise<DriverWithRoutes> {
    return prisma.driver.update({
      where: { id: driverId },
      data: { routes: { disconnect: { id: routeId } } },
      include: withRoutes
    });
  }
}