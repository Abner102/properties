import { Router } from "express";
import prisma from "../lib/prisma";
import { getProductsByCategories, getProductBySlug } from "../lib/products";

const router = Router();

router.get("/", async (req, res) => {
  const category = req.query.category as string | undefined;
  const categories = req.query.categories as string | undefined;
  const featured = req.query.featured === "true";
  const limit = parseInt((req.query.limit as string) || "50");

  const cats = categories
    ? categories.split(",")
    : category
      ? [category]
      : ["houses", "apartments", "commercial", "lands", "cars"];

  const products = await getProductsByCategories(cats, { featured, limit });
  return res.json({ products });
});

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const product = await getProductBySlug(slug);

  if (product) {
    try {
      await prisma.product.update({
        where: { slug },
        data: { views: { increment: 1 } },
      });
    } catch {
      // non-blocking
    }
    return res.json(product);
  }

  return res.status(404).json({ error: "Not found" });
});

export default router;
