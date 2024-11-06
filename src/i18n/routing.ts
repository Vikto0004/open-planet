import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const langs = ["en", "ua"] as const;
export const defaultLang = "en";
export type LangType = (typeof langs)[number];

export const routing = defineRouting({
  // A budgetCardList of all locales that are supported
  locales: langs,

  // Used when no locale matches
  defaultLocale: defaultLang,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);
