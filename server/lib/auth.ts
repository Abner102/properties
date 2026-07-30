import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Response } from "express";
import type { Role } from "./constants.js";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || JWT_SECRET + "-refresh";
export const ACCESS_TOKEN_NAME = "eip_access";
export const REFRESH_TOKEN_NAME = "eip_refresh";
const ACCESS_MAX_AGE = 60 * 60 * 2;
const REFRESH_MAX_AGE = 60 * 60 * 24 * 30;

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signAccessToken(payload: { userId: string; email: string; role: Role }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
}

export function signRefreshToken(payload: { userId: string }) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "30d" });
}

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string; role: Role };
  } catch {
    return null;
  }
}

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export function setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
  res.cookie(ACCESS_TOKEN_NAME, accessToken, { ...cookieOptions, maxAge: ACCESS_MAX_AGE * 1000 });
  res.cookie(REFRESH_TOKEN_NAME, refreshToken, { ...cookieOptions, maxAge: REFRESH_MAX_AGE * 1000 });
}

export function clearAuthCookies(res: Response) {
  res.clearCookie(ACCESS_TOKEN_NAME, cookieOptions);
  res.clearCookie(REFRESH_TOKEN_NAME, cookieOptions);
}

export function getAuthUserFromRequest(cookies: Record<string, string | undefined>) {
  const token = cookies[ACCESS_TOKEN_NAME];
  if (!token) return null;
  return verifyAccessToken(token);
}

export const ENV_ADMIN_ID = "env-admin";

export function getEnvAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL || "endlessinfinity16@gmail.com",
    password: process.env.ADMIN_PASSWORD || "Admin@12345",
    name: "Super Admin",
    role: "super_admin" as Role,
  };
}

export function isEnvAdminAuth(userId: string) {
  return userId === ENV_ADMIN_ID;
}
