import { Router } from "express";
import { z } from "zod";
import db from "../lib/db";
import {
  verifyPassword,
  signAccessToken,
  signRefreshToken,
  setAuthCookies,
  clearAuthCookies,
  getAuthUserFromRequest,
  ENV_ADMIN_ID,
  getEnvAdminCredentials,
  isEnvAdminAuth,
} from "../lib/auth";
import { signInWithSupabase, hasSupabaseAuth } from "../lib/supabase";
import { logActivity } from "../lib/api-helpers";
import { omitPassword, withMongoId } from "../lib/serialize";

const router = Router();

type DbUser = {
  id: string;
  email: string;
  password: string;
  role: string;
  suspended?: boolean;
  name?: string | null;
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function envAdminLogin(email: string, password: string, res: import("express").Response) {
  const admin = getEnvAdminCredentials();
  if (email !== admin.email.toLowerCase() || password !== admin.password) {
    return null;
  }

  const accessToken = signAccessToken({
    userId: ENV_ADMIN_ID,
    email: admin.email,
    role: admin.role,
  });
  const refreshToken = signRefreshToken({ userId: ENV_ADMIN_ID });
  setAuthCookies(res, accessToken, refreshToken);

  return {
    user: { id: ENV_ADMIN_ID, email: admin.email, name: admin.name, role: admin.role },
  };
}

router.post("/login", async (req, res) => {
  try {
    const { email: rawEmail, password } = loginSchema.parse(req.body);
    const email = rawEmail.trim().toLowerCase();
    const ip = (req.headers["x-forwarded-for"] as string) || "unknown";

    let user: DbUser | null = null;
    let authenticatedWithSupabase = false;

    if (hasSupabaseAuth()) {
      const authResult = await signInWithSupabase(email, password);
      authenticatedWithSupabase = !!authResult?.data?.session;
      if (!authenticatedWithSupabase) {
        const result = envAdminLogin(email, password, res);
        if (result) return res.json(result);
        return res.status(401).json({ error: authResult?.error?.message || "Invalid email or password" });
      }
    }

    try {
      user = (await db.user.findUnique({ where: { email } })) as DbUser | null;
    } catch {
      const result = envAdminLogin(email, password, res);
      if (result) return res.json(result);
      return res.status(503).json({
        error: "Database unavailable. Use admin credentials from .env.",
      });
    }

    let success = false;
    if (authenticatedWithSupabase) {
      success = !!user;
    } else {
      success = !!user && (await verifyPassword(password, user.password));
    }

    try {
      await db.loginAttempt.create({
        data: {
          email,
          ip,
          success: !!success,
          userAgent: req.headers["user-agent"],
        },
      });
    } catch {
      // non-blocking
    }

    if (!success || !user) {
      const result = envAdminLogin(email, password, res);
      if (result) return res.json(result);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (user.suspended) {
      return res.status(403).json({ error: "Account suspended" });
    }

    const accessToken = signAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role as import("../lib/constants").Role,
    });
    const refreshToken = signRefreshToken({ userId: user.id });

    await db.user.update({
      where: { id: user.id },
      data: { refreshToken, lastLogin: new Date() },
    });

    setAuthCookies(res, accessToken, refreshToken);
    await logActivity(user.id, "login", "User", user.id, {}, req);

    return res.json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid input" });
    }
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/logout", async (req, res) => {
  const auth = getAuthUserFromRequest(req.cookies as Record<string, string | undefined>);
  if (auth && !isEnvAdminAuth(auth.userId)) {
    try {
      await db.user.update({
        where: { id: auth.userId },
        data: { refreshToken: null },
      });
    } catch {
      // non-blocking
    }
  }
  clearAuthCookies(res);
  return res.json({ success: true });
});

async function getSessionUser(req: import("express").Request) {
  const auth = getAuthUserFromRequest(req.cookies as Record<string, string | undefined>);
  if (!auth) return null;

  if (isEnvAdminAuth(auth.userId)) {
    const admin = getEnvAdminCredentials();
    return { _id: ENV_ADMIN_ID, email: admin.email, name: admin.name, role: admin.role };
  }

  try {
    const user = await db.user.findUnique({ where: { id: auth.userId } });
    return withMongoId(user ? omitPassword(user) : null);
  } catch {
    return null;
  }
}

router.get("/session", async (req, res) => {
  const user = await getSessionUser(req);
  return res.json({ user });
});

router.get("/me", async (req, res) => {
  const user = await getSessionUser(req);
  return res.json({ user });
});

router.get("/logout", async (req, res) => {
  const user = await getSessionUser(req);
  return res.json({ user });
});

export default router;

