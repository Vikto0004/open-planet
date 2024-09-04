import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

import { getDatafromToken } from "@/helpers/getDataFromToken";

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

    if (isCurrentUrl) {
      const data = getDatafromToken(request);
      console.log(data);

      // if (!token) {
      //   return NextResponse.redirect(new URL("/api/auth/signin", request.url));
      // }
    }
    return middleware(request, event, response);
  };
}
