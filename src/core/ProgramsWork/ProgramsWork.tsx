"use client";

import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

import Container from "../Container/Container";
import { montserrat } from "../fonts";
import Section from "../Section/Section";
import Title from "../Title/Title";

import css from "./ProgramsWork.module.css";

export default function ProgramsWork() {
  const translate = useTranslations("ProgramWork");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Section className={css.section}>
      <Container className={css.container}>
        {!isMobile && (
          <div>
            <Title className={css.title}>{translate("title")}</Title>
            <p className={clsx(montserrat.className, css.text)}>
              {translate("description")}
            </p>
          </div>
        )}

        {isMobile && (
          <>
            <Title className={css.title}>{translate("title")}</Title>
            <p className={clsx(montserrat.className, css.text)}>
              {translate("description")}
            </p>
          </>
        )}

        <Image
          height={512}
          width={420}
          src="https://i.ibb.co/LRpmHGN/hands-holding-each-other-support.jpg"
          alt="OUR Programs"
          className={css.image}
        />
      </Container>
    </Section>
  );
}
