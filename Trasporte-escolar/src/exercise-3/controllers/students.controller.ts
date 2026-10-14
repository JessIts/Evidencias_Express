import type {
  Request,
  Response,
  NextFunction
} from "express";

import { StudentsRepository } from "../repositories/students.repository.js";
import { StudentsService } from "../services/student.services.js";
import { studentQuerySchema } from "../schemas/student.schema.js";

import type {
  CreateStudentDTO,
  UpdateStudentDTO
} from "../dtos/student.dto.js";

import type { Student } from "../types/student.types.js";
import type {
  ApiResponse,
  PaginatedResponse
} from "../types/api.types.js";

const repository = new StudentsRepository();
const service = new StudentsService(repository);

export async function getStudents(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const query = studentQuerySchema.parse(req.query);

    const result = await service.getPaginated(query);

    const response: PaginatedResponse<Student> = {
      data: result.students,
      pagination: {
        page: query.page,
        limit: query.limit,
        total: result.total,
        totalPages: Math.ceil(result.total / query.limit)
      }
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function getStudentById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params.id);
    const student = await service.getById(id);

    const response: ApiResponse<Student> = { data: student };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function createStudent(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data: CreateStudentDTO = req.body;
    const student = await service.create(data);

    const response: ApiResponse<Student> = { data: student };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

export async function updateStudent(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params.id);
    const data: UpdateStudentDTO = req.body;

    const student = await service.update(id, data);

    const response: ApiResponse<Student> = { data: student };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function deleteStudent(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params.id);

    await service.delete(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}