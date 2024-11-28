import clsx from "clsx";
import { FiArrowUpRight } from "react-icons/fi";

import { Link } from "@/i18n/routing";

import { montserrat } from "../fonts";

import css from "./CustomButton.module.css";

type PropsType = {
  link: string;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export default function CustomButton({
  link,
  children,
  className,
  onClick,
}: PropsType) {
  return (
    <Link
      href={link}
      onClick={onClick}
      className={clsx(montserrat.className, css.button, className)}
    >
      {children}
      <FiArrowUpRight size="25px" className={css.icon} />
    </Link>
  );
}
