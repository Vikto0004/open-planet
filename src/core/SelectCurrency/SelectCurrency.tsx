import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { IoMdCheckmark } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";

import { currencyEn, currencyua } from "@/utils/constants";
import { useValidLang } from "@/utils/hooks";

import { montserrat } from "../fonts";

import css from "./SelectCurrency.module.css";

type PropsType = {
  selectedCurrency: "uah" | "eur" | "usd";
  setSelectedCurrency: React.Dispatch<
    React.SetStateAction<"uah" | "eur" | "usd">
  >;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function SelectCurrency({
  selectedCurrency,
  setSelectedCurrency,
  setValue,
}: PropsType) {
  const lang = useValidLang();

  return (
    <Listbox value={selectedCurrency} onChange={setSelectedCurrency}>
      {({ open }) => (
        <>
          {open && <div className={css.overlay}></div>}
          <ListboxButton className={clsx(montserrat.className, css.button)}>
            {selectedCurrency}
            <IoChevronDown
              size="24px"
              className={open ? css.listboxIconActive : ""}
            />
          </ListboxButton>
          <ListboxOptions className={css.listboxOptions} anchor="bottom">
            {lang === "ua" &&
              currencyua.map(({ id, currency }) => (
                <ListboxOption key={id} value={currency}>
                  <button
                    className={clsx(
                      montserrat.className,
                      css.link,
                      currency === selectedCurrency && css.isActive,
                    )}
                    onClick={() => setValue("")}
                  >
                    {currency}
                    {currency === selectedCurrency && (
                      <IoMdCheckmark size="20px" />
                    )}
                  </button>
                </ListboxOption>
              ))}
            {lang === "en" &&
              currencyEn.map(({ id, currency }) => (
                <ListboxOption key={id} value={currency}>
                  <button
                    className={clsx(
                      montserrat.className,
                      css.link,
                      currency === selectedCurrency && css.isActive,
                    )}
                    onClick={() => setValue("")}
                  >
                    {currency}
                    {currency === selectedCurrency && (
                      <IoMdCheckmark size="20px" />
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
