import clsx from "clsx";
import { useTranslations } from "next-intl";

import links from "@/utils/routes";

import { montserrat } from "../fonts";
import HeaderAccordion from "../HeaderAccordion/HeaderAccordion";
import HeaderNavList from "../HeaderNavList/HeaderNavList";
import HeaderPopoverList from "../HeaderPopoverList/HeaderPopoverList";
import NavLink from "../NavLink/NavLink";

import css from "./HeaderNav.module.css";

type PropsType = {
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HeaderNav({ setIsOpenMenu }: PropsType) {
  const translate = useTranslations("Header");
  const { Header } = links;

  return (
    <>
      <div className={css.navWrap}>
        <NavLink
          href={Header.home}
          className={clsx(montserrat.className, css.link)}
          onClick={() => setIsOpenMenu && setIsOpenMenu(false)}
        >
          {translate("home")}
        </NavLink>
        <HeaderPopoverList type="cooperation" dataLinks={Header.cooperation} />
        <HeaderPopoverList type="programs" dataLinks={Header.programs} />
        <HeaderAccordion setIsOpenMenu={setIsOpenMenu} />
      </div>
      <HeaderNavList setIsOpenMenu={setIsOpenMenu} />
    </>
  );
}
