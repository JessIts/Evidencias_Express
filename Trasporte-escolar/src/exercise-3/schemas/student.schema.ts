import { z } from "zod";

export const createStudentSchema = z.object({
  name: z
    .string({
      message: "El nombre debe ser un texto"
    })
    .trim()
    .min(1, "El nombre es obligatorio"),

  age: z
    .number({
      message: "La edad debe ser un número"
    })
    .int("La edad debe ser un número entero")
    .positive("La edad debe ser mayor que cero"),

  route: z
    .string({
      message: "La ruta debe ser un texto"
    })
    .trim()
    .min(1, "La ruta es obligatoria")
});

export const updateStudentSchema = createStudentSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "Debe enviar al menos un campo para actualizar"
    }
  );

export const studentIdSchema = z.object({
  id: z.coerce
    .number({
      message: "El ID debe ser un número"
    })
    .int("El ID debe ser un número entero")
    .positive("El ID debe ser mayor que cero")
});

export const paginationSchema = z.object({
  page: z.coerce
    .number()
    .int("page debe ser un número entero")
    .positive("page debe ser mayor que cero")
    .default(1),

  limit: z.coerce
    .number()
    .int("limit debe ser un número entero")
    .min(1, "limit debe ser mínimo 1")
    .max(100, "limit no puede ser mayor que 100")
    .default(10)
});