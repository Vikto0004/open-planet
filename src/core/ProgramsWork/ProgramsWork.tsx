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
          <Title className={css.title} text={translate("title")} />
          <p className={`${montserrat.className} ${css.text}`}>
            {translate("description")}
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
}
