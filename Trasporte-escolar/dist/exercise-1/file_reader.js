import { readFile } from "node:fs";
export function readStudents(filePath, callback) {
    readFile(filePath, "utf-8", callback);
}
