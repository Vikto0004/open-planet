import { useLocale } from "next-intl";

import directionsData from "@/db-local/directions-work.json";
import { defaultLang, langs, LangType } from "@/i18n/routing";

export function useValidLang(): LangType {
  const lang = useLocale();
  const validLang = Array.isArray(lang) ? lang[0] : lang;

  return langs.includes(validLang as LangType) ? validLang : defaultLang;
}

export function useSelectedWork(programType: string) {
  const lang = useValidLang();

  const data = directionsData.find((obj) => obj[lang].type === programType);
  return data ? data[lang].title : "";
}
