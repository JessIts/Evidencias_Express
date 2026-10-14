import { z } from "zod";

export { paginationSchema } from "./student.schema.js";

export const createRouteSchema = z.object({
  name: z
    .string({
      message: "El nombre debe ser un texto"
    })
    .trim()
    .min(1, "El nombre es obligatorio")
});

export const updateRouteSchema = createRouteSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "Debe enviar al menos un campo para actualizar"
    }
  );

export const routeIdSchema = z.object({
  id: z.coerce
    .number({
      message: "El ID debe ser un número"
    })
    .int("El ID debe ser un número entero")
    .positive("El ID debe ser mayor que cero")
});