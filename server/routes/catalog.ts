import { Router } from "express";
import prisma from "../lib/prisma";
import { requireAuth, slugify } from "../lib/api-helpers";
import { generateProductCode } from "../lib/constants";
import {
  getProductsByCategories,
  toProperty,
  toCar,
  toLandListing,
} from "../lib/products";
import { withMongoId } from "../lib/serialize";

const router = Router();

router.get("/properties", async (_req, res) => {
  try {
    const products = await getProductsByCategories(
      ["houses", "apartments", "commercial", "lands"],
      { limit: 100 }
    );
    const properties = products
      .filter((p) => p.category !== "lands" && p.category !== "cars")
      .map(toProperty);
    return res.json(properties);
  } catch {
    return res.json([]);
  }
});

router.post("/properties", async (req, res) => {
  const auth = await requireAuth(req, "products");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });

  try {
    const body = req.body;
    const slug = body.slug || slugify(body.title || body.name);
    const category = body.category || "houses";
    const product = await prisma.product.create({
      data: {
        ...body,
        name: body.title || body.name,
        slug,
        category,
        productCode: generateProductCode(category),
        status: body.status || "published",
      },
    });
    return res.status(201).json(withMongoId(product));
  } catch {
    return res.status(500).json({ error: "Failed to create property" });
  }
});

router.get("/cars", async (_req, res) => {
  try {
    const products = await getProductsByCategories(["cars"], { limit: 100 });
    return res.json(products.map(toCar));
  } catch {
    return res.json([]);
  }
});

router.post("/cars", async (req, res) => {
  const auth = await requireAuth(req, "products");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });

  try {
    const body = req.body;
    const slug = body.slug || slugify(`${body.brand}-${body.model}`);
    const product = await prisma.product.create({
      data: {
        ...body,
        name: `${body.brand} ${body.model}`,
        slug,
        category: "cars",
        productCode: generateProductCode("cars"),
        status: body.status || "published",
      },
    });
    return res.status(201).json(withMongoId(product));
  } catch {
    return res.status(500).json({ error: "Failed to create car" });
  }
});

router.get("/lands", async (_req, res) => {
  try {
    const products = await getProductsByCategories(["lands"], { limit: 100 });
    return res.json(products.map(toLandListing));
  } catch {
    return res.json([]);
  }
});

router.post("/lands", async (req, res) => {
  const auth = await requireAuth(req, "products");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });

  try {
    const body = req.body;
    const slug = body.slug || slugify(body.title || body.name);
    const product = await prisma.product.create({
      data: {
        ...body,
        name: body.title || body.name,
        slug,
        category: "lands",
        productCode: generateProductCode("lands"),
        status: body.status || "published",
      },
    });
    return res.status(201).json(withMongoId(product));
  } catch {
    return res.status(500).json({ error: "Failed to create land" });
  }
});

router.get("/projects", async (_req, res) => {
  try {
    const projects = await prisma.softwareProject.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return res.json(projects);
  } catch {
    return res.json([]);
  }
});

router.post("/projects", async (req, res) => {
  const auth = await requireAuth(req, "projects");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });

  try {
    const body = req.body;
    if (!body.slug) body.slug = slugify(body.name);
    const project = await prisma.softwareProject.create({ data: body });
    return res.status(201).json(withMongoId(project));
  } catch {
    return res.status(500).json({ error: "Failed to create project" });
  }
});

export default router;
