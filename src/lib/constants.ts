export const ROLES = [
  "super_admin",
  "admin",
  "property_manager",
  "vehicle_manager",
  "content_manager",
  "software_manager",
  "marketing_manager",
  "editor",
] as const;

export type Role = (typeof ROLES)[number];

export const PERMISSIONS: Record<Role, string[]> = {
  super_admin: ["*"],
  admin: ["dashboard", "products", "categories", "blog", "team", "projects", "portfolio", "inquiries", "users", "media", "analytics", "settings"],
  property_manager: ["dashboard", "products", "categories", "inquiries", "media"],
  vehicle_manager: ["dashboard", "products", "inquiries", "media"],
  content_manager: ["dashboard", "blog", "media", "testimonials", "newsletter"],
  software_manager: ["dashboard", "projects", "portfolio", "inquiries"],
  marketing_manager: ["dashboard", "blog", "newsletter", "analytics", "testimonials"],
  editor: ["dashboard", "blog", "products"],
};

export function hasPermission(role: Role, permission: string): boolean {
  const perms = PERMISSIONS[role] || [];
  return perms.includes("*") || perms.includes(permission);
}

export const PRODUCT_CATEGORIES = [
  "houses",
  "lands",
  "apartments",
  "commercial",
  "cars",
  "luxury-assets",
  "software-services",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const PRODUCT_STATUSES = [
  "draft",
  "published",
  "archived",
  "available",
  "sold",
  "reserved",
] as const;

export const AMENITIES = [
  "Swimming Pool",
  "Gym",
  "Security",
  "CCTV",
  "Garden",
  "Balcony",
  "Elevator",
  "WiFi",
  "Generator",
  "Borehole",
  "Smart Home",
] as const;

export function generateProductCode(category: string): string {
  const prefix = category.slice(0, 3).toUpperCase();
  const num = Date.now().toString(36).toUpperCase();
  return `EIP-${prefix}-${num}`;
}
