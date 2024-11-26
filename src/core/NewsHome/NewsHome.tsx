import { useTranslations } from "next-intl";
import Container from "../Container/Container";
import Section from "../Section/Section";

import Title from "../Title/Title";

import css from "./NewsHome.module.css";
import NewsHomeList from "../NewsHomeList/NewsHomeList";

export default function NewsHome() {
  const translate = useTranslations("News");

  return (
    <Section className={css.section}>
      <Container>
        <Title className={css.title}>{translate("title")}</Title>
        <NewsHomeList />
      </Container>
    </Section>
  );
}
