import { StudentsRepository } from "../repositories/students.repository.js";
import { StudentsService } from "../services/student.services.js";
const repository = new StudentsRepository();
const service = new StudentsService(repository);
export function getStudents(req, res) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = service.getPaginated(page, limit);
    const response = {
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
export function getStudentById(req, res, next) {
    try {
        const id = Number(req.params.id);
        const student = service.getById(id);
        const response = {
            data: student
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
}
export function createStudent(req, res, next) {
    try {
        const data = req.body;
        const student = service.create(data);
        const response = {
            data: student
        };
        res.status(201).json(response);
    }
    catch (error) {
        next(error);
    }
}
export function updateStudent(req, res, next) {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const student = service.update(id, data);
        const response = {
            data: student
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
}
export function deleteStudent(req, res, next) {
    try {
        const id = Number(req.params.id);
        service.delete(id);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
}
