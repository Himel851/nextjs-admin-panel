import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  resolveAuthSecretForProxy,
} from "@/lib/auth-config";
import { verifyAdminSessionToken } from "@/lib/session-edge";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/login" || pathname.startsWith("/login/");

  const secret = resolveAuthSecretForProxy();
  const raw = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  let valid = false;
  if (secret && raw) {
    valid = await verifyAdminSessionToken(raw, secret);
  }

  if (!valid && !isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (valid && isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
