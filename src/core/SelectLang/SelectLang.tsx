"use client";

import { useLocale } from "next-intl";
import { useState } from "react";

import { usePathname, useRouter } from "@/i18n/routing";
import { languages } from "@/utils/constants";

import SelectLangDesctop from "../SelectLangDesctop/SelectLangDesctop";
import SelectLangMobil from "../SelectLangMobil/SelectLangMobil";

export default function SelectLang() {
  const lang = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [selectedLang, setSelectedLang] = useState(
    languages.filter(({ language }) => language.toLowerCase() === lang)[0],
  );

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
