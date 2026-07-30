import { Router } from "express";
import prisma from "../lib/prisma";
import { requireAuth, slugify } from "../lib/api-helpers";
import { withMongoId, withMongoIds } from "../lib/serialize";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const posts = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return res.json(withMongoIds(posts));
  } catch {
    return res.json([]);
  }
});

router.post("/", async (req, res) => {
  const auth = await requireAuth(req, "blog");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });

  try {
    const body = req.body;
    if (!body.slug) body.slug = slugify(body.title);
    const post = await prisma.blog.create({ data: body });
    return res.status(201).json(withMongoId(post));
  } catch {
    return res.status(500).json({ error: "Failed to create post" });
  }
});

export default router;
