import { montserrat } from "../fonts";
import { currency } from "@/utils/constants";
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
