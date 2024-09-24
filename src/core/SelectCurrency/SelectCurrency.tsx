import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { IoMdCheckmark } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";

import { currencyEn, currencyUk } from "@/utils/constants";

import { montserrat } from "../fonts";

import css from "./SelectCurrency.module.css";

type PropsType = {
  selectedCurrency: "uah" | "eur" | "usd";
  setSelectedCurrency: React.Dispatch<
    React.SetStateAction<"uah" | "eur" | "usd">
  >;
  lang: "uk" | "en";
};

export default function SelectCurrency({
  selectedCurrency,
  setSelectedCurrency,
  lang,
}: PropsType) {
  return (
    <Listbox value={selectedCurrency} onChange={setSelectedCurrency}>
      {({ open }) => (
        <>
          {open && <div className={css.overlay}></div>}
          <ListboxButton className={`${montserrat.className} ${css.button}`}>
            {selectedCurrency}
            <IoChevronDown className={open ? css.listboxIconActive : ""} />
          </ListboxButton>
          <ListboxOptions className={css.listboxOptions} anchor="bottom">
            {lang === "uk" &&
              currencyUk.map(({ id, currency }) => (
                <ListboxOption key={id} value={currency}>
                  <button
                    className={`${montserrat.className} ${css.link} ${currency === selectedCurrency && css.isActive}`}
                  >
                    {currency}
                    {currency === selectedCurrency && (
                      <IoMdCheckmark size={20} />
                    )}
                  </button>
                </ListboxOption>
              ))}
            {lang === "en" &&
              currencyEn.map(({ id, currency }) => (
                <ListboxOption key={id} value={currency}>
                  <button
                    className={`${montserrat.className} ${css.link} ${currency === selectedCurrency && css.isActive}`}
                  >
                    {currency}
                    {currency === selectedCurrency && (
                      <IoMdCheckmark size={20} />
                    )}
                  </button>
                </ListboxOption>
              ))}
          </ListboxOptions>
        </>
      )}
    </Listbox>
  );
}
