import Image from "next/image";
import { useTranslations } from "next-intl";

import Container from "../Container/Container";
import Section from "../Section/Section";
import Title from "../Title/Title";
import VacancyList from "../VacancyList/VacancyList";

import css from "./JoinUs.module.css";

export default function JoinUs() {
  const translate = useTranslations("JoinUs");
  return (
    <Section className={css.section}>
      <Container>
        <div className={css.container}>
          <div className={css.wrap}>
            <Title className={css.title}>{translate("title")}</Title>
            <p className={css.description}>{translate("description")}</p>
          </div>
          <Image
            src={"https://i.ibb.co/vmrhg4K/the-join-us.jpg"}
            height={512}
            width={420}
            alt="The join team"
          />
          <p className={css.descriptionMob}>{translate("description")}</p>
        </div>
        <VacancyList />
      </Container>
    </Section>
  );
}
