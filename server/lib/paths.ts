import path from "path";
import { fileURLToPath } from "url";

const libDir = path.dirname(fileURLToPath(import.meta.url));

/** Absolute path to the project root (parent of /server). */
export const projectRoot = path.resolve(libDir, "..", "..");

/** Absolute path where uploaded images are stored. */
export const uploadsRoot = path.join(projectRoot, "public", "uploads");

export function uploadFilePath(folder: string, filename: string): string {
  return path.resolve(uploadsRoot, folder, filename);
}
