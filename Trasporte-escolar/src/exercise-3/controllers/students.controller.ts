import type {
  Request,
  Response,
  NextFunction
} from "express";

import { StudentsRepository } from "../repositories/students.repository.js";
import { StudentsService } from "../services/student.services.js";

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

export function getStudents(req: Request, res: Response): void {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = service.getPaginated(page, limit);

  const response: PaginatedResponse<Student> = {
    data: result.students,
    pagination: {
      page,
      limit,
      total: result.total,
      totalPages: Math.ceil(result.total / limit),
    },
  };

  res.status(200).json(response);
}

export function getStudentById(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const id = Number(req.params.id);
    const student = service.getById(id);

    const response: ApiResponse<Student> = {
      data: student
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export function createStudent(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const data: CreateStudentDTO = req.body;
    const student = service.create(data);

    const response: ApiResponse<Student> = {
      data: student
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

export function updateStudent(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const id = Number(req.params.id);
    const data: UpdateStudentDTO = req.body;

    const student = service.update(id, data);

    const response: ApiResponse<Student> = {
      data: student
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export function deleteStudent(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const id = Number(req.params.id);

    service.delete(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}