import { AppError } from "../errors/AppError.js";

export function getPrismaErrorCode(error: unknown): string | null {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error
  ) {
    const { code } = error as { code: unknown };

    if (typeof code === "string" && /^P\d{4}$/.test(code)) {
      return code;
    }
  }

  return null;
}

export function mapPrismaError(error: unknown): AppError | null {
  switch (getPrismaErrorCode(error)) {
    case "P2002":
      return new AppError(
        "Ya existe un registro con esos datos",
        409,
        "UNIQUE_CONSTRAINT_VIOLATION"
      );
    case "P2003":
      return new AppError(
        "El registro relacionado no existe o está en uso",
        409,
        "FOREIGN_KEY_VIOLATION"
      );
    case "P2025":
      return new AppError(
        "Registro no encontrado",
        404,
        "RECORD_NOT_FOUND"
      );
    default:
      return null;
  }
}