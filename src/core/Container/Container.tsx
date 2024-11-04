import clsx from "clsx";

import css from "./Container.module.css";

type PropsType = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: PropsType) {
  return <div className={clsx(css.container, className)}>{children}</div>;
}
