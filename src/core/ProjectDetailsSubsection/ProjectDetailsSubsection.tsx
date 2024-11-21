import clsx from "clsx";

import { oldStandardTT } from "../fonts";

import css from "./ProjectDetailsSubsection.module.css";

type PropsType = {
  children: React.ReactNode;
  className?: string;
};

export default function ProjectDetailsSubsection({
  children,
  className,
}: PropsType) {
  return (
    <h3 className={clsx(oldStandardTT.className, className, css.subtitle)}>
      {children}
    </h3>
  );
}
