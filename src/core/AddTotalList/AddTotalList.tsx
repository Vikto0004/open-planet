import clsx from "clsx";

import currency from "@/db-local/currency.json";
import { useValidLang } from "@/utils/hooks";

import { montserrat } from "../fonts";

import css from "./AddTotalList.module.css";

type PropsType = {
  selectedCurrency: string;
  addToTheTotal: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function AddTotalList({
  selectedCurrency,
  addToTheTotal,
}: PropsType) {
  const lang = useValidLang();

  return (
    <ul className={css.list}>
      {currency[lang].map(({ currency, values }) => {
        if (currency === selectedCurrency) {
          return values.map((value, index) => (
            <li key={index}>
              <button
                className={clsx(montserrat.className, css.button)}
                onClick={(e) => addToTheTotal(e)}
              >
                {value}
              </button>
            </li>
          ));
        }
      })}
    </ul>
  );
}
