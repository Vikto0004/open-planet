import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import css from "./NavLink.module.css";

type PropsType = {
  href: string;
  setIsOpenMenu?: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  [key: string]: unknown;
};

export default function NavLink({
  href,
  styles,
  setIsOpenMenu,
  children,
}: PropsType) {
  const pathName = usePathname();

  return (
    <Link
      onClick={() => setIsOpenMenu && setIsOpenMenu(false)}
      href={href}
      className={`${styles} ${pathName === href ? css.active : ""}`}
    >
      {children}
    </Link>
  );
}
