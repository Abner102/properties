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
  "id", "name", "slug", "industry", "liveUrl", "featured", "published", "description", "overview", "features", "outcomes", "technologies", "images", "status", "createdAt", "updatedAt"
) VALUES
  ('project-nexora-sms', 'Nexora SMS', 'nexora-sms', 'Education', 'https://nexorasms.com', true, true, 'A school management system for students, teachers, parents, academics, and finances in one secure platform.', 'Nexora SMS gives schools a central platform for daily administration, academic records, communication, finance tracking, and parent engagement.', '["Student, teacher, and parent management", "Academic records and class administration", "Finance and fee tracking", "Secure school communication workflows"]', '["Reduced manual administration for school staff", "Improved visibility for parents and guardians", "Clearer academic and finance reporting"]', '["React", "Node.js", "PostgreSQL", "School Management"]', '["/uploads/projects/nexora.png"]', 'Live', now(), now()),
  ('project-joscity', 'JosCity', 'joscity', 'Government', 'https://joscity.com', true, true, 'A digital city platform for municipal services, payments, and civic engagement.', 'JosCity brings public services into one digital experience, helping residents access services, pay bills, and interact with local government more easily.', '["Municipal service access", "Bill payment workflows", "Citizen engagement tools", "Progressive web app support"]', '["Created a simpler access point for city services", "Improved resident engagement with public services", "Supported digital transformation for civic operations"]', '["React", "PWA", "Payments", "Civic Tech"]', '["/uploads/projects/1785427006340-hyg202m.png"]', 'Live', now(), now()),
  ('project-afresh-center', 'Afresh Center', 'afresh-center', 'Business', 'https://afreshcenter.org', true, true, 'An innovation and entrepreneurship hub website for technology, media, sports, and entertainment initiatives.', 'Afresh Center presents the organization''s mission, services, affiliated companies, and calls to action through a bold public-facing web experience.', '["Program and services presentation", "Affiliate company showcase", "Contact and conversion flows", "Responsive marketing pages"]', '["Strengthened Afresh Center public digital presence", "Made programs and services easier to discover", "Created a polished hub for partner engagement"]', '["React", "Responsive Design", "Brand Website", "Content Strategy"]', '["/uploads/projects/1785427158081-z0d5x0t.png"]', 'Live', now(), now()),
  ('project-gatewav', 'Gatewav', 'gatewav', 'Events', 'https://gatewav.com', true, true, 'A refined live events platform for event discovery, secure tickets, reservations, and instant QR access.', 'Gatewav helps users discover curated events, reserve seats, manage tickets, and check in with confidence through a modern event platform.', '["Event discovery and listings", "Secure ticket reservation", "Instant QR access", "Installable app experience"]', '["Delivered a polished event discovery workflow", "Improved ticket handling and check-in readiness", "Created a scalable foundation for live event operations"]', '["React", "QR Tickets", "Events", "PWA"]', '["/uploads/projects/1785427281834-6ra0y7l.png"]', 'Live', now(), now()),
  ('project-urrantech', 'UrranTech', 'urrantech', 'Tech', 'https://urran-tech.vercel.app', true, true, 'A technology-focused web platform presenting UrranTech''s services, brand, and digital presence.', 'UrranTech is a modern tech project built to communicate the company''s services clearly and give visitors a direct path to learn more and connect.', '["Responsive company website", "Service-focused content structure", "Clear navigation and conversion paths", "Modern technology brand presentation"]', '["Established a polished online presence", "Made UrranTech services easier to discover", "Created a direct live platform for client engagement"]', '["React", "Vercel", "Responsive Design", "Technology Website"]', '["/uploads/projects/urrantech.png"]', 'Live', now(), now()),
  ('project-dikim-rock-garden', 'Dikim Rock Garden', 'dikim-rock-garden', 'Entertainment', 'https://dikim-rock-garden.com.ng', true, true, 'An entertainment and venue website for Dikim Rock Garden.', 'Dikim Rock Garden gives the venue a public-facing digital home for brand visibility, visitor information, and event discovery.', '["Entertainment venue presentation", "Responsive visitor experience", "Live website access", "Brand-focused page structure"]', '["Improved online visibility for the venue", "Made the destination easier to discover", "Created a direct platform for visitor engagement"]', '["React", "Responsive Design", "Venue Website", "Entertainment"]', '["/uploads/projects/dikim-rock-garden.png"]', 'Live', now(), now()),
  ('project-plateau-lawyers-bar-forum', 'Plateau Lawyers Bar Forum', 'plateau-lawyers-bar-forum', 'Law', 'https://plbflaw.org', true, true, 'A legal community website for the Plateau Lawyers Bar Forum.', 'Plateau Lawyers Bar Forum provides a professional web presence for legal information, community visibility, and public access.', '["Professional legal website", "Public information architecture", "Responsive access across devices", "Community-focused presentation"]', '["Strengthened digital credibility for the forum", "Made legal community information easier to access", "Created a polished public-facing platform"]', '["React", "Responsive Design", "Legal Website", "Content Management"]', '["/uploads/projects/plateau-lawyers-bar-forum.png"]', 'Live', now(), now()),
  ('project-aarons-portfolio', 'Aaron''s Portfolio', 'aarons-portfolio', 'Portfolio', 'https://aaronksportfolio.netlify.app', true, true, 'A personal portfolio website showcasing Aaron''s work, skills, and digital profile.', 'Aaron''s Portfolio presents professional experience, selected work, and contact pathways through a clean public portfolio site.', '["Personal brand presentation", "Project and skill showcase", "Responsive portfolio layout", "Direct live profile access"]', '["Created a polished personal web presence", "Improved access to Aaron work and profile", "Supported professional visibility online"]', '["React", "Netlify", "Portfolio", "Responsive Design"]', '["/uploads/projects/aarons-portfolio.png"]', 'Live', now(), now()),
  ('project-cbrilliance-fc', 'Cbrilliance FC', 'cbrilliance-fc', 'Sports', 'https://cbrilliancefc.com', true, true, 'A sports website for Cbrilliance FC with a public digital presence for the football club.', 'Cbrilliance FC gives the club an online home for visibility, updates, and audience engagement through a responsive sports website.', '["Football club website", "Responsive sports presentation", "Live public access", "Brand and community visibility"]', '["Improved digital visibility for the club", "Created a public platform for supporters", "Made the club easier to discover online"]', '["React", "Sports Website", "Responsive Design", "Club Branding"]', '["/uploads/projects/cbrilliance-fc.png"]', 'Live', now(), now())
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "industry" = EXCLUDED."industry",
  "liveUrl" = EXCLUDED."liveUrl",
  "featured" = EXCLUDED."featured",
  "published" = EXCLUDED."published",
  "description" = EXCLUDED."description",
  "overview" = EXCLUDED."overview",
  "features" = EXCLUDED."features",
  "outcomes" = EXCLUDED."outcomes",
  "technologies" = EXCLUDED."technologies",
  "images" = EXCLUDED."images",
  "status" = EXCLUDED."status",
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
