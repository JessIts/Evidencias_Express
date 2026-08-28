import { readFile } from "node:fs";
import path from "node:path";

export function readStudents(
  filePath: string,
  callback: (error: Error | null, data?: string) => void
): void {
  readFile(filePath, "utf-8", callback);
}