import clsx from "clsx";

import { inter } from "../fonts";

import css from "./PublicOfferParagraphList.module.css";

type PropsType = {
  data: string[];
};

export default function PublicOfferParagraphList({ data }: PropsType) {
  return data.length === 1 ? (
    <p className={clsx(inter.className, css.text)}>{data[0]}</p>
  ) : (
    <ul className={css.list}>
      {data.map((text, index) => (
        <li key={index}>
          <p className={clsx(inter.className, css.text)}>{text}</p>
        </li>
      ))}
    </ul>
  );
}
