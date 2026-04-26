"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_SESSION_COOKIE,
  getAdminCredentials,
  getAuthSecret,
  sessionCookieOptions,
} from "@/lib/auth-config";
import { createAdminSessionToken } from "@/lib/session-node";

export type LoginState = { error?: string } | undefined;

export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const { username: okUser, password: okPass } = getAdminCredentials();

  if (username !== okUser || password !== okPass) {
    return { error: "Invalid username or password." };
  }

  const secret = getAuthSecret();
  const token = createAdminSessionToken(secret);
  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, token, sessionCookieOptions());
  redirect("/?signedIn=1");
}

export async function logout() {
  const store = await cookies();
  store.delete(ADMIN_SESSION_COOKIE);
  redirect("/login?signedOut=1");
}
