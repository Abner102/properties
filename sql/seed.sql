-- Seed data for Supabase PostgreSQL
-- Run this file after schema.sql with an admin role or service key.

INSERT INTO "User" (
  "id", "email", "password", "name", "role", "suspended", "permissions", "createdAt", "updatedAt"
) VALUES (
  'admin',
  'endlessinfinity16@gmail.com',
  '$2b$12$fAVPaAoVW.z5Jk3podRFveMGLwpRe5SRpXanJYCOUWxrIWhUItL8u',
  'Super Admin',
  'super_admin',
  false,
  '[]',
  now(),
  now()
)
ON CONFLICT ("email") DO UPDATE SET
  "password" = EXCLUDED."password",
  "name" = EXCLUDED."name",
  "role" = EXCLUDED."role",
  "suspended" = EXCLUDED."suspended",
  "permissions" = EXCLUDED."permissions",
  "updatedAt" = now();

INSERT INTO "Settings" (
  "id", "key", "companyName", "phone", "whatsapp", "email", "address", "createdAt", "updatedAt"
) VALUES (
  'settings-default',
  'default',
  'Endless Infinity Properties',
  '07065109007',
  '07065109007',
  'endlessinfinity16@gmail.com',
  'Along Yakubu Gowon Way, Jos, Plateau State, Nigeria',
  now(),
  now()
)
ON CONFLICT ("key") DO UPDATE SET
  "companyName" = EXCLUDED."companyName",
  "phone" = EXCLUDED."phone",
  "whatsapp" = EXCLUDED."whatsapp",
  "email" = EXCLUDED."email",
  "address" = EXCLUDED."address",
  "updatedAt" = now();

INSERT INTO "Category" ("id", "name", "slug", "order", "createdAt", "updatedAt") VALUES
  ('cat-houses', 'Houses', 'houses', 1, now(), now()),
  ('cat-lands', 'Lands', 'lands', 2, now(), now()),
  ('cat-apartments', 'Apartments', 'apartments', 3, now(), now()),
  ('cat-commercial', 'Commercial Properties', 'commercial', 4, now(), now()),
  ('cat-cars', 'Cars', 'cars', 5, now(), now()),
  ('cat-luxury-assets', 'Luxury Assets', 'luxury-assets', 6, now(), now()),
  ('cat-software-services', 'Software Services', 'software-services', 7, now(), now())
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "updatedAt" = now();

INSERT INTO "Product" (
  "id", "name", "productCode", "slug", "category", "price", "city", "state", "bedrooms", "bathrooms", "status", "featured", "amenities", "coverImage", "description", "createdAt", "updatedAt"
) VALUES
  ('product-lekki-penthouse', 'Lekki Phase 1 Luxury Penthouse', 'EIP-APP-BASE', 'lekki-penthouse', 'apartments', 450000000, 'Lagos', 'Lagos', 4, 5, 'published', true, '["Swimming Pool", "Gym", "24/7 Security", "Smart Home"]', '/images/property-1.jpg', 'Stunning penthouse with panoramic lagoon views.', now(), now()),
  ('product-ikeja-gra-land', 'Ikeja GRA Development Land', 'EIP-LAN-BASE', 'ikeja-gra-land', 'lands', 95000000, 'Lagos', 'Lagos', 0, 0, 'published', true, '[]', '/images/land-1.jpg', 'Prime land with C of O in Ikeja GRA.', now(), now()),
  ('product-mercedes-s-class', 'Mercedes-Benz S-Class 2024', 'EIP-CAR-BASE', 'mercedes-s-class', 'cars', 85000000, null, null, 0, 0, 'published', true, '[]', '/images/car-mercedes.jpg', 'Brand new Mercedes-Benz S-Class with full options.', now(), now())
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "productCode" = EXCLUDED."productCode",
  "category" = EXCLUDED."category",
  "price" = EXCLUDED."price",
  "city" = EXCLUDED."city",
  "state" = EXCLUDED."state",
  "bedrooms" = EXCLUDED."bedrooms",
  "bathrooms" = EXCLUDED."bathrooms",
  "status" = EXCLUDED."status",
  "featured" = EXCLUDED."featured",
  "amenities" = EXCLUDED."amenities",
  "coverImage" = EXCLUDED."coverImage",
  "description" = EXCLUDED."description",
  "updatedAt" = now();

INSERT INTO "SoftwareProject" (
  "id", "name", "slug", "industry", "liveUrl", "featured", "published", "description", "createdAt", "updatedAt"
) VALUES
  ('project-nexora-sms', 'Nexora SMS', 'Communication', 'https://nexorasms.com', true, true, 'Enterprise bulk SMS platform.', now(), now()),
  ('project-joscity', 'JosCity', 'Government', 'https://joscity.com', true, true, 'Digital city platform.', now(), now()),
  ('project-afresh-center', 'Afresh Center', 'Healthcare', 'https://afreshcenter.org', true, true, 'Healthcare management platform.', now(), now()),
  ('project-jobfinix', 'JobFinix', 'HR/Tech', 'https://jobfinix.com', true, true, 'Job marketplace.', now(), now()),
  ('project-gatewav', 'Gatewav', 'Finance', 'https://gatewav.com', true, true, 'Payment gateway.', now(), now())
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "industry" = EXCLUDED."industry",
  "liveUrl" = EXCLUDED."liveUrl",
  "featured" = EXCLUDED."featured",
  "published" = EXCLUDED."published",
  "description" = EXCLUDED."description",
  "updatedAt" = now();

INSERT INTO "Team" (
  "id", "name", "position", "bio", "email", "isFounder", "order", "published", "createdAt", "updatedAt"
) VALUES
  ('team-emmanuel-infinity', 'Emmanuel Infinity', 'Co-Founder & Chief Technology Officer', 'Full-stack software engineer leading technology initiatives at Endless Infinity Properties.', 'endlessinfinity16@gmail.com', true, 1, true, now(), now()),
  ('team-david-endless', 'David Endless', 'Co-Founder & Chief Executive Officer', 'Software architect and real estate investor building lasting value for clients.', 'endlessinfinity16@gmail.com', true, 2, true, now(), now()),
  ('team-sarah-bello', 'Sarah Bello', 'Real Estate Consultant', 'Helps clients find verified properties and guides them through every step of the buying process.', 'endlessinfinity16@gmail.com', false, 3, true, now(), now())
ON CONFLICT ("id") DO UPDATE SET
  "name" = EXCLUDED."name",
  "position" = EXCLUDED."position",
  "bio" = EXCLUDED."bio",
  "email" = EXCLUDED."email",
  "isFounder" = EXCLUDED."isFounder",
  "order" = EXCLUDED."order",
  "published" = EXCLUDED."published",
  "updatedAt" = now();
