"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import links from "@/utils/routes";

import { montserrat } from "../fonts";
import NavLink from "../NavLink/NavLink";

import css from "./FooterInfoList.module.css";

export default function FooterInfoList() {
  const translate = useTranslations("Footer");
  const { lang } = useParams();

  const { Footer } = links;

  return (
    <ul className={css.infoList}>
      {Footer.information.map(({ link, textForTranslate }, index) => {
        return (
          <li key={index}>
            <NavLink
              href={`/${lang}${link}`}
              styles={`${montserrat.className} ${css.navLink}`}
            >
              {translate(textForTranslate)}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
