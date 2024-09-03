import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import { defaultLocale } from "@/constants/locales";

import { CustomMiddleware } from "./chain";

export function withAuthMiddleware(
  middleware: CustomMiddleware,
): CustomMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    console.log("auth");

    if (request.nextUrl.pathname === `${defaultLocale}/admin`) {
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET environment variable is not set");
      }

      // const token = await getToken({
      //   req: request,
      //   secret: process.env.JWT_SECRET,
      // });

      // if (!token) {
      //   return NextResponse.redirect(new URL("/api/auth/signin", request.url));
      // }
    }
    return middleware(request, event, response);
  };
}
