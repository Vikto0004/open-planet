import { useTranslations } from "next-intl";

import reports from "../../db-local/reports.json";
import Container from "../Container/Container";
import DocRepList from "../DocRepList/DocRepList";
import Section from "../Section/Section";
import Title from "../Title/Title";

import styles from "./Reports.module.css";

export default function Reports() {
  const translate = useTranslations("Reports");

  return (
    <>
      <Section className={styles.section}>
        <Container>
          <Title className={styles.title}>{translate("reports")}</Title>
          <DocRepList data={reports} />
        </Container>
      </Section>
    </>
  );
}
