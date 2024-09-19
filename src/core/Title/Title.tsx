import css from "./Title.module.css";
import { oldStandardTT } from "../fonts";

type PropsType = {
  text: string;
  style?: string;
};

export default function Title({ text, style }: PropsType) {
  return (
    <h2
      className={`${oldStandardTT.className} ${css.title} ${style}`}
      data-type="text"
    >
      {text}
    </h2>
  );
}
