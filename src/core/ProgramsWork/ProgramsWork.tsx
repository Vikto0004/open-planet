import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";

import Container from "../Container/Container";
import { montserrat } from "../fonts";
import Section from "../Section/Section";
import Title from "../Title/Title";

import css from "./ProgramsWork.module.css";

export default function ProgramsWork() {
  const translate = useTranslations("ProgramWork");

  return (
    <Section className={css.section}>
      <Container className={css.container}>
        <div>
          <Title className={css.title}>{translate("title")}</Title>
          <p className={clsx(montserrat.className, css.text)}>
            {translate("description")}
          </p>
        </div>
        <Image
          height={512}
          width={420}
          priority={true}
          src="https://i.ibb.co/LRpmHGN/hands-holding-each-other-support.jpg"
          alt="OUR Programs"
          className={css.image}
        />
        <Title className={css.titleMobil}>{translate("title")}</Title>
      </Container>
    </Section>
  );
}
