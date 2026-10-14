import { StudentsRepository } from "../repositories/students.repository.js";
import type {
  CreateStudentDTO,
  UpdateStudentDTO,
  StudentQueryDTO
} from "../dtos/student.dto.js";

import type { Student } from "../types/student.types.js";
import { AppError } from "../errors/AppError.js";

export class StudentsService {
  constructor(
    private readonly repository: StudentsRepository
  ) {}

  async getPaginated(
    query: StudentQueryDTO
  ): Promise<{ students: Student[]; total: number }> {
    const [students, total] = await Promise.all([
      this.repository.findPaginated(query),
      this.repository.count(query)
    ]);

    return { students, total };
  }

  async getById(id: number): Promise<Student> {
    const student = await this.repository.findById(id);

    if (!student) {
      throw new AppError(
        "Estudiante no encontrado",
        404,
        "STUDENT_NOT_FOUND"
      );
    }

    return student;
  }

  create(data: CreateStudentDTO): Promise<Student> {
    return this.repository.create(data);
  }

  async update(
    id: number,
    data: UpdateStudentDTO
  ): Promise<Student> {
    const student = await this.repository.update(id, data);

    if (!student) {
      throw new AppError(
        "Estudiante no encontrado",
        404,
        "STUDENT_NOT_FOUND"
      );
    }

    return student;
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.repository.delete(id);

    if (!deleted) {
      throw new AppError(
        "Estudiante no encontrado",
        404,
        "STUDENT_NOT_FOUND"
      );
    }
  }
}