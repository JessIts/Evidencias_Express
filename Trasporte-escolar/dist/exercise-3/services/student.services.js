import { AppError } from "../errors/AppError.js";
export class StudentsService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    getPaginated(page, limit) {
        const students = this.repository.findPaginated(page, limit);
        const total = this.repository.count();
        return {
            students,
            total
        };
    }
    getById(id) {
        const student = this.repository.findById(id);
        if (!student) {
            throw new AppError("Estudiante no encontrado", 404, "STUDENT_NOT_FOUND");
        }
        return student;
    }
    create(data) {
        return this.repository.create(data);
    }
    update(id, data) {
        const student = this.repository.update(id, data);
        if (!student) {
            throw new AppError("Estudiante no encontrado", 404, "STUDENT_NOT_FOUND");
        }
        return student;
    }
    delete(id) {
        const deleted = this.repository.delete(id);
        if (!deleted) {
            throw new AppError("Estudiante no encontrado", 404, "STUDENT_NOT_FOUND");
        }
    }
}
