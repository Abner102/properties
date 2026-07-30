import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config as loadEnv } from "dotenv";
import apiRoutes from "./routes";

loadEnv();

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

app.get("/health", (_req, res) => {
  res.json({ status: "ok", port: PORT });
});

app.use("/api", apiRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Express API server running on http://localhost:${PORT}`);
});

export default app;
