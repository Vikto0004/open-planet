import clsx from "clsx";

import css from "./Section.module.css";

type PropsType = {
  children: React.ReactNode;
  className?: string;
};

export default function Section({ children, className }: PropsType) {
  return <section className={clsx(css.section, className)}>{children}</section>;
}
