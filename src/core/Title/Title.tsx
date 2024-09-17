import css from "./Title.module.css";
import { oldStandardTT } from "../fonts";

export default function Title({ text }: { text: string }) {
  return <h2 className={`${oldStandardTT.className} ${css.title}`}>{text}</h2>;
}
