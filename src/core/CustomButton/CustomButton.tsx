import { FiArrowUpRight } from "react-icons/fi";

import { Link } from "@/i18n/routing";

import { montserrat } from "../fonts";

import css from "./CustomButton.module.css";

type PropsType = {
  link: string;
  text: string;
  style?: string;
};

export default function CustomButton({ link, text, style }: PropsType) {
  return (
    <Link
      href={link}
      className={`${montserrat.className} ${css.button} ${style ? style : ""}`}
    >
      {text}
      <FiArrowUpRight size="25px" />
    </Link>
  );
}
