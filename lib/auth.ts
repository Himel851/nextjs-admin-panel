import { randomUUID } from "crypto";

export const TOKEN_COOKIE = "admin_token";

const WEEK_SEC = 60 * 60 * 24 * 7;

export function checkCredentials(username: string, password: string): boolean {
  const user = "admin";
  const pass = "admin";
  return username === user && password === pass;
}

export function generateToken(): string {
  return randomUUID();
}

export function tokenCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: WEEK_SEC,
  };
}
