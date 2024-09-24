import { currency } from "@/utils/constants";

import { montserrat } from "../fonts";

import css from "./AddTotalList.module.css";

type PropsType = {
  selectedCurrency: "uah" | "eur" | "usd";
  addToTheTotal: () => void;
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
              className={`${montserrat.className} ${css.button}`}
              onClick={addToTheTotal}
            >
              {el}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
