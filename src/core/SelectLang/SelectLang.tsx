"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

import { usePathname, useRouter } from "@/i18n/routing";

import css from "./SelectLang.module.css";

const languages = [
  { id: 1, language: "UA" },
  { id: 2, language: "EN" },
];

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
    router.replace(pathname, { locale: nextLocal });
  };

  return (
    <Listbox value={selectedLang} onChange={setSelectedLang}>
      {({ open }) => (
        <>
          <ListboxButton className={css.button}>
            {selectedLang.language}
            <IoChevronDown className={open ? css.listboxIconActive : ""} />
          </ListboxButton>
          <ListboxOptions className={css.listboxOptions} anchor="bottom">
            {languages.map((languages) => (
              <ListboxOption
                key={languages.id}
                value={languages}
                className="data-[focus]:bg-blue-100"
              >
                <button
                  className={css.link}
                  onClick={() => selectChange(languages.language)}
                >
                  {languages.language}
                </button>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </>
      )}
    </Listbox>
  );
}
