import path from "node:path";
import { readStudents } from "./file_reader.js";

const filePath = path.resolve("data/students.json");

console.log("1. Inicio del programa");

readStudents(filePath, (error, data) => {
  if (error) {
    console.error("Error leyendo estudiantes:", error);
    return;
  }

  console.log("4. Archivo leído correctamente");
  console.log(data);
});

console.log("2. Lectura solicitada");

setTimeout(() => {
  console.log("3. setTimeout ejecutado");
}, 0);

console.log("5. Fin del código síncrono");