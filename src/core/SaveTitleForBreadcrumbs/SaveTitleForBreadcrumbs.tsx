"use client";

import { useEffect } from "react";

import { useValidLang } from "@/utils/hooks";

type PropsType = {
  title: string;
  titleKey: string;
};

export default function SaveTitleForBreadcrumbs({
  title,
  titleKey,
}: PropsType) {
  const lang = useValidLang();

  useEffect(() => {
    const getTitles = localStorage.getItem(titleKey);

    if (getTitles) {
      const titles = JSON.parse(getTitles);

      if (!titles[lang]) titles[lang] = title;
      localStorage.setItem(titleKey, JSON.stringify(titles));
    } else {
      const titles = {
        [lang]: title,
      };
      localStorage.setItem(titleKey, JSON.stringify(titles));
    }
  }, [title, titleKey, lang]);

  return <></>;
}
