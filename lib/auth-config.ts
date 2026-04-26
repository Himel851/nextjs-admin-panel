export const ADMIN_SESSION_COOKIE = "admin_session";

const WEEK_SEC = 60 * 60 * 24 * 7;

export function getAuthSecret(): string {
  const s = process.env.AUTH_SECRET;
  if (s && s.length >= 16) return s;
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "AUTH_SECRET must be set (min 16 chars) in production"
    );
  }
  return "dev-only-insecure-change-me";
}

/** For proxy: never throws; production without secret yields null (sessions never verify). */
export function resolveAuthSecretForProxy(): string | null {
  const s = process.env.AUTH_SECRET;
  if (process.env.NODE_ENV === "production") {
    if (!s || s.length < 16) return null;
    return s;
  }
  if (s && s.length >= 16) return s;
  return "dev-only-insecure-change-me";
}

export function getAdminCredentials(): { username: string; password: string } {
  return {
    username: process.env.ADMIN_USERNAME ?? "admin",
    password: process.env.ADMIN_PASSWORD ?? "admin",
  };
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: WEEK_SEC,
  };
}
