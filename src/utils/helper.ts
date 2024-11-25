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

export function isImageList(content: unknown): content is string[] {
  return (
    Array.isArray(content) &&
    content.every((item) => typeof item === "string" && item !== null)
  );
}

export function isBudgetList(
  content: unknown,
): content is { title: string; amount: number }[] {
  return (
    Array.isArray(content) &&
    content.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof item.title === "string" &&
        typeof item.amount === "number",
    )
  );
}

export function formatDate(dateStr: string, lang: LangType): string {
  const langMap: Record<string, string> = {
    ua: "uk-UA",
    en: "en-GB",
  };

  const date = new Date(dateStr);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return date.toLocaleDateString(langMap[lang], options);
}
