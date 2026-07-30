import { Router } from "express";
import prisma from "../lib/prisma";
import { requireAuth, slugify } from "../lib/api-helpers";
import { hashPassword } from "../lib/auth";
import { ROLES } from "../lib/constants";
import { withMongoId, withMongoIds, omitPassword } from "../lib/serialize";

const router = Router();

router.get("/stats", async (req, res) => {
  const auth = await requireAuth(req, "dashboard");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });

  try {
    const [
      totalProducts,
      houses,
      lands,
      apartments,
      commercial,
      cars,
      luxury,
      software,
      totalBlogs,
      totalTeam,
      totalUsers,
      totalInquiries,
      propertyInquiries,
      softwareRequests,
      totalMessages,
      newsletters,
      totalProjects,
      totalCategories,
      recentProducts,
      recentActivity,
      notifications,
      carInquiries,
      generalInquiries,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { category: "houses" } }),
      prisma.product.count({ where: { category: "lands" } }),
      prisma.product.count({ where: { category: "apartments" } }),
      prisma.product.count({ where: { category: "commercial" } }),
      prisma.product.count({ where: { category: "cars" } }),
      prisma.product.count({ where: { category: "luxury-assets" } }),
      prisma.product.count({ where: { category: "software-services" } }),
      prisma.blog.count(),
      prisma.team.count(),
      prisma.user.count(),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { type: { in: ["property", "contact"] } } }),
      prisma.inquiry.count({ where: { type: "software" } }),
      prisma.inquiry.count({ where: { status: "new" } }),
      prisma.newsletter.count({ where: { active: true } }),
      prisma.softwareProject.count(),
      prisma.category.count(),
      prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, name: true, category: true, status: true, price: true, createdAt: true },
      }),
      prisma.inquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
        select: { id: true, name: true, type: true, status: true, createdAt: true },
      }),
      prisma.notification.findMany({
        where: { read: false },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
      prisma.inquiry.count({ where: { type: "car" } }),
      prisma.inquiry.count({ where: { type: "general" } }),
    ]);

    const monthlyVisitors = [
      { month: "Jan", visitors: 4200, views: 12800 },
      { month: "Feb", visitors: 5100, views: 15200 },
      { month: "Mar", visitors: 6800, views: 18400 },
      { month: "Apr", visitors: 7200, views: 21000 },
      { month: "May", visitors: 8100, views: 24500 },
      { month: "Jun", visitors: 9400, views: 28200 },
    ];

    const topProperties = await prisma.product.findMany({
      where: { views: { gt: 0 } },
      orderBy: { views: "desc" },
      take: 5,
      select: { id: true, name: true, views: true, category: true, price: true },
    });

    const inquiryAnalytics = [
      { type: "Property", count: propertyInquiries },
      { type: "Software", count: softwareRequests },
      { type: "Car", count: carInquiries },
      { type: "General", count: generalInquiries },
    ];

    return res.json({
      totals: {
        products: totalProducts,
        houses,
        lands,
        apartments,
        commercial,
        cars,
        luxuryAssets: luxury,
        softwareServices: software,
        blogs: totalBlogs,
        team: totalTeam,
        users: totalUsers,
        inquiries: totalInquiries,
        propertyInquiries,
        softwareRequests,
        messages: totalMessages,
        newsletters,
        projects: totalProjects,
        categories: totalCategories,
        visitors: 9400,
        revenue: 0,
      },
      monthlyVisitors,
      topProperties: withMongoIds(topProperties),
      inquiryAnalytics,
      recentProducts: withMongoIds(recentProducts),
      recentActivity: withMongoIds(recentActivity),
      notifications: withMongoIds(notifications),
    });
  } catch {
    return res.json({
      totals: {
        products: 0,
        houses: 0,
        lands: 0,
        cars: 0,
        blogs: 0,
        team: 0,
        users: 1,
        inquiries: 0,
        messages: 0,
        newsletters: 0,
        projects: 0,
        visitors: 0,
        revenue: 0,
      },
      monthlyVisitors: [],
      topProperties: [],
      inquiryAnalytics: [],
      recentProducts: [],
      recentActivity: [],
      notifications: [],
    });
  }
});

