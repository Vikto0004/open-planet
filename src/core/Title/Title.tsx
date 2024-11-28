import clsx from "clsx";

import { oldStandardTT } from "../fonts";

import css from "./Title.module.css";

type PropsType = {
  children: React.ReactNode;
  className?: string;
};

export default function Title({ children, className }: PropsType) {
  return (
    <h2 className={clsx(oldStandardTT.className, css.title, className)}>
      {children}
    </h2>
  );
}
