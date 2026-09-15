import type {
  z
} from "zod";

import {
  createStudentSchema,
  updateStudentSchema
} from "../schemas/student.schema.js";

export type CreateStudentDTO = z.infer<
  typeof createStudentSchema
>;

export type UpdateStudentDTO = z.infer<
  typeof updateStudentSchema
>;