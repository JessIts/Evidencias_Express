import type { Request, Response, NextFunction } from "express";

interface Student {
  id: number;
  name: string;
  age: number;
  route: string;
}

let students: Student[] = [
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

// GET /students
export function getStudents(
  req: Request,
  res: Response
): void {
  res.status(200).json(students);
}

// GET /students/:id
export function getStudentById(
  req: Request,
  res: Response
): void {
  const id = Number(req.params.id);

  const student = students.find(
    (student) => student.id === id
  );

  if (!student) {
    res.status(404).json({
      error: "Estudiante no encontrado"
    });

    return;
  }

  res.status(200).json(student);
}

// POST /students
export function createStudent(
  req: Request,
  res: Response
): void {
  const { name, age, route } = req.body;

  const newStudent: Student = {
    id: students.length > 0
      ? Math.max(...students.map((student) => student.id)) + 1
      : 1,
    name,
    age,
    route
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
}

// PUT /students/:id
export function updateStudent(
  req: Request,
  res: Response
): void {
  const id = Number(req.params.id);

  const student = students.find(
    (student) => student.id === id
  );

  if (!student) {
    res.status(404).json({
      error: "Estudiante no encontrado"
    });

    return;
  }

  const { name, age, route } = req.body;

  student.name = name ?? student.name;
  student.age = age ?? student.age;
  student.route = route ?? student.route;

  res.status(200).json(student);
}

// DELETE /students/:id
export function deleteStudent(
  req: Request,
  res: Response
): void {
  const id = Number(req.params.id);

  const studentIndex = students.findIndex(
    (student) => student.id === id
  );

  if (studentIndex === -1) {
    res.status(404).json({
      error: "Estudiante no encontrado"
    });

    return;
  }

  students.splice(studentIndex, 1);

  res.status(204).send();
}