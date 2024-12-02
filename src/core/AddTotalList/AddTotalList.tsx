import clsx from "clsx";

import { currency } from "@/utils/constants";

import { montserrat } from "../fonts";

import css from "./AddTotalList.module.css";

type PropsType = {
  selectedCurrency: "uah" | "eur" | "usd";
  addToTheTotal: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function AddTotalList({
  selectedCurrency,
  addToTheTotal,
}: PropsType) {
  return (
    <ul className={css.list}>
      {currency[selectedCurrency].map((el, index) => {
        return (
          <li key={index}>
            <button
              className={clsx(montserrat.className, css.button)}
              onClick={(e) => addToTheTotal(e)}
            >
              {el}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
