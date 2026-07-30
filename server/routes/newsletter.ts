import { Router } from "express";
import { z } from "zod";
import prisma from "../lib/prisma";

const router = Router();

const schema = z.object({ email: z.string().email() });

router.post("/", async (req, res) => {
  try {
    const { email } = schema.parse(req.body);
    await prisma.newsletter.upsert({
      where: { email },
      update: { active: true },
      create: { email, active: true },
    });
    return res.json({ success: true });
  } catch {
    return res.status(400).json({ error: "Invalid email" });
  }
});

export default router;
