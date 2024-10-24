"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import links from "@/utils/routes";

import { montserrat } from "../fonts";
import NavLink from "../NavLink/NavLink";

import css from "./HeaderNavList.module.css";

type PropsType = {
  setIsOpenMenu?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HeaderNavList({ setIsOpenMenu }: PropsType) {
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
              setIsOpenMenu={setIsOpenMenu}
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
