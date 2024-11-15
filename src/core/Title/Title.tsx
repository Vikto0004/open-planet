import clsx from "clsx";

import { oldStandardTT } from "../fonts";

import css from "./Title.module.css";

type PropsType = {
  className?: string;
  children: React.ReactNode;
};

export default function Title({ className, children }: PropsType) {
  return (
    <h2 className={clsx(oldStandardTT.className, css.title, className)}>
      {children}
    </h2>
  );
}
