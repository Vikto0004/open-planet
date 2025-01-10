import { useTranslations } from "next-intl";

import Container from "../Container/Container";
import Section from "../Section/Section";
import Title from "../Title/Title";

import styles from "./DetailsOfTenders.module.css";

export default function Documents() {
  const translate = useTranslations("DetailsOfTenders");

  return (
    <>
      <Section className={styles.section}>
        <Container>
          <Title className={styles.title}>{translate("title")}</Title>
        </Container>
      </Section>
    </>
  );
}
