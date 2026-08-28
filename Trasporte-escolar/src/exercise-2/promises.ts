import fs from "fs";

export function getStudentsPromise(): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile("data/students.json", "utf-8", (error, data) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(data);
        });
    });
}