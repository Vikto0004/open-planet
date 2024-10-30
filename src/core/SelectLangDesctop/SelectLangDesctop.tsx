import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { IoChevronDown } from "react-icons/io5";

import { languages } from "@/utils/constants";

import { montserrat } from "../fonts";

import css from "./SelectLangDesctop.module.css";

type TypeSelectedLang = {
  id: number;
  language: string;
};

type PropsType = {
  selectedLang: TypeSelectedLang;
  setSelectedLang: React.Dispatch<React.SetStateAction<TypeSelectedLang>>;
  selectChange: (local: string) => void;
};

export default function SelectLangDesctop({
  selectedLang,
  setSelectedLang,
  selectChange,
}: PropsType) {
  return (
    <Listbox value={selectedLang} onChange={setSelectedLang}>
      {({ open }) => (
        <>
          {open && <div className={css.overlay}></div>}
          <ListboxButton className={`${montserrat.className} ${css.button}`}>
            {selectedLang.language}
            <IoChevronDown className={open ? css.listboxIconActive : ""} />
          </ListboxButton>
          <ListboxOptions className={css.listboxOptions} anchor="bottom end">
            {languages.map((languages) => (
              <ListboxOption
                key={languages.id}
                value={languages}
                className="data-[focus]:bg-blue-100"
              >
                <button
                  className={`${montserrat.className} ${css.link}`}
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
