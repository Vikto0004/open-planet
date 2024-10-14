"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import links from "@/utils/routes";

import { montserrat } from "../fonts";
import HeaderAccordionList from "../HeaderAccordionList/HeaderAccordionList";
import HeaderNavList from "../HeaderNavList/HeaderNavList";
import HeaderPopoverList from "../HeaderPopoverList/HeaderPopoverList";
import NavLink from "../NavLink/NavLink";

import css from "./HeaderNav.module.css";

type PropsType = {
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HeaderNav({ setIsOpenMenu }: PropsType) {
  const translate = useTranslations("Header");
  const { lang } = useParams();
  const { Header } = links;

  return (
    <>
      <div className={css.navWrap}>
        <NavLink
          href={`/${lang}${Header.home}`}
          styles={`${montserrat.className} ${css.link}`}
          setIsOpenMenu={setIsOpenMenu}
        >
          {translate("home")}
        </NavLink>
        <HeaderPopoverList type="cooperation" dataLinks={Header.cooperation} />
        <HeaderPopoverList type="programs" dataLinks={Header.programs} />
        <HeaderAccordionList
          type="cooperation"
          dataLinks={Header.cooperation}
          setIsOpenMenu={setIsOpenMenu}
        />
        <HeaderAccordionList
          type="programs"
          dataLinks={Header.programs}
          setIsOpenMenu={setIsOpenMenu}
        />
      </div>
      <HeaderNavList setIsOpenMenu={setIsOpenMenu} />
    </>
  );
}
