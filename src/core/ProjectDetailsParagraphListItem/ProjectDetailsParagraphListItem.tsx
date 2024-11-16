import clsx from "clsx";

import { montserrat } from "../fonts";

import css from "./ProjectDetailsParagraphListItem.module.css";

type PropsType = {
  text: string;
};

export default function ProjectDetailsParagraphListItem({ text }: PropsType) {
  return <li className={clsx(montserrat.className, css.item)}>{text}</li>;
}
