import clsx from "clsx";
import { GoDotFill } from "react-icons/go";

import makeContribution from "@/db-local/make-contribution.json";

import { montserrat } from "../fonts";

import css from "./MethodsList.module.css";
import { useValidLang } from "@/utils/hooks";

type PropsType = {
  // eslint-disable-next-line no-unused-vars
  changeContribution: (method: string | undefined) => void;
  isActive: string;
};

export default function MethodsList({
  changeContribution,
  isActive,
}: PropsType) {
  const lang = useValidLang();
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
              className={clsx(
                montserrat.className,
                css.button,
                isActive === method && css.isActive,
                method === "mono" && css.isDisabled,
              )}
              disabled={method === "mono"}
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
