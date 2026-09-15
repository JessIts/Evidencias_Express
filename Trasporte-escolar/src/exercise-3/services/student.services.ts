import { StudentsRepository } from "../repositories/students.repository.js";
import type {
  CreateStudentDTO,
  UpdateStudentDTO
} from "../dtos/student.dto.js";

import type { Student } from "../types/student.types.js";
import { AppError } from "../errors/AppError.js";

export class StudentsService {
  constructor(
    private readonly repository: StudentsRepository
  ) {}

  getPaginated(
    page: number,
    limit: number
  ): {
    students: Student[];
    total: number;
  } {
    const students = this.repository.findPaginated(
      page,
      limit
    );

    const total = this.repository.count();

    return {
      students,
      total
    };
  }

  getById(id: number): Student {
    const student = this.repository.findById(id);

    if (!student) {
      throw new AppError(
        "Estudiante no encontrado",
        404,
        "STUDENT_NOT_FOUND"
      );
    }

    return student;
  }

  create(data: CreateStudentDTO): Student {
    return this.repository.create(data);
  }

  update(
    id: number,
    data: UpdateStudentDTO
  ): Student {
    const student = this.repository.update(id, data);

    if (!student) {
      throw new AppError(
        "Estudiante no encontrado",
        404,
        "STUDENT_NOT_FOUND"
      );
    }

    return student;
  }

  delete(id: number): void {
    const deleted = this.repository.delete(id);

    if (!deleted) {
      throw new AppError(
        "Estudiante no encontrado",
        404,
        "STUDENT_NOT_FOUND"
      );
    }
  }
}