import React from "react";

import { defaultLang, langs, LangType } from "@/i18n/routing";

export function isValidLang(lang: string): LangType {
  const validLang = Array.isArray(lang) ? lang[0] : lang;
  return langs.includes(validLang as LangType) ? validLang : defaultLang;
}

export function isRenderable(content: unknown) {
  return (
    typeof content === "string" ||
    typeof content === "number" ||
    typeof content === "boolean" ||
    React.isValidElement(content)
  );
}

export function isParagraphList(content: unknown): content is string[] {
  return (
    Array.isArray(content) && content.every((item) => typeof item === "string")
  );
}

export function isMainImg(content: unknown) {
  return typeof content === "string";
}

export function isImageList(
  content: unknown,
): content is { id: string; url: string }[] {
  return (
    Array.isArray(content) &&
    content.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.url === "string",
    )
  );
}

export function isBudgetList(
  content: unknown,
): content is { id: string; title: string; amount: string }[] {
  return (
    Array.isArray(content) &&
    content.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.title === "string" &&
        typeof item.amount === "string",
    )
  );
}

export function formatDate(dateStr: string, lang: LangType): string {
  const date = new Date(dateStr);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  if (lang === "en") return date.toLocaleDateString("en-GB", options);
  return date.toLocaleDateString(lang, options);
}
