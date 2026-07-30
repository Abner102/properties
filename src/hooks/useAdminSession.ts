import { useEffect, useState } from "react";

type SessionStatus = "loading" | "authed" | "guest";

const SESSION_ENDPOINTS = ["/api/auth/session", "/api/auth/me", "/api/auth/logout"];

async function fetchSessionUser() {
  for (const endpoint of SESSION_ENDPOINTS) {
    try {
      const res = await fetch(endpoint, { credentials: "include" });
      if (!res.ok) continue;
      const data = await res.json();
      if (data?.user) return data.user;
      if (data?.user === null) return null;
    } catch {
      // try next endpoint
    }
  }
  return null;
}

export function useAdminSession() {
  const [status, setStatus] = useState<SessionStatus>("loading");

  useEffect(() => {
    let active = true;

    fetchSessionUser()
      .then((user) => {
        if (active) setStatus(user ? "authed" : "guest");
      })
      .catch(() => {
        if (active) setStatus("guest");
      });

    return () => {
      active = false;
    };
  }, []);

  return status;
}

export async function refreshAdminSession() {
  const user = await fetchSessionUser();
  return !!user;
}
