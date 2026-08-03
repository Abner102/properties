import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";
import { config as loadEnv } from "dotenv";
import { uploadsRoot } from "./lib/paths";

loadEnv();

async function startServer() {
  const [{ default: apiRoutes }, { ensureDb, validateDatabaseUrl }] = await Promise.all([
    import("./routes"),
    import("./lib/db"),
  ]);

  validateDatabaseUrl();

  const app = express();
  const PORT = parseInt(process.env.PORT || "3001", 10);

  const allowedOrigins = (
    process.env.CORS_ORIGIN || "http://localhost:5173,http://localhost:3000"
  ).split(",");

  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));

  const ALLOWED_UPLOAD_FOLDERS = new Set(["team", "projects", "products", "portfolio"]);

  app.get("/uploads/:folder/:filename", (req, res) => {
    const { folder, filename } = req.params;
    if (!ALLOWED_UPLOAD_FOLDERS.has(folder) || !filename || filename.includes("..")) {
      return res.status(400).json({ error: "Invalid path" });
    }

    const filePath = path.resolve(uploadsRoot, folder, filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }

    return res.sendFile(filePath);
  });

  app.get("/health", async (_req, res) => {
    try {
      await ensureDb();
      res.json({ status: "ok", port: PORT, db: "connected" });
    } catch {
      res.status(503).json({ status: "degraded", port: PORT, db: "disconnected" });
    }
  });

  app.use("/api", apiRoutes);

  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    void _next;
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
  });

  app.listen(PORT, async () => {
    console.log(`Express API server running on http://localhost:${PORT}`);
    console.log(`Serving uploads from ${uploadsRoot}`);
    try {
      await ensureDb();
      console.log("Database connection ready");
    } catch (err) {
      console.warn(
        "Database not ready yet — will retry on first request:",
        err instanceof Error ? err.message : err
      );
    }
  });
}

startServer().catch((error) => {
  console.error("Server failed to start:", error);
  process.exit(1);
});

