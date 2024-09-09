import { FiArrowUpRight } from "react-icons/fi";

import { Link } from "@/i18n/routing";

import css from "./CustomButton.module.css";

type PropsType = {
  link: string;
  text: string;
};

export default function CustomButton({ link, text }: PropsType) {
  return (
    <Link href={link} className={css.button}>
      {text}
      <FiArrowUpRight size="25px" />
    </Link>
  );
}
