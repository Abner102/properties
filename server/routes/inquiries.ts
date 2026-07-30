import { Router } from "express";
import { z } from "zod";
import prisma from "../lib/prisma";

const router = Router();

const inquirySchema = z.object({
  type: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(5),
  subject: z.string().optional(),
});

router.post("/", async (req, res) => {
  try {
    const data = inquirySchema.parse(req.body);

    const inquiry = await prisma.inquiry.create({
      data: {
        type: data.type,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
        subject: data.subject || null,
      },
    });

    await prisma.notification.create({
      data: {
        type: "inquiry",
        title: `New ${data.type} inquiry from ${data.name}`,
        message: data.message.slice(0, 100),
        link: "/admin",
      },
    });

    return res.json({ success: true, id: inquiry.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Please fill all required fields correctly." });
    }
    return res.status(500).json({ error: "Failed to submit inquiry" });
  }
});

export default router;
