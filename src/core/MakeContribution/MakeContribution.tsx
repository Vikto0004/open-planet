"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import isValidLang from "@/utils/isValidLang";

import Container from "../Container/Container";
import Donate from "../Donate/Donate";
import { montserrat } from "../fonts";
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

  const [isActive, setIsActive] = useState("donate");
  const { lang } = useParams();

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
        <Title text={"Зробити внесок на рахунок фонду"} style={css.title} />
        <div className={css.container}>
          <div>
            <h3 className={`${montserrat.className} ${css.titleHeader}`}>
              Oберіть спосіб оплати
            </h3>
            <MethodsList
              lang={isValidLang(lang)}
              changeContribution={changeContribution}
              isActive={isActive}
            />
          </div>
          <div>
            <h3 className={`${montserrat.className} ${css.titleHeader}`}>
              Деталі платежу карткою
            </h3>
            {donate && <Donate />}
            {swift && <Swift />}
            {lang === "uk" && mono && <Mono />}
          </div>
        </div>
      </Container>
    </Section>
  );
}
