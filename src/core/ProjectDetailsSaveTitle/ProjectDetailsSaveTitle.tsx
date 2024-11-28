"use client";

import { useEffect } from "react";

import { LangType } from "@/i18n/routing";

export default function ProjectDetailsSaveTitle({
  titles,
}: {
  titles: Record<LangType, string>;
}) {
  useEffect(() => {
    if (titles) {
      localStorage.setItem("projectTitle", JSON.stringify(titles));
    }
  }, [titles]);

  return <></>;
}
