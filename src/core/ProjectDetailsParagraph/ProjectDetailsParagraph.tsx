import clsx from "clsx";

import { montserrat } from "../fonts";

import css from "./ProjectDetailsParagraph.module.css";

type PropsType = {
  data: string;
};

export default function ProjectDetailsParagraph({ data }: PropsType) {
  return <p className={clsx(montserrat.className, css.text)}>{data}</p>;
}
