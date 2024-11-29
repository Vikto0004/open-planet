"use client";

import { LangType, usePathname, useRouter } from "@/i18n/routing";

import SelectLangDesctop from "../SelectLangDesctop/SelectLangDesctop";
import SelectLangMobil from "../SelectLangMobil/SelectLangMobil";

type PropsType = {
  screen: "desktop" | "mobil";
};

export default function SelectLang({ screen }: PropsType) {
  const pathname = usePathname();
  const router = useRouter();

  const selectChange = (lang: LangType) => {
    const nextLocal = lang as LangType;
    const currentQuery = new URLSearchParams(window.location.search);
    const newPathname = `${pathname}?${currentQuery.toString()}`;

    router.replace(newPathname, {
      locale: nextLocal,
    });
  };

  return (
    <>
      {screen === "desktop" && (
        <SelectLangDesctop selectChange={selectChange} />
      )}
      {screen === "mobil" && <SelectLangMobil selectChange={selectChange} />}
    </>
  );
}
