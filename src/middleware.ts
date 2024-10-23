import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

const publicRoutes = ["/admin/login", "/admin/register"];

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const urlPath = req.nextUrl.pathname;
  const token = cookies().get("token")?.value;

  if (token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/user`, {
      method: "GET",
      headers: { Cookie: `token=${token}` },
    });
    const user = await res.json();

    if (
      user.error &&
      urlPath.startsWith("/admin") &&
      !publicRoutes.includes(urlPath)
    ) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url).origin + "/admin/login",
      );
    }

    if (!user.error && publicRoutes.includes(urlPath)) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  } else {
    if (
      !publicRoutes.includes(urlPath) &&
      urlPath.startsWith("/admin") &&
      urlPath !== "admin/login"
    ) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url).origin + "/admin/login",
      );
    }
  }

  if (!urlPath.startsWith("/admin")) {
    const response = intlMiddleware(req);
    return response;
  }
}

export const config = {
  matcher: ["/", "/(ua|en)/:path*", "/admin", "/admin/login", "/admin/:path*"],
};
