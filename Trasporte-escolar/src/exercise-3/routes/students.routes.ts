import { Router } from "express";

import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from "../controllers/students.controller.js";

import {
  validateBody,
  validateParams,
  validateQuery
} from "../middlewares/validate.js";

import {
  createStudentSchema,
  updateStudentSchema,
  studentIdSchema,
  paginationSchema
} from "../schemas/student.schema.js";

const router = Router();

router.get(
  "/",
  validateQuery(paginationSchema),
  getStudents
);

router.get(
  "/:id",
  validateParams(studentIdSchema),
  getStudentById
);

router.post(
  "/",
  validateBody(createStudentSchema),
  createStudent
);

router.put(
  "/:id",
  validateParams(studentIdSchema),
  validateBody(updateStudentSchema),
  updateStudent
);

router.delete(
  "/:id",
  validateParams(studentIdSchema),
  deleteStudent
);

export default router;