router.get("/search", async (req, res) => {
  const auth = await requireAuth(req, "dashboard");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });

  const q = (req.query.q as string)?.trim();
  if (!q || q.length < 2) return res.json({ results: [] });

  const [products, blogs, projects, users] = await Promise.all([
    prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { productCode: { contains: q, mode: "insensitive" } },
          { city: { contains: q, mode: "insensitive" } },
        ],
      },
      take: 10,
      select: { id: true, name: true, slug: true, category: true, price: true, status: true },
    }),
    prisma.blog.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { category: { contains: q, mode: "insensitive" } },
        ],
      },
      take: 5,
      select: { id: true, title: true, slug: true, category: true },
    }),
    prisma.softwareProject.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { industry: { contains: q, mode: "insensitive" } },
        ],
      },
      take: 5,
      select: { id: true, name: true, slug: true, industry: true },
    }),
    prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { email: { contains: q, mode: "insensitive" } },
        ],
      },
      take: 5,
      select: { id: true, name: true, email: true, role: true },
    }),
  ]);

  return res.json({
    results: [
      ...products.map((p) => ({ type: "product", id: p.id, title: p.name, subtitle: p.category, href: "/admin" })),
      ...blogs.map((b) => ({ type: "blog", id: b.id, title: b.title, subtitle: b.category, href: "/admin" })),
      ...projects.map((p) => ({ type: "project", id: p.id, title: p.name, subtitle: p.industry, href: "/admin" })),
      ...users.map((u) => ({ type: "user", id: u.id, title: u.name, subtitle: u.email, href: "/admin" })),
    ],
  });
});

router.get("/settings", async (_req, res) => {
  try {
    const settings = await prisma.settings.findUnique({ where: { key: "default" } });
    return res.json(withMongoId(settings));
  } catch {
    return res.json(null);
  }
});

router.put("/settings", async (req, res) => {
  const auth = await requireAuth(req, "settings");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });

  const settings = await prisma.settings.upsert({
    where: { key: "default" },
    update: { ...req.body, key: "default" },
    create: { ...req.body, key: "default" },
  });
  return res.json(withMongoId(settings));
});

router.get("/blog", async (req, res) => {
  const auth = await requireAuth(req, "blog");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const posts = await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
  return res.json(withMongoIds(posts));
});

router.post("/blog", async (req, res) => {
  const auth = await requireAuth(req, "blog");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const body = req.body;
  if (!body.slug) body.slug = slugify(body.title);
  const post = await prisma.blog.create({ data: body });
  return res.status(201).json(withMongoId(post));
});

router.put("/blog/:id", async (req, res) => {
  const auth = await requireAuth(req, "blog");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const item = await prisma.blog.update({ where: { id: req.params.id }, data: req.body });
  return res.json(withMongoId(item));
});

router.delete("/blog/:id", async (req, res) => {
  const auth = await requireAuth(req, "blog");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  await prisma.blog.delete({ where: { id: req.params.id } });
  return res.json({ success: true });
});

router.get("/categories", async (req, res) => {
  const auth = await requireAuth(req, "categories");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const items = await prisma.category.findMany({ orderBy: { order: "asc" } });
  return res.json(withMongoIds(items));
});

router.post("/categories", async (req, res) => {
  const auth = await requireAuth(req, "categories");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const body = req.body;
  if (!body.slug) body.slug = slugify(body.name);
  const item = await prisma.category.create({ data: body });
  return res.status(201).json(withMongoId(item));
});

router.put("/categories/:id", async (req, res) => {
  const auth = await requireAuth(req, "categories");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const item = await prisma.category.update({ where: { id: req.params.id }, data: req.body });
  return res.json(withMongoId(item));
});

router.delete("/categories/:id", async (req, res) => {
  const auth = await requireAuth(req, "categories");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  await prisma.category.delete({ where: { id: req.params.id } });
  return res.json({ success: true });
});

router.get("/inquiries", async (req, res) => {
  const auth = await requireAuth(req, "inquiries");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const items = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
  return res.json(withMongoIds(items));
});

router.patch("/inquiries/:id", async (req, res) => {
  const auth = await requireAuth(req, "inquiries");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });

  const body = req.body;
  const inquiry = await prisma.inquiry.update({
    where: { id: req.params.id },
    data: {
      ...body,
      ...(body.reply ? { repliedAt: new Date(), status: "replied" } : {}),
    },
  });
  return res.json(withMongoId(inquiry));
});

