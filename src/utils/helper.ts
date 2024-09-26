export function isValidLang(lang: string | string[]) {
  const validLang = Array.isArray(lang) ? lang[0] : lang;
  if (validLang === "en" || validLang === "uk") {
    return validLang;
  } else {
    return "en";
  }
}
