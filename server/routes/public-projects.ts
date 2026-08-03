import { Router } from "express";
import db from "../lib/db";
import { withMongoId, withMongoIds } from "../lib/serialize";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const projects = await db.softwareProject.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
    return res.json({ projects: withMongoIds(projects) });
  } catch {
    return res.json({ projects: [] });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const project = await db.softwareProject.findFirst({
      where: { slug: req.params.slug, published: true },
    });
    if (!project) return res.status(404).json({ error: "Project not found" });
    return res.json({ project: withMongoId(project) });
  } catch {
    return res.status(500).json({ error: "Failed to load project" });
  }
});

export default router;

