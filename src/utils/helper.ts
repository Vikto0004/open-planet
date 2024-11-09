import { defaultLang, langs, LangType } from "@/i18n/routing";

export function isValidLang(lang: string): LangType {
  const validLang = Array.isArray(lang) ? lang[0] : lang;
  return langs.includes(validLang as LangType) ? validLang : defaultLang;
}
