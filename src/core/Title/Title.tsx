import { oldStandardTT } from "../fonts";

import css from "./Title.module.css";

type PropsType = {
  text: string;
  className?: string;
};

export default function Title({ text, className }: PropsType) {
  return (
    <h2
      className={`${oldStandardTT.className} ${css.title} ${className ? className : ""}`}
    >
      {text}
    </h2>
  );
}
