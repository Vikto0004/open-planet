"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import AccordionWrapper from "../AccordionWrapper/AccordionWrapper";
import { montserrat } from "../fonts";
import HeaderAccordionList from "../HeaderAccordionList/HeaderAccordionList";

import css from "./HeaderAccordion.module.css";

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

export default function HeaderAccordion({ setIsOpenMenu }: PropsType) {
  const translate = useTranslations("Header");
  const [expanded, setExpanded] = useState<string | false>(false);

  return (
    <div className={css.wrap}>
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
            <HeaderAccordionList type={type} setIsOpenMenu={setIsOpenMenu} />
          </AccordionWrapper>
        );
      })}
    </div>
  );
}
