"use client";

import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import directionsWorkEn from "@/db-local/directions_work-en.json";
import directionsWorkUk from "@/db-local/directions_work-uk.json";

import Container from "../Container/Container";
import { montserrat } from "../fonts";
import Section from "../Section/Section";
import Title from "../Title/Title";

import css from "./ProgramWork.module.css";

type ProgramType = {
  id: string;
  title: string;
  url: string;
  description: string[];
  image: string;
};

export default function ProgramWork() {
  const translate = useTranslations("ErrorMessages");
  const t = useTranslations("ProgramWork");

  const searchParams = useSearchParams();
  const program = searchParams.get("program");

  const { lang } = useParams();
  const [notFound, setNotFound] = useState<true | false>(true);
  const [programData, setProgramData] = useState<ProgramType | undefined>(
    undefined,
  );

  useEffect(() => {
    const searchDataObj = (array: ProgramType[]) => {
      const result = array.find((obj) => obj.url === program);
      setProgramData(result);

      if (!result) setNotFound(false);
      else setNotFound(true);
    };

    if (lang === "en") searchDataObj(directionsWorkEn);
    else if (lang === "uk") searchDataObj(directionsWorkUk);
  }, [lang, program]);

  if (!program)
    return (
      <Section style={css.section}>
        <Container style={css.container}>
          <div>
            <Title style={css.title} text={t("title")} />
            <p className={`${montserrat.className} ${css.text}`}>
              {t("description")}
            </p>
          </div>
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

  return notFound && programData ? (
    <Section style={css.section}>
      <Container style={css.container}>
        <div>
          <Title style={css.title} text={programData.title} />
          <ul className={css.list}>
            {programData.description.map((text, index) => (
              <li key={index} className={`${montserrat.className} ${css.text}`}>
                {text}
              </li>
            ))}
          </ul>
        </div>
        <Image
          height={512}
          width={420}
          src={programData.image}
          alt={programData.title}
          className={css.image}
        />
      </Container>
    </Section>
  ) : (
    <Section style={css.section}>
      <Container style={css.container}>
        <p>
          {translate("nothingWasFoundFor") + ` "${program.replace(/-/g, " ")}"`}
        </p>
      </Container>
    </Section>
  );
}
