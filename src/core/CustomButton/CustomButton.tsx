import { FiArrowUpRight } from "react-icons/fi";

import { Link } from "@/i18n/routing";

import { montserrat } from "../fonts";

import css from "./CustomButton.module.css";

type PropsType = {
  link: string;
  text: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export default function CustomButton({
  link,
  text,
  className,
  onClick,
}: PropsType) {
  return (
    <Link
      href={link}
      onClick={onClick}
      className={`${montserrat.className} ${css.button} ${className ? className : ""}`}
    >
      {text}
      <FiArrowUpRight size="25px" className={css.icon} />
    </Link>
  );
}
