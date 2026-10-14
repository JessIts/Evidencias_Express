import type { z } from "zod";

import {
  createDriverSchema,
  updateDriverSchema
} from "../schemas/driver.schema.js";

export type CreateDriverDTO = z.infer<typeof createDriverSchema>;

export type UpdateDriverDTO = z.infer<typeof updateDriverSchema>;