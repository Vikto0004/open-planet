import { FiArrowUpRight } from "react-icons/fi";

import css from "./CustomButton.module.css";
import { Link } from "@/i18n/routing";

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
