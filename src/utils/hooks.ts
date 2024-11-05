import { useLocale } from "next-intl";

export function useValidLang(): "ua" | "en" {
  const lang = useLocale();
  const validLang = Array.isArray(lang) ? lang[0] : lang;

  return validLang === "en" || validLang === "ua" ? validLang : "en";
}
