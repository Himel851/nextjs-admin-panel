"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  checkCredentials,
  generateToken,
  TOKEN_COOKIE,
  tokenCookieOptions,
} from "@/lib/auth";

export type LoginState = { error?: string } | undefined;

export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!checkCredentials(username, password)) {
    return { error: "Invalid username or password." };
  }

  const token = generateToken();
  const store = await cookies();
  store.set(TOKEN_COOKIE, token, tokenCookieOptions());

  redirect("/dashboard?signedIn=1");
}

export async function logout() {
  const store = await cookies();
  store.delete(TOKEN_COOKIE);
  redirect("/login?signedOut=1");
}
