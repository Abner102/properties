import { Router } from "express";
import db from "../lib/db";
import { withMongoIds } from "../lib/serialize";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const members = await db.team.findMany({
      where: { published: true },
      orderBy: [{ isFounder: "desc" }, { order: "asc" }, { createdAt: "asc" }],
    });
    return res.json({ members: withMongoIds(members) });
  } catch {
    return res.json({ members: [] });
  }
});

export default router;

