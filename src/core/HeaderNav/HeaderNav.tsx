"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

import links from "@/utils/routes";

import AccordionWrapper from "../AccordionWrapper/AccordionWrapper";
import { montserrat } from "../fonts";
import HeaderAccordionList from "../HeaderAccordionList/HeaderAccordionList";
import HeaderNavList from "../HeaderNavList/HeaderNavList";
import HeaderPopoverList from "../HeaderPopoverList/HeaderPopoverList";
import NavLink from "../NavLink/NavLink";

import css from "./HeaderNav.module.css";
import { IoIosArrowDown } from "react-icons/io";

const DataAccordionList = [
  {
    type: "cooperation",
  },
  {
    type: "programs",
  },
];

type PropsType = {
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HeaderNav({ setIsOpenMenu }: PropsType) {
  const translate = useTranslations("Header");
  const { lang } = useParams();
  const [expanded, setExpanded] = useState<string | false>(false);

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
        <div className={css.navWrapAcc}>
          {DataAccordionList.map(({ type }, index) => {
            return (
              <AccordionWrapper
                key={index}
                setExpanded={setExpanded}
                expanded={expanded}
                expandIcon={<IoIosArrowDown className={css.icon} />}
                expandedStyle={css.isActive}
              >
                <p className={`${montserrat.className} ${css.title}`}>
                  {translate(`${type}.title`)}
                </p>
                <HeaderAccordionList
                  type={type}
                  setIsOpenMenu={setIsOpenMenu}
                />
              </AccordionWrapper>
            );
          })}
        </div>
      </div>
      <HeaderNavList setIsOpenMenu={setIsOpenMenu} />
    </>
  );
}