router.delete("/inquiries/:id", async (req, res) => {
  const auth = await requireAuth(req, "inquiries");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  await prisma.inquiry.delete({ where: { id: req.params.id } });
  return res.json({ success: true });
});

router.get("/newsletter", async (req, res) => {
  const auth = await requireAuth(req, "newsletter");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const items = await prisma.newsletter.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });
  return res.json(withMongoIds(items));
});

router.get("/notifications", async (req, res) => {
  const auth = await requireAuth(req, "dashboard");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const notifications = await prisma.notification.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return res.json(withMongoIds(notifications));
});

router.patch("/notifications", async (req, res) => {
  const auth = await requireAuth(req, "dashboard");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const { id, read } = req.body;
  await prisma.notification.update({ where: { id }, data: { read } });
  return res.json({ success: true });
});

router.get("/projects", async (req, res) => {
  const auth = await requireAuth(req, "projects");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const items = await prisma.softwareProject.findMany({ orderBy: { createdAt: "desc" } });
  return res.json(withMongoIds(items));
});

router.post("/projects", async (req, res) => {
  const auth = await requireAuth(req, "projects");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const body = req.body;
  if (!body.slug) body.slug = slugify(body.name);
  const item = await prisma.softwareProject.create({ data: body });
  return res.status(201).json(withMongoId(item));
});

router.put("/projects/:id", async (req, res) => {
  const auth = await requireAuth(req, "projects");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const item = await prisma.softwareProject.update({ where: { id: req.params.id }, data: req.body });
  return res.json(withMongoId(item));
});

router.delete("/projects/:id", async (req, res) => {
  const auth = await requireAuth(req, "projects");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  await prisma.softwareProject.delete({ where: { id: req.params.id } });
  return res.json({ success: true });
});

router.get("/team", async (req, res) => {
  const auth = await requireAuth(req, "team");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const items = await prisma.team.findMany({ orderBy: { order: "asc" } });
  return res.json(withMongoIds(items));
});

router.post("/team", async (req, res) => {
  const auth = await requireAuth(req, "team");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const item = await prisma.team.create({ data: req.body });
  return res.status(201).json(withMongoId(item));
});

router.put("/team/:id", async (req, res) => {
  const auth = await requireAuth(req, "team");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const item = await prisma.team.update({ where: { id: req.params.id }, data: req.body });
  return res.json(withMongoId(item));
});

router.delete("/team/:id", async (req, res) => {
  const auth = await requireAuth(req, "team");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  await prisma.team.delete({ where: { id: req.params.id } });
  return res.json({ success: true });
});

router.get("/testimonials", async (req, res) => {
  const auth = await requireAuth(req, "testimonials");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const items = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
  return res.json(withMongoIds(items));
});

router.post("/testimonials", async (req, res) => {
  const auth = await requireAuth(req, "testimonials");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const item = await prisma.testimonial.create({ data: req.body });
  return res.status(201).json(withMongoId(item));
});

router.put("/testimonials/:id", async (req, res) => {
  const auth = await requireAuth(req, "testimonials");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const item = await prisma.testimonial.update({ where: { id: req.params.id }, data: req.body });
  return res.json(withMongoId(item));
});

router.delete("/testimonials/:id", async (req, res) => {
  const auth = await requireAuth(req, "testimonials");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  await prisma.testimonial.delete({ where: { id: req.params.id } });
  return res.json({ success: true });
});

router.get("/users", async (req, res) => {
  const auth = await requireAuth(req, "users");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  return res.json(withMongoIds(users.map(omitPassword)));
});

router.post("/users", async (req, res) => {
  const auth = await requireAuth(req, "users");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });

  const body = req.body;
  const role = ROLES.includes(body.role) ? body.role : "editor";
  const user = await prisma.user.create({
    data: {
      ...body,
      role,
      password: await hashPassword(body.password),
    },
  });
  return res.status(201).json(withMongoId(omitPassword(user)));
});

router.get("/events", (_req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.write(`data: ${JSON.stringify({ type: "heartbeat", time: Date.now() })}\n\n`);
  res.end();
});

export default router;
