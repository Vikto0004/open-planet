"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import links from "@/utils/routes";

import { montserrat } from "../fonts";
import HeaderNavList from "../HeaderNavList/HeaderNavList";
import NavLink from "../NavLink/NavLink";
import PopoverList from "../PopoverList/PopoverList";

import css from "./HeaderNav.module.css";

export default function HeaderNav() {
  const translate = useTranslations("Header");
  const { lang } = useParams();
  const { Header } = links;

  return (
    <>
      <div className={css.navWrap}>
        <NavLink
          href={`/${lang}${Header.home}`}
          styles={`${montserrat.className} ${css.link}`}
        >
          {translate("home")}
        </NavLink>
        <PopoverList />
      </div>
      <HeaderNavList />
    </>
  );
}
