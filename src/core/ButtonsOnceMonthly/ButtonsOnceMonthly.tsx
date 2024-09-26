import { useTranslations } from "next-intl";
import { FiArrowUpRight } from "react-icons/fi";
import { IoInformationCircleOutline } from "react-icons/io5";

import { montserrat } from "../fonts";

import css from "./ButtonsOnceMonthly.module.css";

type PropsType = {
  methodPayment: "once" | "monthly";
};

export default function ButtonsOnceMonthly({ methodPayment }: PropsType) {
  const translate = useTranslations("MakeContribution");

  return (
    <>
      {methodPayment === "once" && (
        <button
          className={`${montserrat.className} ${css.button}`}
          type="submit"
        >
          {translate("donate.buttons.once")}
          <FiArrowUpRight size="25px" />
        </button>
      )}
      {methodPayment === "monthly" && (
        <>
          <button
            className={`${montserrat.className} ${css.button}`}
            type="submit"
          >
            {translate("donate.buttons.monthly")}
            <FiArrowUpRight size="25px" />
          </button>
          <div className={css.wrap}>
            <IoInformationCircleOutline size="32px" />
            <p className={`${montserrat.className}  ${css.text}`}>
              {translate("donate.description")}
              <a
                className={css.link}
                href="https://fondy.ua/ua/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fondy
              </a>
            </p>
          </div>
        </>
      )}
    </>
  );
}
