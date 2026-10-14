import { Router } from "express";

import {
  getDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
  assignRoute,
  unassignRoute
} from "../controllers/drivers.controller.js";

import {
  validateBody,
  validateParams,
  validateQuery
} from "../middlewares/validate.js";

import {
  createDriverSchema,
  updateDriverSchema,
  driverIdSchema,
  driverRouteParamsSchema,
  paginationSchema
} from "../schemas/driver.schema.js";

const router = Router();

router.get("/", validateQuery(paginationSchema), getDrivers);

router.get("/:id", validateParams(driverIdSchema), getDriverById);

router.post("/", validateBody(createDriverSchema), createDriver);

router.put(
  "/:id",
  validateParams(driverIdSchema),
  validateBody(updateDriverSchema),
  updateDriver
);

router.delete("/:id", validateParams(driverIdSchema), deleteDriver);

router.put(
  "/:id/routes/:routeId",
  validateParams(driverRouteParamsSchema),
  assignRoute
);

router.delete(
  "/:id/routes/:routeId",
  validateParams(driverRouteParamsSchema),
  unassignRoute
);

export default router;