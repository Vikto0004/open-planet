import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { useValidLang } from "@/utils/hooks";

import AddTotalList from "../AddTotalList/AddTotalList";
import ButtonsOnceMonthly from "../ButtonsOnceMonthly/ButtonsOnceMonthly";
import { montserrat } from "../fonts";
import SelectCurrency from "../SelectCurrency/SelectCurrency";

import css from "./Donate.module.css";

export default function Donate() {
  const lang = useValidLang();
  const [selectedCurrency, setSelectedCurrency] = useState<
    "uah" | "eur" | "usd"
  >(lang === "ua" ? "uah" : "eur");

  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [methodPayment, setMethodPayment] = useState<"once" | "monthly">(
    "once",
  );
  const translate = useTranslations("MakeContribution");

  const addToTheTotal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const buttonText = (e.target as HTMLButtonElement).innerText;
    const number = parseFloat(buttonText.replace(/[^0-9.-]/g, ""));

    if (!value) {
      setValue(number.toString());
      return;
    }
    const suma = number + Number(value);
    setValue(suma.toString());
    setError(false);
  };

  const selectMethodPayment = (e: React.MouseEvent<HTMLButtonElement>) => {
    const method = (e.target as HTMLButtonElement).id;
    if (method === "once" || method === "monthly") {
      setMethodPayment(method);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!Number(value)) {
      setError(true);
      return;
    }
    setError(false);
    console.log(`Submit: ${methodPayment} to support`);
  };

  return (
    <div className={css.container}>
      <div className={css.wrap}>
        <button
          id="once"
          onClick={selectMethodPayment}
          className={clsx(
            montserrat.className,
            css.button,
            methodPayment === "once" && css.isActive,
          )}
        >
          {translate("donate.once")}
        </button>
        <button
          id="monthly"
          onClick={selectMethodPayment}
          className={clsx(
            montserrat.className,
            css.button,
            methodPayment === "monthly" && css.isActive,
          )}
        >
          {translate("donate.monthly")}
        </button>
      </div>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.wrapInput}>
          <input
            type="number"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (Number(e.target.value)) setError(false);
            }}
            className={clsx(
              montserrat.className,
              css.input,
              error && css.error,
            )}
            placeholder="0"
          />
          <SelectCurrency
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            setValue={setValue}
          />
        </div>
        <AddTotalList
          selectedCurrency={selectedCurrency}
          addToTheTotal={addToTheTotal}
        />
        <ButtonsOnceMonthly methodPayment={methodPayment} />
      </form>
    </div>
  );
}
