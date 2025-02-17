"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";

import links from "@/utils/routes";

import AccordionWrapper from "../AccordionWrapper/AccordionWrapper";
import Container from "../Container/Container";
import { montserrat } from "../fonts";
import NavLink from "../NavLink/NavLink";
import Section from "../Section/Section";

import css from "./ProgramsAccordion.module.css";

export default function ProgramsAccordion() {
  const translate = useTranslations("Header");
  const [expanded, setExpanded] = useState<string | false>(false);
  const { Header } = links;

  return (
    <Section className={css.section}>
      <Container>
        <AccordionWrapper
          setExpanded={setExpanded}
          expanded={expanded}
          className={clsx(css.accordion, expanded && css.isActiveAcc)}
          expandIcon={<IoIosArrowDown className={css.arrowDown} />}
        >
          <p
            className={clsx(
              css.title,
              montserrat.className,
              expanded && css.isActiveTitle,
            )}
          >
            {translate("programs.title")}
          </p>
          <ul className={css.list}>
            {Header.programs.map(({ link, textForTranslate }, index) => {
              return (
                <li className={css.item} key={index}>
                  <GoDotFill size={12} />
                  <NavLink href={link} classNameIsActive={css.linkIsActive}>
                    {translate(`programs.${textForTranslate}`)}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </AccordionWrapper>
      </Container>
    </Section>
  );
}
