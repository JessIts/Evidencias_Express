export class StudentsRepository {
    students = [
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
    nextId = 3;
    findAll() {
        return this.students;
    }
    findPaginated(page, limit) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        return this.students.slice(startIndex, endIndex);
    }
    count() {
        return this.students.length;
    }
    findById(id) {
        return this.students.find((student) => student.id === id);
    }
    create(data) {
        const newStudent = {
            id: this.nextId++,
            ...data
        };
        this.students.push(newStudent);
        return newStudent;
    }
    update(id, data) {
        const student = this.findById(id);
        if (!student) {
            return undefined;
        }
        Object.assign(student, data);
        return student;
    }
    delete(id) {
        const index = this.students.findIndex((student) => student.id === id);
        if (index === -1) {
            return false;
        }
        this.students.splice(index, 1);
        return true;
    }
}
