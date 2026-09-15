import express from "express";

import studentsRouter from "./routes/students.routes.js";

import { logger } from "./middlewares/logger.js";
import { auth } from "./middlewares/auth.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

// Logging
app.use(logger);

// Auth
app.use(auth);

// Routes
app.use("/students", studentsRouter);

// Error handler
app.use(errorHandler);

export default app;