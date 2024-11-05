import clsx from "clsx";
import { ReactNode } from "react";

import { Link, usePathname } from "@/i18n/routing";

import css from "./NavLink.module.css";

type PropsType = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export default function NavLink({
  href,
  className,
  onClick,
  children,
}: PropsType) {
  const pathName = usePathname();

  return (
    <Link
      onClick={onClick}
      href={href}
      className={clsx(className && className, pathName === href && css.active)}
    >
      {children}
    </Link>
  );
}
