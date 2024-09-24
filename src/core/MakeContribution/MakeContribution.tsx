"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Container from "../Container/Container";
import MethodsList from "../MethodsList/MethodsList";
import Section from "../Section/Section";
import Title from "../Title/Title";
import Donate from "../Donate/Donate";
import Swift from "../Swift/Swift";
import Mono from "../Mono/Mono";

import makeContribution from "@/db-local/make_contribution.json";
import isValidLang from "@/utils/isValidLang";
import { montserrat } from "../fonts";
import css from "./MakeContribution.module.css";
import { useTranslations } from "next-intl";

export default function MakeContribution() {
  const [donate, setDonate] = useState(true);
  const [swift, setSwift] = useState(false);
  const [mono, setMono] = useState(false);

  const [titleHeader, setTitleHeader] = useState("");
  const [isActive, setIsActive] = useState("donate");

  const { lang } = useParams();
  const translate = useTranslations("MakeContribution");

  useEffect(() => {
    const [resultObj] = makeContribution.filter(
      (obj) => obj[isValidLang(lang)]?.method === isActive,
    );

    const details = resultObj[isValidLang(lang)]?.details;
    if (typeof details === "string") setTitleHeader(details);
  }, [lang, isActive]);

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
    <Section style={css.section}>
      <Container>
        <Title text={translate("title")} style={css.title} />
        <div className={css.container}>
          <div>
            <h3 className={`${montserrat.className} ${css.titleHeader}`}>
              {translate("titleHeader")}
            </h3>
            <MethodsList
              lang={isValidLang(lang)}
              changeContribution={changeContribution}
              isActive={isActive}
            />
          </div>
          <div>
            <h3 className={`${montserrat.className} ${css.titleHeader}`}>
              {titleHeader}
            </h3>
            {donate && <Donate lang={isValidLang(lang)} />}
            {swift && <Swift />}
            {lang === "uk" && mono && <Mono />}
          </div>
        </div>
      </Container>
    </Section>
  );
}
