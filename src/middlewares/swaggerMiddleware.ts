import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

import { CustomMiddleware } from "./chain";

export function swaggerMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    const { pathname } = request.nextUrl;
    console.log(pathname);

    if (pathname.startsWith("/doc")) {
      return NextResponse.next();
    }

    return middleware(request, event, response);
  };
}
