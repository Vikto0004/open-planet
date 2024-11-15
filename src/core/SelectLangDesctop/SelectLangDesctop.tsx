import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { IoChevronDown } from "react-icons/io5";

import { langs, LangType } from "@/i18n/routing";
import { useValidLang } from "@/utils/hooks";

import { montserrat } from "../fonts";

import css from "./SelectLangDesctop.module.css";

type PropsType = {
  selectChange: (lang: LangType) => void;
};

export default function SelectLangDesctop({ selectChange }: PropsType) {
  const lang = useValidLang();

  return (
    <Listbox value={lang}>
      {({ open }) => (
        <>
          {open && <div className={css.overlay}></div>}
          <ListboxButton className={clsx(montserrat.className, css.button)}>
            {lang.toUpperCase()}
            <IoChevronDown className={open ? css.listboxIconActive : ""} />
          </ListboxButton>
          <ListboxOptions className={css.listboxOptions} anchor="bottom end">
            {langs.map((lang, index) => (
              <ListboxOption key={index} value={langs}>
                <button
                  className={clsx(montserrat.className, css.link)}
                  onClick={() => selectChange(lang)}
                >
                  {lang.toUpperCase()}
                </button>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </>
      )}
    </Listbox>
  );
}
