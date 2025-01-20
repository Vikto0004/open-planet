"use client";

import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import directionsData from "@/db-local/directions-work.json";
import { useValidLang } from "@/utils/hooks";

import Container from "../Container/Container";
import { montserrat } from "../fonts";
import Section from "../Section/Section";
import Title from "../Title/Title";

import css from "./ProgramWork.module.css";

type ProgramType = {
  title: string;
  type: string;
  description: string[];
  image: string;
};

type PropsType = {
  programType: string;
};

export default function ProgramWork({ programType }: PropsType) {
  const translate = useTranslations("ErrorMessages");
  const lang = useValidLang();

  const [notFound, setNotFound] = useState<true | false>(true);
  const [programData, setProgramData] = useState<ProgramType | undefined>(
    () => {
      const result = directionsData.find(
        (obj) => obj[lang]?.type === programType,
      );
      if (result) return result[lang];
    },
  );

  useEffect(() => {
    const result = directionsData.find(
      (obj) => obj[lang]?.type === programType,
    );

    if (result) setProgramData(result[lang]);
    if (!result) setNotFound(false);
    else setNotFound(true);
  }, [lang, programType]);

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

  return notFound && programData ? (
    <Section className={css.section}>
      <Container className={css.container}>
        {isMobile && (
          <>
            <Title className={css.title}>{programData.title}</Title>
            <ul className={css.list}>
              {programData.description.map((text, index) => (
                <li
                  key={index}
                  className={clsx(montserrat.className, css.text)}
                >
                  {text}
                </li>
              ))}
            </ul>
          </>
        )}

        {!isMobile && (
          <>
            <div>
              <Title className={css.title}>{programData.title}</Title>
              <ul className={css.list}>
                {programData.description.map((text, index) => (
                  <li
                    key={index}
                    className={clsx(montserrat.className, css.text)}
                  >
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        <Image
          height={512}
          width={420}
          src={programData.image}
          alt={programData.title}
          className={css.image}
          priority={true}
        />
      </Container>
    </Section>
  ) : (
    <Section className={css.section}>
      <Container className={css.container}>
        <p>
          {translate("nothingWasFoundFor") +
            ` "${programType.replace(/-/g, " ")}"`}
        </p>
      </Container>
    </Section>
  );
}
