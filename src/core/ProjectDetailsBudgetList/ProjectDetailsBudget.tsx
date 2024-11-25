import clsx from "clsx";

import { montserrat, oldStandardTT } from "../fonts";

import css from "./ProjectDetailsBudgetList.module.css";

type PropsType = {
  data: { title: string; amount: number }[];
};

export default function ProjectDetailsBudgetList({ data }: PropsType) {
  return (
    <ul className={css.list}>
      {data.map(({ title, amount }, index) => {
        return (
          <li key={index} className={css.listItem}>
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
