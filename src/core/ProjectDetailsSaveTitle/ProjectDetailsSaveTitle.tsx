"use client";

import { LangType } from "@/i18n/routing";
import { useEffect } from "react";

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
