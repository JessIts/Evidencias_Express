import express from "express";
import morgan from "morgan";

import studentsRouter from "./routes/students.routes.js";

import { auth } from "./middlewares/auth.js";
import { loggerMiddleware } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";

import { logger } from "./utils/logger.js";

const app = express();

app.use(express.json());

morgan.token("message", (_req, res) => {
  return res.statusMessage;
});

app.use(
  morgan("combined", {
    stream: {
      write: (message: string) => {
        logger.info(message.trim());
      }
    }
  })
);

app.use(loggerMiddleware);

app.use(auth);

app.use("/students", studentsRouter);

app.use(notFound);

app.use(errorHandler);

export default app;