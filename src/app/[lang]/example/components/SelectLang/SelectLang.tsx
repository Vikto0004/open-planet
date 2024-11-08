"use client";

import { langs, LangType } from "@/i18n/routing";
import { useRouter } from "next/navigation";

export default function SelectLang() {
  const router = useRouter();

  const changeLang = (lang: LangType) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/\/(en|ua)$/, `/${lang}`);

    router.push(newPath);
  };

  return (
    <ul>
      {langs.map((lang, index) => (
        <li key={index}>
          <button onClick={() => changeLang(lang)}>{lang}</button>
        </li>
      ))}
    </ul>
  );
}
