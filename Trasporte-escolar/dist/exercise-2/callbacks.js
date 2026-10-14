import fs from "fs";
export function getStudentsCallback(callback) {
    fs.readFile("data/students.json", "utf-8", (error, data) => {
        if (error) {
            callback(error);
            return;
        }
        callback(null, data);
    });
}
