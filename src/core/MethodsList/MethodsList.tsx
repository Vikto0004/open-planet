import makeContribution from "@/db-local/make_contribution.json";
import css from "./MethodsList.module.css";
import { montserrat } from "../fonts";

type PropsType = {
  lang: "en" | "uk";
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

        return (
          <li key={obj.id}>
            <button
              onClick={() => changeContribution(method)}
              className={`${css.button} ${isActive === method && css.isActive}  ${montserrat.className}`}
            >
              {title}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
