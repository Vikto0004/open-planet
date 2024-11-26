import clsx from "clsx";
import { ReactNode } from "react";

import { Link, usePathname } from "@/i18n/routing";

import css from "./NavLink.module.css";

type PropsType = {
  href: string;
  children: ReactNode;
  className?: string;
  classNameIsActive?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export default function NavLink({
  href,
  className,
  classNameIsActive,
  onClick,
  children,
}: PropsType) {
  const pathName = usePathname();

  return (
    <Link
      onClick={onClick}
      href={href}
      className={clsx(
        className && className,
        (pathName === href && classNameIsActive) ||
          (pathName === href && css.active),
      )}
    >
      {children}
    </Link>
  );
}
