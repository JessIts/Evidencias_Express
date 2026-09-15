import type {
  Request,
  Response,
  NextFunction
} from "express";

import { ZodError } from "zod";
import { AppError } from "../errors/AppError.js";
import { logger } from "../utils/logger.js";

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  logger.error(error);

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

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message
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