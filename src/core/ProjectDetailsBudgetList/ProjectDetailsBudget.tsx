import clsx from "clsx";

import { montserrat, oldStandardTT } from "../fonts";

import css from "./ProjectDetailsBudgetList.module.css";

type PropsType = {
  data: { id: string; title: string; amount: string }[];
};

export default function ProjectDetailsBudgetList({ data }: PropsType) {
  return (
    <ul className={css.list}>
      {data.map(({ id, title, amount }) => {
        return (
          <li key={id} className={css.listItem}>
            <p className={clsx(oldStandardTT.className, css.listDiscr)}>
              {title}
            </p>
            <p className={clsx(montserrat.className, css.listTitle)}>
              {amount}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
