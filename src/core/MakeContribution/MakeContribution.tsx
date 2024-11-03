"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useMediaQuery } from "react-responsive";

import makeContribution from "@/db-local/make_contribution.json";
import { isValidLang } from "@/utils/helper";

import AccordionWrapper from "../AccordionWrapper/AccordionWrapper";
import Container from "../Container/Container";
import Donate from "../Donate/Donate";
import { montserrat } from "../fonts";
import Loader from "../Loader/Loader";
import MethodsList from "../MethodsList/MethodsList";
import Mono from "../Mono/Mono";
import Section from "../Section/Section";
import Swift from "../Swift/Swift";
import Title from "../Title/Title";

import css from "./MakeContribution.module.css";

export default function MakeContribution() {
  const [donate, setDonate] = useState(true);
  const [swift, setSwift] = useState(false);
  const [mono, setMono] = useState(false);

  const [titleHeader, setTitleHeader] = useState("");
  const [isActive, setIsActive] = useState("donate");
  const [expanded, setExpanded] = useState<string | false>(false);
  const [isActiveAcc, setIsActiveAcc] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 1240px)" });
  const [isClient, setIsClient] = useState(false);

  const { lang } = useParams();
  const translate = useTranslations("MakeContribution");

  useEffect(() => {
    setIsClient(true);
    const [resultObj] = makeContribution.filter(
      (obj) => obj[isValidLang(lang)]?.method === isActive,
    );

    const details = resultObj[isValidLang(lang)]?.details;
    if (details?.mobile) isMobile && setTitleHeader(details.mobile);
    else if (details?.desctop) !isMobile && setTitleHeader(details.desctop);
  }, [lang, isActive, isMobile]);

  const changeContribution = (method: string | undefined): void => {
    if (!method) return;
    setIsActive(method);

    setDonate(false);
    setSwift(false);
    setMono(false);

    if (method === "donate") setDonate(true);
    else if (method === "swift") setSwift(true);
    else if (method === "mono") setMono(true);
  };

  return (
    <Section className={css.section}>
      <Container>
        <Title text={translate("title")} className={css.title} />
        <AccordionWrapper
          setExpanded={setExpanded}
          expanded={expanded}
          expandIcon={<IoIosArrowDown className={css.icon} />}
          className={`${css.accordion} ${isActiveAcc ? css.isActiveAcc : ""}`}
          setIsActive={setIsActiveAcc}
        >
          <p className={`${montserrat.className} ${css.accTitle}`}>
            {translate("titleHeader")}
          </p>
          <MethodsList
            lang={isValidLang(lang)}
            changeContribution={changeContribution}
            isActive={isActive}
          />
        </AccordionWrapper>
        <div className={css.container}>
          <div className={css.wrap}>
            <h3 className={`${montserrat.className} ${css.titleHeader}`}>
              {translate("titleHeader")}
            </h3>
            <MethodsList
              lang={isValidLang(lang)}
              changeContribution={changeContribution}
              isActive={isActive}
            />
          </div>
          <div className={css.methodWrap}>
            {isClient ? (
              <h3 className={`${montserrat.className} ${css.titleHeader}`}>
                {titleHeader}
              </h3>
            ) : (
              <Loader />
            )}
            {donate && <Donate lang={isValidLang(lang)} />}
            {swift && <Swift />}
            {lang === "ua" && mono && <Mono />}
          </div>
        </div>
      </Container>
    </Section>
  );
}
