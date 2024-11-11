import { useLocale } from "next-intl";

import { defaultLang, langs, LangType } from "@/i18n/routing";

export function useValidLang(): LangType {
  const lang = useLocale();
  const validLang = Array.isArray(lang) ? lang[0] : lang;

  return langs.includes(validLang as LangType) ? validLang : defaultLang;
}
