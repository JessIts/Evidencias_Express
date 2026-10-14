import { prisma } from "../config/prisma.js";
import { getPrismaErrorCode } from "../utils/prismaErrors.js";

import type {
  CreateStudentDTO,
  UpdateStudentDTO,
  StudentQueryDTO
} from "../dtos/student.dto.js";
import type { Student } from "../types/student.types.js";

function buildWhere(query: StudentQueryDTO) {
  const age = {
    ...(query.minAge !== undefined && { gte: query.minAge }),
    ...(query.maxAge !== undefined && { lte: query.maxAge })
  };

  return {
    ...(query.search !== undefined && {
      name: { contains: query.search, mode: "insensitive" as const }
    }),
    ...(query.routeId !== undefined && { routeId: query.routeId }),
    ...(Object.keys(age).length > 0 && { age })
  };
}

export class StudentsRepository {
  findPaginated(query: StudentQueryDTO): Promise<Student[]> {
    const { page, limit, sortBy, order } = query;

    const sort = {
      id: { id: order },
      name: { name: order },
      age: { age: order },
      createdAt: { createdAt: order }
    }[sortBy];

    return prisma.student.findMany({
      where: buildWhere(query),
      orderBy: [sort, { id: "asc" }],
      skip: (page - 1) * limit,
      take: limit
    });
  }

  count(query: StudentQueryDTO): Promise<number> {
    return prisma.student.count({ where: buildWhere(query) });
  }

  findById(id: number): Promise<Student | null> {
    return prisma.student.findUnique({ where: { id } });
  }

  create(data: CreateStudentDTO): Promise<Student> {
    return prisma.student.create({ data });
  }

  async update(
    id: number,
    data: UpdateStudentDTO
  ): Promise<Student | null> {
    try {
      return await prisma.student.update({
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
      await prisma.student.delete({ where: { id } });
      return true;
    } catch (error) {
      if (getPrismaErrorCode(error) === "P2025") {
        return false;
      }

      throw error;
    }
  }
}