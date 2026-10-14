import { Router } from "express";

import {
  getRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  deleteRoute
} from "../controllers/routes.controller.js";

import {
  validateBody,
  validateParams,
  validateQuery
} from "../middlewares/validate.js";

import {
  createRouteSchema,
  updateRouteSchema,
  routeIdSchema,
  paginationSchema
} from "../schemas/route.schema.js";

const router = Router();

router.get("/", validateQuery(paginationSchema), getRoutes);

router.get("/:id", validateParams(routeIdSchema), getRouteById);

router.post("/", validateBody(createRouteSchema), createRoute);

router.put(
  "/:id",
  validateParams(routeIdSchema),
  validateBody(updateRouteSchema),
  updateRoute
);

router.delete("/:id", validateParams(routeIdSchema), deleteRoute);

export default router;