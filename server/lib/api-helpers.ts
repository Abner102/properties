import type { Request } from "express";
import {
  getAuthUserFromRequest,
  isEnvAdminAuth,
  getEnvAdminCredentials,
  ACCESS_TOKEN_NAME,
} from "./auth";
import { hasPermission, type Role } from "./constants";
import db from "./db";
import { omitPassword, withMongoId } from "./serialize";

export async function requireAuth(req: Request, permission?: string) {
  const auth = getAuthUserFromRequest(req.cookies as Record<string, string | undefined>);
  if (!auth) return { error: "Unauthorized", status: 401 as const, user: null };

  if (isEnvAdminAuth(auth.userId)) {
    const envAdmin = getEnvAdminCredentials();
    if (permission && !hasPermission(envAdmin.role, permission)) {
      return { error: "Forbidden", status: 403 as const, user: null };
    }
    return {
      error: null,
      status: 200 as const,
      user: {
        _id: auth.userId,
        email: envAdmin.email,
        name: envAdmin.name,
        role: envAdmin.role,
        suspended: false,
      },
    };
  }

  try {
    const user = await db.user.findUnique({ where: { id: auth.userId } });
    if (!user || user.suspended) return { error: "Unauthorized", status: 401 as const, user: null };

    if (permission && !hasPermission(user.role as Role, permission)) {
      return { error: "Forbidden", status: 403 as const, user: null };
    }

    return { error: null, status: 200 as const, user: withMongoId(omitPassword(user)) };
  } catch {
    return { error: "Database unavailable", status: 503 as const, user: null };
  }
}

export async function logActivity(
  userId: string,
  action: string,
  entity?: string,
  entityId?: string,
  details?: Record<string, unknown>,
  req?: Request
) {
  try {
    await db.activityLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        details: details ? details : undefined,
        ip: (req?.headers["x-forwarded-for"] as string) || (req?.headers["x-real-ip"] as string),
        userAgent: req?.headers["user-agent"],
      },
    });
  } catch {
    // non-blocking
  }
}

export function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export { ACCESS_TOKEN_NAME };

