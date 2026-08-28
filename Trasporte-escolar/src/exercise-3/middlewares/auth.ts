import type { Request, Response, NextFunction } from "express";

const API_KEY = "123456";

export function auth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const apiKey = req.header("x-api-key");

  if (!apiKey || apiKey !== API_KEY) {
    res.status(401).json({
      error: "API key inválida o ausente"
    });

    return;
  }

  next();
}