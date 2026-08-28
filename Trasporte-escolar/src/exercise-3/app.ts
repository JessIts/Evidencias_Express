import express from "express";
import studentsRouter from "./routes/students.routes.js";
import { logger } from "./middlewares/logger.js";
import { auth } from "./middlewares/auth.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

// 1. Logging
app.use(logger);

// 2. Autenticación
app.use(auth);

// 3. Rutas
app.use("/students", studentsRouter);

// 4. Manejo de errores
app.use(errorHandler);

export default app;