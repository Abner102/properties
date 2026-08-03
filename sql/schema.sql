-- PostgreSQL schema for Supabase
-- Run this file first to create the required tables and constraints.

CREATE TABLE IF NOT EXISTS "User" (
  "id" text PRIMARY KEY,
  "email" text NOT NULL UNIQUE,
  "password" text NOT NULL,
  "name" text NOT NULL,
  "role" text NOT NULL DEFAULT 'admin',
  "suspended" boolean NOT NULL DEFAULT false,
  "lastLogin" timestamptz,
  "refreshToken" text,
  "permissions" jsonb NOT NULL DEFAULT '[]',
  "phone" text,
  "avatar" text,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "Product" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "productCode" text UNIQUE,
  "slug" text NOT NULL UNIQUE,
  "shortDescription" text,
  "description" text NOT NULL DEFAULT '',
  "price" double precision NOT NULL DEFAULT 0,
  "discountPrice" double precision,
  "stock" integer NOT NULL DEFAULT 1,
  "category" text NOT NULL,
  "subcategory" text,
  "brand" text,
  "propertyType" text,
  "listingType" text NOT NULL DEFAULT 'sale',
  "bedrooms" integer NOT NULL DEFAULT 0,
  "bathrooms" integer NOT NULL DEFAULT 0,
  "toilets" integer NOT NULL DEFAULT 0,
  "parkingSpaces" integer NOT NULL DEFAULT 0,
  "landSize" double precision,
  "squareMeter" double precision,
  "yearBuilt" integer,
  "address" text,
  "state" text,
  "city" text,
  "area" text,
  "lat" double precision,
  "lng" double precision,
  "amenities" jsonb NOT NULL DEFAULT '[]',
  "specifications" jsonb,
  "model" text,
  "year" integer,
  "fuel" text,
  "transmission" text,
  "mileage" integer,
  "color" text,
  "engine" text,
  "vin" text,
  "technologies" jsonb NOT NULL DEFAULT '[]',
  "githubUrl" text,
  "liveUrl" text,
  "client" text,
  "completionDate" timestamptz,
  "coverImage" text,
  "images" jsonb NOT NULL DEFAULT '[]',
  "videos" jsonb NOT NULL DEFAULT '[]',
  "pdfs" jsonb NOT NULL DEFAULT '[]',
  "floorPlans" jsonb NOT NULL DEFAULT '[]',
  "featured" boolean NOT NULL DEFAULT false,
  "trending" boolean NOT NULL DEFAULT false,
  "popular" boolean NOT NULL DEFAULT false,
  "recommended" boolean NOT NULL DEFAULT false,
  "status" text NOT NULL DEFAULT 'draft',
  "views" integer NOT NULL DEFAULT 0,
  "tags" jsonb NOT NULL DEFAULT '[]',
  "metaTitle" text,
  "metaDescription" text,
  "keywords" jsonb NOT NULL DEFAULT '[]',
  "investmentScore" double precision,
  "nearbySchools" jsonb NOT NULL DEFAULT '[]',
  "nearbyHospitals" jsonb NOT NULL DEFAULT '[]',
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "Product_category_status_idx" ON "Product" ("category", "status");

CREATE TABLE IF NOT EXISTS "Blog" (
  "id" text PRIMARY KEY,
  "title" text NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "excerpt" text,
  "content" text NOT NULL DEFAULT '',
  "category" text,
  "tags" jsonb NOT NULL DEFAULT '[]',
  "image" text,
  "author" text,
  "readTime" integer NOT NULL DEFAULT 5,
  "published" boolean NOT NULL DEFAULT false,
  "scheduledAt" timestamptz,
  "featured" boolean NOT NULL DEFAULT false,
  "metaTitle" text,
  "metaDescription" text,
  "views" integer NOT NULL DEFAULT 0,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "Team" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "position" text,
  "bio" text,
  "image" text,
  "email" text,
  "phone" text,
  "skills" jsonb NOT NULL DEFAULT '[]',
  "experience" text,
  "yearsExperience" integer,
  "github" text,
  "linkedin" text,
  "instagram" text,
  "isFounder" boolean NOT NULL DEFAULT false,
  "order" integer NOT NULL DEFAULT 0,
  "published" boolean NOT NULL DEFAULT true,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "Category" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "parentId" text,
  "icon" text,
  "image" text,
  "description" text,
  "order" integer NOT NULL DEFAULT 0,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "Settings" (
  "id" text PRIMARY KEY,
  "key" text NOT NULL UNIQUE DEFAULT 'default',
  "companyName" text NOT NULL DEFAULT 'Endless Infinity Properties',
  "tagline" text,
  "phone" text NOT NULL DEFAULT '07065109007',
  "whatsapp" text NOT NULL DEFAULT '07065109007',
  "email" text,
  "address" text,
  "logo" text,
  "favicon" text,
  "socialInstagram" text,
  "socialLinkedin" text,
  "socialTwitter" text,
  "socialYoutube" text,
  "socialFacebook" text,
  "heroVideo" text,
  "heroImage" text,
  "seoTitle" text,
  "seoDescription" text,
  "googleAnalytics" text,
  "facebookPixel" text,
  "smtpHost" text,
  "smtpPort" integer,
  "cloudinaryCloudName" text,
  "mapLat" double precision,
  "mapLng" double precision,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "SoftwareProject" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "category" text,
  "description" text,
  "overview" text,
  "features" jsonb NOT NULL DEFAULT '[]',
  "outcomes" jsonb NOT NULL DEFAULT '[]',
  "technologies" jsonb NOT NULL DEFAULT '[]',
  "industry" text,
  "client" text,
  "githubUrl" text,
  "liveUrl" text,
  "images" jsonb NOT NULL DEFAULT '[]',
  "screenshots" jsonb NOT NULL DEFAULT '[]',
  "completionDate" timestamptz,
  "status" text NOT NULL DEFAULT 'completed',
  "published" boolean NOT NULL DEFAULT true,
  "featured" boolean NOT NULL DEFAULT false,
  "awards" jsonb NOT NULL DEFAULT '[]',
  "certificates" jsonb NOT NULL DEFAULT '[]',
  "videos" jsonb NOT NULL DEFAULT '[]',
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "Inquiry" (
  "id" text PRIMARY KEY,
  "type" text NOT NULL,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "phone" text,
  "message" text NOT NULL,
  "subject" text,
  "productId" text,
  "status" text NOT NULL DEFAULT 'new',
  "assignedTo" text,
  "reply" text,
  "repliedAt" timestamptz,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "Testimonial" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "role" text NOT NULL,
  "content" text NOT NULL,
  "image" text,
  "rating" integer NOT NULL DEFAULT 5,
  "published" boolean NOT NULL DEFAULT true,
  "createdAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "Newsletter" (
  "id" text PRIMARY KEY,
  "email" text NOT NULL UNIQUE,
  "active" boolean NOT NULL DEFAULT true,
  "createdAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "Notification" (
  "id" text PRIMARY KEY,
  "type" text NOT NULL,
  "title" text NOT NULL,
  "message" text,
  "read" boolean NOT NULL DEFAULT false,
  "link" text,
  "userId" text,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "ActivityLog" (
  "id" text PRIMARY KEY,
  "userId" text,
  "action" text NOT NULL,
  "entity" text,
  "entityId" text,
  "details" jsonb,
  "ip" text,
  "userAgent" text,
  "createdAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "LoginAttempt" (
  "id" text PRIMARY KEY,
  "email" text NOT NULL,
  "ip" text,
  "success" boolean NOT NULL DEFAULT false,
  "userAgent" text,
  "createdAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "Media" (
  "id" text PRIMARY KEY,
  "filename" text NOT NULL,
  "url" text NOT NULL,
  "type" text NOT NULL,
  "folder" text NOT NULL DEFAULT 'general',
  "size" integer,
  "createdAt" timestamptz NOT NULL DEFAULT now()
);
