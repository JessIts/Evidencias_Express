import type {
  Request,
  Response,
  NextFunction
} from "express";

import { ZodError } from "zod";
import { AppError } from "../errors/AppError.js";
import { mapPrismaError } from "../utils/prismaErrors.js";
import { logger } from "../utils/logger.js";

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  logger.error(error);

  // Si ya se envió una respuesta, Express debe cerrar la conexión
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Los datos enviados no son válidos",
        details: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message
        }))
      }
    });

    return;
  }

  const appError =
    error instanceof AppError ? error : mapPrismaError(error);

  if (appError) {
    res.status(appError.statusCode).json({
      error: {
        code: appError.code,
        message: appError.message
      }
    });

    return;
  }

  res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Ocurrió un error interno en el servidor"
    }
  });
}