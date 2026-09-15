import type {
  Request,
  Response,
  NextFunction
} from "express";

import type { ApiErrorResponse } from "../types/api.types.js";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error("Error:", error.message);

  let statusCode = 500;
  let errorCode = "INTERNAL_SERVER_ERROR";

  if (error.message === "Estudiante no encontrado") {
    statusCode = 404;
    errorCode = "STUDENT_NOT_FOUND";
  }

  if (
    error.message === "El nombre es obligatorio" ||
    error.message === "La edad debe ser un número entero positivo" ||
    error.message === "La ruta es obligatoria" ||
    error.message === "El nombre no puede estar vacío" ||
    error.message === "La ruta no puede estar vacía"
  ) {
    statusCode = 400;
    errorCode = "VALIDATION_ERROR";
  }

  const response: ApiErrorResponse = {
    error: {
      code: errorCode,
      message: error.message
    }
  };

  res.status(statusCode).json(response);
}