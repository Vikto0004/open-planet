"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { locales } from "@/constants/locales";

import { i18n } from "../../i18n-config";

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathName = usePathname();

  const redirectPathName = (locale: string) => {
    if (!pathName) return "/";
    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) =>
        !pathName.startsWith(`/${locale}`) && pathName !== `/${locale}`,
    );
    if (pathnameIsMissingLocale) {
      if (locale === i18n.defaultLocale) return pathName;
      return `/${locale}${pathName}`;
    } else {
      if (locale === i18n.defaultLocale) {
        const segments = pathName.split("/");
        const isHome = segments.length === 2;
        if (isHome) return "/";
        segments.splice(1, 1);
        return segments.join("/");
      }
    }

    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const toggle = () => {
    setIsOpen((old) => !old);
  };

  const currentLanguage = (locale: string) => {
    const title = locales.filter((i) => i.locale === locale);

    return title[0];
  };

  const currentLanguageButtonTitle = () => {
    const currentLocale =
      i18n.locales.find(
        (locale) =>
          pathName.startsWith(`/${locale}`) || pathName === `/${locale}`,
      ) || i18n.defaultLocale;

    return currentLanguage(currentLocale);
  };

  const transClass = isOpen ? "flex" : "hidden";

  return (
    <div className="flex space-x-4">
      <div className="relative">
        <button className="hover:text-blue-400" onClick={toggle}>
          {currentLanguageButtonTitle().title}
        </button>
        <div
          className={`absolute right-0 top-8 z-30 flex  flex-col rounded-md bg-zinc-400 py-4 ${transClass}`}
        >
          {i18n.locales.map((item) => {
            return (
              <Link
                key={item}
                className="px-4 py-1 hover:bg-zinc-300 hover:text-zinc-500"
                href={redirectPathName(item)}
                onClick={() => {
                  currentLanguage(item);
                  toggle();
                }}
              >
                <span>{currentLanguage(item).title}</span>

                {currentLanguage(item).icon}
              </Link>
            );
          })}
        </div>
      </div>
      {isOpen ? (
        <div
          className="fixed bottom-0 left-0 right-0 top-0 z-20 "
          onClick={toggle}
        ></div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LanguageSwitcher;
