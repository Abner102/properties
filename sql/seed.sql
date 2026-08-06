-- Seed data for Supabase PostgreSQL
-- Run this file after schema.sql with an admin role or service key.

INSERT INTO "User" (
  "id", "email", "password", "name", "role", "suspended", "permissions", "createdAt", "updatedAt"
) VALUES (
  'admin',
  'endlessinfinity16@gmail.com',
  'Admin@12345',
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

DELETE FROM "Product"
WHERE "category" IN ('cars', 'luxury-assets')
  AND "slug" NOT IN (
    'toyota-corolla-2017-white',
    'toyota-camry-2015-red',
    'mercedes-benz-gle-400-white',
    'mercedes-benz-ml-350-blue',
    'lexus-nx200t-black'
  );

INSERT INTO "Product" (
  "id", "name", "productCode", "slug", "category", "price", "city", "state", "bedrooms", "bathrooms",
  "propertyType", "status", "featured", "amenities", "coverImage", "images", "description",
  "brand", "model", "year", "fuel", "transmission", "createdAt", "updatedAt"
) VALUES
  ('product-toyota-corolla-2017-white', 'Toyota Corolla 2017', 'EIP-CAR-COROLLA-2017', 'toyota-corolla-2017-white', 'cars', 23000000, 'Jos', 'Plateau', 0, 0, 'car', 'published', true, '["Color: White", "Body: Sedan", "Trim: XLE", "Engine: 1.8L Inline-4", "Horsepower: 132 hp @ 6,000 rpm", "Torque: 128 lb-ft @ 4,400 rpm", "Valvetrain: DOHC VVT-i, 16 valves", "Transmission: CVT", "Fuel Economy: 32 MPG combined", "City / Highway: 28 / 36 MPG", "Views: Front, side, rear"]', '/uploads/cars/toyota-corolla-2017-front.jpeg', '["/uploads/cars/toyota-corolla-2017-front.jpeg", "/uploads/cars/toyota-corolla-2017-side.jpeg", "/uploads/cars/toyota-corolla-2017-back.jpeg"]', 'White 2017 Toyota Corolla XLE with a 1.8L 4-cylinder engine, CVT, and strong fuel economy.', 'Toyota', 'Corolla', 2017, 'petrol', 'automatic', now(), now()),
  ('product-toyota-camry-2015-red', 'Toyota Camry 2015', 'EIP-CAR-CAMRY-2015', 'toyota-camry-2015-red', 'cars', 19000000, 'Jos', 'Plateau', 0, 0, 'car', 'published', true, '["Color: Red", "Body: Sedan", "Engine: 2.5L Inline-4 DOHC", "Horsepower: 178 hp @ 6,000 rpm", "Torque: 170 lb-ft @ 4,100 rpm", "Transmission: 6-speed automatic", "Drivetrain: Front-wheel drive", "Fuel Economy: 28 MPG combined", "City / Highway: 25 / 35 MPG", "Views: Front, side, rear"]', '/uploads/cars/toyota-camry-2015-front.jpeg', '["/uploads/cars/toyota-camry-2015-front.jpeg", "/uploads/cars/toyota-camry-2015-side.jpeg", "/uploads/cars/toyota-camry-2015-back.jpeg"]', 'Red 2015 Toyota Camry SE with a 2.5L 4-cylinder engine, 6-speed automatic transmission, and front-wheel drive.', 'Toyota', 'Camry', 2015, 'petrol', 'automatic', now(), now()),
  ('product-mercedes-benz-gle-400-white', 'Mercedes-Benz GLE 400', 'EIP-LUX-GLE-400', 'mercedes-benz-gle-400-white', 'luxury-assets', 35000000, 'Jos', 'Plateau', 0, 0, 'car', 'published', true, '["Color: White", "Body: SUV", "Drivetrain: 4MATIC", "Mileage: Available on request"]', '/uploads/cars/mercedes-gle-400-white-front.jpeg', '["/uploads/cars/mercedes-gle-400-white-front.jpeg", "/uploads/cars/mercedes-gle-400-white-side.jpeg", "/uploads/cars/mercedes-gle-400-white-back.jpeg"]', 'White Mercedes-Benz GLE 400 with front, side, and rear views available.', 'Mercedes-Benz', 'GLE 400', 0, 'petrol', 'automatic', now(), now()),
  ('product-mercedes-benz-ml-350-blue', 'Mercedes-Benz ML 350', 'EIP-LUX-ML-350', 'mercedes-benz-ml-350-blue', 'luxury-assets', 33000000, 'Jos', 'Plateau', 0, 0, 'car', 'published', false, '["Color: Navy / Dark Blue", "Body: SUV", "Drivetrain: 4MATIC", "Mileage: Available on request"]', '/uploads/cars/mercedes-ml-350-blue-front.jpeg', '["/uploads/cars/mercedes-ml-350-blue-front.jpeg", "/uploads/cars/mercedes-ml-350-blue-side.jpeg", "/uploads/cars/mercedes-ml-350-blue-back.jpeg"]', 'Navy blue Mercedes-Benz ML 350 with front, side, and rear views available.', 'Mercedes-Benz', 'ML 350', 0, 'petrol', 'automatic', now(), now()),
  ('product-lexus-nx200t-black', 'Lexus NX200t', 'EIP-LUX-NX200T', 'lexus-nx200t-black', 'luxury-assets', 38000000, 'Jos', 'Plateau', 0, 0, 'car', 'published', false, '["Color: Black", "Body: SUV", "Views: Front, side, rear", "Mileage: Available on request"]', '/uploads/cars/lexus-nx200t-black-front.jpeg', '["/uploads/cars/lexus-nx200t-black-front.jpeg", "/uploads/cars/lexus-nx200t-black-side.jpeg", "/uploads/cars/lexus-nx200t-black-back.jpeg"]', 'Black Lexus NX200t with front, side, and rear views available.', 'Lexus', 'NX200t', 0, 'petrol', 'automatic', now(), now())
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "productCode" = EXCLUDED."productCode",
  "category" = EXCLUDED."category",
  "price" = EXCLUDED."price",
  "city" = EXCLUDED."city",
  "state" = EXCLUDED."state",
  "propertyType" = EXCLUDED."propertyType",
  "status" = EXCLUDED."status",
  "featured" = EXCLUDED."featured",
  "amenities" = EXCLUDED."amenities",
  "coverImage" = EXCLUDED."coverImage",
  "images" = EXCLUDED."images",
  "description" = EXCLUDED."description",
  "brand" = EXCLUDED."brand",
  "model" = EXCLUDED."model",
  "year" = EXCLUDED."year",
  "fuel" = EXCLUDED."fuel",
  "transmission" = EXCLUDED."transmission",
  "updatedAt" = now();

UPDATE "Product"
SET
  "year" = 2017,
  "description" = 'Black 2017 Lexus NX200t with a 2.0L turbocharged inline-4, 6-speed automatic transmission, and premium Lexus comfort features.',
  "amenities" = '["Color: Black", "Body: SUV", "Engine: 2.0L Turbocharged Inline-4 (8AR-FTS)", "Horsepower: 235 hp", "Torque: 258 lb-ft (350 Nm)", "Transmission: 6-speed automatic", "Drivetrain: FWD or AWD, depending on trim", "Lighting: LED headlights, LED daytime running lights, LED tail lights", "Comfort: Leather or NuLuxe interior, heated and ventilated front seats, 8-way power front seats", "Convenience: Smart Key with push-button start, power tailgate, power sunroof", "Technology: 8-inch or 10.3-inch Lexus display, Bluetooth, reverse camera, parking sensors", "Drive Modes: Eco, Normal, and Sport", "Safety: VSC, TRAC, ABS with EBD, 8 airbags", "Wheels: 18-inch alloy wheels", "Views: Front, side, rear"]',
  "updatedAt" = now()
WHERE "slug" = 'lexus-nx200t-black';

UPDATE "Product"
SET
  "year" = 2015,
  "description" = 'White 2015 Mercedes-Benz GLE 400 4MATIC with a 3.0L twin-turbo V6, permanent all-wheel drive, and premium driver-assistance features.',
  "amenities" = '["Color: White", "Body: SUV", "Engine: 3.0L Twin-Turbo V6", "Horsepower: 329 hp", "Torque: 354 lb-ft (480 Nm)", "Transmission: 9G-TRONIC automatic", "Drivetrain: Permanent 4MATIC AWD", "Lighting: Full LED intelligent headlights, LED tail lights", "Comfort: Leather interior, heated front seats, memory seats, electric front seats", "Convenience: Power liftgate, Keyless-Go push start, power folding mirrors, rain-sensing wipers", "Technology: COMAND navigation, Bluetooth audio, reverse camera, parking sensors", "Driver Assist: Blind Spot Assist, Lane Keeping Assist, Collision Prevention Assist Plus", "Drive Features: Dynamic Select modes, paddle shifters, optional AIRMATIC air suspension", "Views: Front, side, rear"]',
  "updatedAt" = now()
WHERE "slug" = 'mercedes-benz-gle-400-white';

UPDATE "Product"
SET
  "year" = 2013,
  "description" = 'Navy blue 2013 Mercedes-Benz ML 350 4MATIC with a 3.5L V6, 7G-TRONIC Plus transmission, and full-time all-wheel drive.',
  "amenities" = '["Color: Navy / Dark Blue", "Body: SUV", "Engine: 3.5L Naturally Aspirated V6", "Horsepower: 302 hp", "Torque: 273 lb-ft (370 Nm)", "Transmission: 7G-TRONIC Plus automatic", "Drivetrain: Full-time 4MATIC AWD", "Lighting: Bi-Xenon headlights, LED daytime running lights, LED tail lights", "Comfort: Leather seats, heated front seats, memory driver seat, dual-zone climate control", "Technology: COMAND infotainment, Bluetooth, reverse camera, parking sensors", "Drive Features: Cruise control, paddle shifters, hill descent control", "Safety: ABS, ESP, Brake Assist, multiple airbags", "Wheels: 19-inch alloy wheels", "Views: Front, side, rear"]',
  "updatedAt" = now()
WHERE "slug" = 'mercedes-benz-ml-350-blue';

UPDATE "Product"
SET
  "name" = 'Toyota Corolla XLE 2017',
  "model" = 'Corolla XLE',
  "description" = 'White 2017 Toyota Corolla XLE with a 1.8L 4-cylinder engine, CVT, and strong fuel economy.',
  "amenities" = '["Color: White", "Body: Sedan", "Trim: XLE", "Trim Meaning: Executive Luxury Edition", "Positioning: High-comfort Toyota sedan with upgraded convenience and tech features", "Engine: 1.8L Inline-4", "Horsepower: 132 hp @ 6,000 rpm", "Torque: 128 lb-ft @ 4,400 rpm", "Valvetrain: DOHC VVT-i, 16 valves", "Transmission: CVT", "Fuel Economy: 32 MPG combined", "City / Highway: 28 / 36 MPG", "Views: Front, side, rear"]',
  "updatedAt" = now()
WHERE "slug" = 'toyota-corolla-2017-white';

UPDATE "Product"
SET
  "name" = 'Toyota Camry SE 2015',
  "model" = 'Camry SE',
  "description" = 'Red 2015 Toyota Camry SE with a 2.5L 4-cylinder engine, 6-speed automatic transmission, and front-wheel drive.',
  "amenities" = '["Color: Red", "Body: Sedan", "Trim: SE", "Trim Meaning: Sport Edition", "Positioning: Sport-styled Toyota sedan with a firmer, more athletic feel", "Engine: 2.5L Inline-4 DOHC", "Horsepower: 178 hp @ 6,000 rpm", "Torque: 170 lb-ft @ 4,100 rpm", "Transmission: 6-speed automatic", "Drivetrain: Front-wheel drive", "Fuel Economy: 28 MPG combined", "City / Highway: 25 / 35 MPG", "Views: Front, side, rear"]',
  "updatedAt" = now()
WHERE "slug" = 'toyota-camry-2015-red';

UPDATE "Product"
SET
  "name" = 'Lexus NX200t 2017',
  "model" = 'NX200t',
  "description" = 'Black 2017 Lexus NX200t with a 2.0L turbocharged inline-4, 6-speed automatic transmission, and premium Lexus comfort features.',
  "amenities" = '["Color: Black", "Body: SUV", "Luxury Segment: Compact luxury SUV", "Luxury Level: 4/5 - premium compact luxury", "Best For: Buyers who want a reliable luxury SUV with low maintenance costs", "Engine: 2.0L Turbocharged Inline-4 (8AR-FTS)", "Horsepower: 235 hp", "Torque: 258 lb-ft (350 Nm)", "Transmission: 6-speed automatic", "Drivetrain: FWD or AWD, depending on trim", "Lighting: LED headlights, LED daytime running lights, LED tail lights", "Comfort: Leather or NuLuxe interior, heated and ventilated front seats, 8-way power front seats", "Convenience: Smart Key with push-button start, power tailgate, power sunroof", "Technology: 8-inch or 10.3-inch Lexus display, Bluetooth, reverse camera, parking sensors", "Drive Modes: Eco, Normal, and Sport", "Safety: VSC, TRAC, ABS with EBD, 8 airbags", "Wheels: 18-inch alloy wheels", "Views: Front, side, rear"]',
  "updatedAt" = now()
WHERE "slug" = 'lexus-nx200t-black';

UPDATE "Product"
SET
  "name" = 'Mercedes-Benz GLE 400 4MATIC 2015',
  "model" = 'GLE 400 4MATIC',
  "description" = 'White 2015 Mercedes-Benz GLE 400 4MATIC with a 3.0L twin-turbo V6, permanent all-wheel drive, and premium driver-assistance features.',
  "amenities" = '["Color: White", "Body: SUV", "Luxury Segment: Mid-size premium luxury SUV", "Luxury Level: 5/5 - executive luxury", "Best For: Buyers seeking luxury, power, and executive-class comfort", "Engine: 3.0L Twin-Turbo V6", "Horsepower: 329 hp", "Torque: 354 lb-ft (480 Nm)", "Transmission: 9G-TRONIC automatic", "Drivetrain: Permanent 4MATIC AWD", "Lighting: Full LED intelligent headlights, LED tail lights", "Comfort: Leather interior, heated front seats, memory seats, electric front seats", "Convenience: Power liftgate, Keyless-Go push start, power folding mirrors, rain-sensing wipers", "Technology: COMAND navigation, Bluetooth audio, reverse camera, parking sensors", "Driver Assist: Blind Spot Assist, Lane Keeping Assist, Collision Prevention Assist Plus", "Drive Features: Dynamic Select modes, paddle shifters, optional AIRMATIC air suspension", "Views: Front, side, rear"]',
  "updatedAt" = now()
WHERE "slug" = 'mercedes-benz-gle-400-white';

UPDATE "Product"
SET
  "name" = 'Mercedes-Benz ML 350 4MATIC 2013',
  "model" = 'ML 350 4MATIC',
  "description" = 'Navy blue 2013 Mercedes-Benz ML 350 4MATIC with a 3.5L V6, 7G-TRONIC Plus transmission, and full-time all-wheel drive.',
  "amenities" = '["Color: Navy / Dark Blue", "Body: SUV", "Luxury Segment: Mid-size luxury SUV", "Luxury Level: 4/5 - refined luxury", "Best For: Buyers looking for comfort, durability, and Mercedes-Benz prestige", "Engine: 3.5L Naturally Aspirated V6", "Horsepower: 302 hp", "Torque: 273 lb-ft (370 Nm)", "Transmission: 7G-TRONIC Plus automatic", "Drivetrain: Full-time 4MATIC AWD", "Lighting: Bi-Xenon headlights, LED daytime running lights, LED tail lights", "Comfort: Leather seats, heated front seats, memory driver seat, dual-zone climate control", "Technology: COMAND infotainment, Bluetooth, reverse camera, parking sensors", "Drive Features: Cruise control, paddle shifters, hill descent control", "Safety: ABS, ESP, Brake Assist, multiple airbags", "Wheels: 19-inch alloy wheels", "Views: Front, side, rear"]',
  "updatedAt" = now()
WHERE "slug" = 'mercedes-benz-ml-350-blue';

INSERT INTO "SoftwareProject" (
  "id", "name", "slug", "industry", "liveUrl", "featured", "published", "description", "createdAt", "updatedAt"
) VALUES
  ('project-nexora-sms', 'Nexora SMS', 'nexora-sms', 'Communication', 'https://nexorasms.com', true, true, 'Enterprise bulk SMS platform.', now(), now()),
  ('project-joscity', 'JosCity', 'joscity', 'Government', 'https://joscity.com', true, true, 'Digital city platform.', now(), now()),
  ('project-afresh-center', 'Afresh Center', 'afresh-center', 'Healthcare', 'https://afreshcenter.org', true, true, 'Healthcare management platform.', now(), now()),
  ('project-jobfinix', 'JobFinix', 'jobfinix', 'HR/Tech', 'https://jobfinix.com', true, true, 'Job marketplace.', now(), now()),
  ('project-gatewav', 'Gatewav', 'gatewav', 'Finance', 'https://gatewav.com', true, true, 'Payment gateway.', now(), now())
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "industry" = EXCLUDED."industry",
  "liveUrl" = EXCLUDED."liveUrl",
  "featured" = EXCLUDED."featured",
  "published" = EXCLUDED."published",
  "description" = EXCLUDED."description",
  "updatedAt" = now();

INSERT INTO "Team" (
  "id", "name", "position", "bio", "image", "email", "github", "linkedin", "instagram", "isFounder", "order", "published", "createdAt", "updatedAt"
) VALUES
  ('team-emmanuel-infinity', 'Aaron Manzo Kigun', 'Co-Founder & CEO', 'Co-founder and Chief Executive Officer at Endless Infinity Properties, leading the company''s growth across property, cars, websites, and land services.', '/uploads/team/aaron-manzo-kigun.jpeg', 'aaronkigun@gmail.com', 'https://github.com/aaronKigun', 'https://www.linkedin.com/in/aaron-kigun00123', 'https://instagram.com/Leeroyszn001/', true, 1, true, now(), now()),
  ('team-david-endless', 'Abner Abraham', 'Co-Founder & COO', 'Co-founder and Chief Operating Officer at Endless Infinity Properties, overseeing operations and client delivery across the company''s services.', '/uploads/team/abner-abraham.jpeg', 'abnerabraham25@gmail.com', 'https://github.com/Abner102', 'https://www.linkedin.com/in/abner-abraham-05a061374', 'https://instagram.com/abnerabraham25', true, 2, true, now(), now()),
  ('team-sanderson-stephen', 'Sanderson Stephen', 'CTO / Assistant Videographer', 'Supports technology leadership and assists with video production for Endless Infinity Properties.', '/uploads/team/sanderson-stephen.png', 'Sandersonstephen3@gmail.com', 'https://github.com/DeanAndie', 'https://www.linkedin.com/in/sanderson-stephen-67673323b', 'https://www.instagram.com/Ds_anderson7', false, 3, true, now(), now()),
  ('team-william-bosworth', 'William Bosworth', 'Marketing & Content / Chief Videographer', 'Leads visual storytelling, marketing content, and video production for Endless Infinity Properties.', '/uploads/team/william-bosworth.jpeg', 'williambosworth420@gmail.com', 'https://github.com/PrimeWill737', 'https://www.linkedin.com/in/william-bosworth-8514631b2', 'https://www.instagram.com/william_bosworthh', false, 4, true, now(), now()),
  ('team-blessing-matthias', 'Blessing Matthias', 'Client Relations', 'Ensures every client receives timely updates, support, and a smooth experience.', '/uploads/team/blessing-matthias.png', null, 'https://github.com/Nachi-bl', null, 'https://www.instagram.com/bless_nachi', false, 5, true, now(), now())
ON CONFLICT ("id") DO UPDATE SET
  "name" = EXCLUDED."name",
  "position" = EXCLUDED."position",
  "bio" = EXCLUDED."bio",
  "image" = EXCLUDED."image",
  "email" = EXCLUDED."email",
  "github" = EXCLUDED."github",
  "linkedin" = EXCLUDED."linkedin",
  "instagram" = EXCLUDED."instagram",
  "isFounder" = EXCLUDED."isFounder",
  "order" = EXCLUDED."order",
  "published" = EXCLUDED."published",
  "updatedAt" = now();
