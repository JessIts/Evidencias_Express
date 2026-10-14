import { z } from "zod";

export { paginationSchema } from "./student.schema.js";

export const createDriverSchema = z.object({
  name: z
    .string({
      message: "El nombre debe ser un texto"
    })
    .trim()
    .min(1, "El nombre es obligatorio"),

  licenseNumber: z
    .string({
      message: "El número de licencia debe ser un texto"
    })
    .trim()
    .min(1, "El número de licencia es obligatorio"),

  phone: z
    .string({
      message: "El teléfono debe ser un texto"
    })
    .trim()
    .min(1, "El teléfono no puede estar vacío")
    .optional()
});

export const updateDriverSchema = createDriverSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "Debe enviar al menos un campo para actualizar"
    }
  );

export const driverIdSchema = z.object({
  id: z.coerce
    .number({
      message: "El ID debe ser un número"
    })
    .int("El ID debe ser un número entero")
    .positive("El ID debe ser mayor que cero")
});

export const driverRouteParamsSchema = z.object({
  id: z.coerce
    .number({
      message: "El ID del conductor debe ser un número"
    })
    .int("El ID del conductor debe ser un número entero")
    .positive("El ID del conductor debe ser mayor que cero"),

  routeId: z.coerce
    .number({
      message: "El ID de la ruta debe ser un número"
    })
    .int("El ID de la ruta debe ser un número entero")
    .positive("El ID de la ruta debe ser mayor que cero")
});