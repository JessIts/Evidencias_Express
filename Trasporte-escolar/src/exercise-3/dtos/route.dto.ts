import type { z } from "zod";

import {
  createRouteSchema,
  updateRouteSchema
} from "../schemas/route.schema.js";

export type CreateRouteDTO = z.infer<typeof createRouteSchema>;

export type UpdateRouteDTO = z.infer<typeof updateRouteSchema>;