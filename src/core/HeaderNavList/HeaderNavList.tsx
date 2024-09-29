"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import links from "@/utils/routes";

import { montserrat } from "../fonts";
import NavLink from "../NavLink/NavLink";

import css from "./HeaderNavList.module.css";

export default function HeaderNavList() {
  const translate = useTranslations("Header");
  const { lang } = useParams();

  const { Header } = links;

  return (
    <ul className={css.list}>
      {Header.anotherNav.map(({ link, textForTranslate }, index) => {
        return (
          <li key={index}>
            <NavLink
              href={`/${lang}${link}`}
              styles={`${montserrat.className} ${css.link}`}
            >
              {translate(textForTranslate)}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
