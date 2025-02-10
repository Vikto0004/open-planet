"use client";

import { useEffect } from "react";

import { LangType } from "@/i18n/routing";

type PropsType = {
  titles: Record<LangType, string>;
  titleKey: string;
};

export default function SaveTitleForBreadcrumbs({
  titles,
  titleKey,
}: PropsType) {
  console.log(titleKey);

  useEffect(() => {
    if (titles) {
      localStorage.setItem(titleKey, JSON.stringify(titles));
    }
  }, [titles, titleKey]);

  return <></>;
}
