const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  ua: () => import("@/dictionaries/ua.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) =>
  dictionaries[locale as keyof typeof dictionaries]();
