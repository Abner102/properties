import { Router } from "express";
import db from "../lib/db";
import { withMongoId } from "../lib/serialize";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const settings = await db.settings.findUnique({ where: { key: "default" } });
    return res.json(withMongoId(settings));
  } catch {
    return res.json(null);
  }
});

export default router;

