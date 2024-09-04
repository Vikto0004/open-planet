import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

import { defaultLocale } from "@/constants/locales";

import { i18n } from "../../i18n-config";

import { CustomMiddleware } from "./chain";

export function withI18nMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    const pathname = request.nextUrl.pathname;

    await middleware(request, event, response);

    if (
      pathname.startsWith(`/${defaultLocale}/`) ||
      pathname === `/${defaultLocale}`
    ) {
      return NextResponse.redirect(
        new URL(
          pathname.replace(
            `/${defaultLocale}`,
            pathname === `/${defaultLocale}` ? "/" : "",
          ),
          request.url,
        ),
      );
    }

    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) =>
        !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
    );

    if (pathnameIsMissingLocale) {
      return NextResponse.rewrite(
        new URL(
          `/${defaultLocale}${pathname}${request.nextUrl.search}`,
          request.nextUrl.href,
        ),
      );
    }

    return response;
  };
}
