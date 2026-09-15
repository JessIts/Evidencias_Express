import type { Student } from "../types/student.types.js";

export class StudentsRepository {
  private students: Student[] = [
    {
      id: 1,
      name: "Juan Pérez",
      age: 15,
      route: "Ruta 1"
    },
    {
      id: 2,
      name: "María Gómez",
      age: 16,
      route: "Ruta 2"
    }
  ];

  private nextId = 3;

  findAll(): Student[] {
    return this.students;
  }

  findPaginated(page: number, limit: number): Student[] {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return this.students.slice(startIndex, endIndex);
  }

  count(): number {
    return this.students.length;
  }

  findById(id: number): Student | undefined {
    return this.students.find((student) => student.id === id);
  }

  create(data: Omit<Student, "id">): Student {
    const newStudent: Student = {
      id: this.nextId++,
      ...data
    };

    this.students.push(newStudent);

    return newStudent;
  }

  update(
    id: number,
    data: Partial<Omit<Student, "id">>
  ): Student | undefined {
    const student = this.findById(id);

    if (!student) {
      return undefined;
    }

    Object.assign(student, data);

    return student;
  }

  delete(id: number): boolean {
    const index = this.students.findIndex(
      (student) => student.id === id
    );

    if (index === -1) {
      return false;
    }

    this.students.splice(index, 1);

    return true;
  }
}