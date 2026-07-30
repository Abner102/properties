import { Router } from "express";
import authRoutes from "./auth";
import inquiriesRoutes from "./inquiries";
import newsletterRoutes from "./newsletter";
import publicProductsRoutes from "./public-products";
import productsRoutes from "./products";
import settingsRoutes from "./settings";
import blogRoutes from "./blog";
import catalogRoutes from "./catalog";
import adminRoutes from "./admin";
import publicTeamRoutes from "./public-team";
import uploadRoutes from "./upload";

const router = Router();

router.use("/auth", authRoutes);
router.use("/inquiries", inquiriesRoutes);
router.use("/newsletter", newsletterRoutes);
router.use("/public/products", publicProductsRoutes);
router.use("/public/team", publicTeamRoutes);
router.use("/upload", uploadRoutes);
router.use("/admin/upload", uploadRoutes);
router.use("/products", productsRoutes);
router.use("/settings", settingsRoutes);
router.use("/blog", blogRoutes);

// Catalog endpoints (properties, cars, lands, projects)
router.use(catalogRoutes);

router.use("/admin", adminRoutes);

export default router;
