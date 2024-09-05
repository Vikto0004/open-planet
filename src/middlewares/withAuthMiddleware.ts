import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";



import { CustomMiddleware } from "./chain";

export function withAuthMiddleware(
  middleware: CustomMiddleware,
): CustomMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {

    const pathname = request.nextUrl.pathname.split("/");
    const isCurrentUrl = pathname.reverse()[0] === "admin";

    const token = request.cookies.get("token")?.value || "";
    if (isCurrentUrl && !token) NextResponse.redirect(new URL("/login", request.url));

    return middleware(request, event, response);
  };
}
