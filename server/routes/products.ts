import { Router } from "express";
import db from "../lib/db";
import { requireAuth, slugify, logActivity } from "../lib/api-helpers";
import { generateProductCode } from "../lib/constants";
import { withMongoId, withMongoIds } from "../lib/serialize";


const router = Router();

router.get("/", async (req, res) => {
  try {
    const category = req.query.category as string | undefined;
    const status = req.query.status as string | undefined;
    const search = req.query.search as string | undefined;
    const featured = req.query.featured as string | undefined;
    const sort = (req.query.sort as string) || "newest";
    const page = parseInt((req.query.page as string) || "1");
    const limit = parseInt((req.query.limit as string) || "20");

    const where: Record<string, any> = {};
    if (category) where.category = category;
    if (status) where.status = status;
    if (featured === "true") where.featured = true;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { productCode: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
      ];
    }

    const orderBy: any =
      sort === "oldest"
        ? { createdAt: "asc" }
        : sort === "price_asc"
          ? { price: "asc" }
          : sort === "price_desc"
            ? { price: "desc" }
            : sort === "views"
              ? { views: "desc" }
              : { createdAt: "desc" };

    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.product.count({ where }),
    ]);

    return res.json({
      products: withMongoIds(products),
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch {
    return res.json({ products: [], total: 0, page: 1, pages: 0 });
  }
});

router.post("/", async (req, res) => {
  const auth = await requireAuth(req, "products");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });

  try {
    const body = req.body;
    const slug = body.slug || slugify(body.name);
    const productCode = body.productCode || generateProductCode(body.category || "gen");

    const product = await db.product.create({
      data: { ...body, slug, productCode },
    });
    return res.status(201).json(withMongoId(product));
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to create product";
    return res.status(500).json({ error: msg });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await db.product.findUnique({ where: { id: req.params.id } });
    if (!product) return res.status(404).json({ error: "Not found" });
    return res.json(withMongoId(product));
  } catch {
    return res.status(404).json({ error: "Not found" });
  }
});

router.put("/:id", async (req, res) => {
  const auth = await requireAuth(req, "products");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });

  try {
    const product = await db.product.update({
      where: { id: req.params.id },
      data: req.body,
    });
    if (!product) return res.status(404).json({ error: "Not found" });
    await logActivity(auth.user!._id.toString(), "update", "Product", req.params.id, { name: product.name }, req);
    return res.json(withMongoId(product));
  } catch {
    return res.status(500).json({ error: "Update failed" });
  }
});

router.delete("/:id", async (req, res) => {
  const auth = await requireAuth(req, "products");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });

  try {
    await db.product.delete({ where: { id: req.params.id } });
    await logActivity(auth.user!._id.toString(), "delete", "Product", req.params.id, {}, req);
    return res.json({ success: true });
  } catch {
    return res.status(500).json({ error: "Delete failed" });
  }
});

router.patch("/:id", async (req, res) => {
  const auth = await requireAuth(req, "products");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });

  try {
    const { action } = req.body;

    const updates: Record<string, any> = {};
    switch (action) {
      case "publish":
        updates.status = "published";
        break;
      case "draft":
        updates.status = "draft";
        break;
      case "archive":
        updates.status = "archived";
        break;
      case "sold":
        updates.status = "sold";
        break;
      case "reserved":
        updates.status = "reserved";
        break;
      case "available":
        updates.status = "available";
        break;
      case "feature":
        updates.featured = true;
        break;
      case "unfeature":
        updates.featured = false;
        break;
      case "duplicate": {
        const original = await db.product.findUnique({ where: { id: req.params.id } });
        if (!original) return res.status(404).json({ error: "Not found" });
        const { id: _id, productCode: _code, slug: originalSlug, createdAt, updatedAt, ...rest } = original;
        const dup = await db.product.create({
          data: {
            ...rest,
            name: `${original.name} (Copy)`,
            slug: `${originalSlug}-copy-${Date.now()}`,
            productCode: `EIP-COPY-${Date.now().toString(36).toUpperCase()}`,
            status: "draft",
          },
        });
        return res.json(withMongoId(dup));
      }
      default:
        return res.status(400).json({ error: "Invalid action" });
    }

    const product = await db.product.update({
      where: { id: req.params.id },
      data: updates,
    });
    return res.json(withMongoId(product));
  } catch {
    return res.status(500).json({ error: "Action failed" });
  }
});

export default router;

