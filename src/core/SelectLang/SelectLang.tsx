"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import { usePathname, useRouter } from "@/i18n/routing";
import { languages } from "@/utils/constants";

import SelectLangDesctop from "../SelectLangDesctop/SelectLangDesctop";
import SelectLangMobil from "../SelectLangMobil/SelectLangMobil";

export default function SelectLang() {
  const { lang } = useParams();
  const [selectedLang, setSelectedLang] = useState(() => {
    return languages.filter(
      ({ language }) => language.toLowerCase() === lang,
    )[0];
  });

  const pathname = usePathname();
  const router = useRouter();

  const selectChange = (local: string) => {
    const nextLocal = local.toLowerCase() as "en" | "ua";
    const currentQuery = new URLSearchParams(window.location.search);
    const newPathname = `${pathname}?${currentQuery.toString()}`;

    router.replace(newPathname, {
      locale: nextLocal,
    });
  };

  return (
    <>
      <SelectLangDesctop
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
        selectChange={selectChange}
      />
      <SelectLangMobil
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
        selectChange={selectChange}
      />
    </>
  );
}
