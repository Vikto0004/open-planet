import { GoDotFill } from "react-icons/go";

import makeContribution from "@/db-local/make_contribution.json";

import { montserrat } from "../fonts";

import css from "./MethodsList.module.css";

type PropsType = {
  lang: "en" | "ua";
  // eslint-disable-next-line no-unused-vars
  changeContribution: (method: string | undefined) => void;
  isActive: string;
};

export default function MethodsList({
  lang,
  changeContribution,
  isActive,
}: PropsType) {
  return (
    <ul className={css.list}>
      {makeContribution.map((obj) => {
        const method = obj[lang]?.method;
        const title = obj[lang]?.title;

        if (!obj[lang]) return;

        return (
          <li key={obj.id}>
            <button
              onClick={() => changeContribution(method)}
              className={`${css.button} ${isActive === method && css.isActive}  ${montserrat.className}`}
            >
              <GoDotFill className={css.icon} />
              {title}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
