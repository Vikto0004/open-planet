import { oldStandardTT } from "../fonts";
import css from "./Title.module.css";

type PropsType = {
  text: string;
  style?: string;
};

export default function Title({ text, style }: PropsType) {
  return (
    <h2 className={`${oldStandardTT.className} ${css.title} ${style}`}>
      {text}
    </h2>
  );
}
