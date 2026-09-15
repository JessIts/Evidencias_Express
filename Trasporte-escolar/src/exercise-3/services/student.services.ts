import { StudentsRepository } from "../repositories/students.repository.js";
import type {
  CreateStudentDTO,
  UpdateStudentDTO
} from "../dtos/student.dto.js";
import type { Student } from "../types/student.types.js";

export class StudentsService {
  constructor(
    private readonly repository: StudentsRepository
  ) {}

  getAll(): Student[] {
    return this.repository.findAll();
  }

  getPaginated(
    page: number,
    limit: number
  ): {
    students: Student[];
    total: number;
  } {
    const students = this.repository.findPaginated(page, limit);
    const total = this.repository.count();

    return {
      students,
      total
    };
  }

  getById(id: number): Student {
    const student = this.repository.findById(id);

    if (!student) {
      throw new Error("Estudiante no encontrado");
    }

    return student;
  }

  create(data: CreateStudentDTO): Student {
    this.validateStudent(data);

    return this.repository.create(data);
  }

  update(id: number, data: UpdateStudentDTO): Student {
    this.validateUpdate(data);

    const student = this.repository.update(id, data);

    if (!student) {
      throw new Error("Estudiante no encontrado");
    }

    return student;
  }

  delete(id: number): void {
    const deleted = this.repository.delete(id);

    if (!deleted) {
      throw new Error("Estudiante no encontrado");
    }
  }

  private validateStudent(data: CreateStudentDTO): void {
    if (
      typeof data.name !== "string" ||
      data.name.trim().length === 0
    ) {
      throw new Error("El nombre es obligatorio");
    }

    if (
      typeof data.age !== "number" ||
      !Number.isInteger(data.age) ||
      data.age <= 0
    ) {
      throw new Error("La edad debe ser un número entero positivo");
    }

    if (
      typeof data.route !== "string" ||
      data.route.trim().length === 0
    ) {
      throw new Error("La ruta es obligatoria");
    }
  }

  private validateUpdate(data: UpdateStudentDTO): void {
    if (data.name !== undefined) {
      if (
        typeof data.name !== "string" ||
        data.name.trim().length === 0
      ) {
        throw new Error("El nombre no puede estar vacío");
      }
    }

    if (data.age !== undefined) {
      if (
        typeof data.age !== "number" ||
        !Number.isInteger(data.age) ||
        data.age <= 0
      ) {
        throw new Error(
          "La edad debe ser un número entero positivo"
        );
      }
    }

    if (data.route !== undefined) {
      if (
        typeof data.route !== "string" ||
        data.route.trim().length === 0
      ) {
        throw new Error("La ruta no puede estar vacía");
      }
    }
  }
}