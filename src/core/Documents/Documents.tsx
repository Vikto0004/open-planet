import { useTranslations } from "next-intl";

import documents from "../../db-local/documents.json";
import Container from "../Container/Container";
import DocRepList from "../DocRepList/DocRepList";
import Section from "../Section/Section";
import Title from "../Title/Title";

import styles from "./Documents.module.css";

export default function Documents() {
  const translate = useTranslations("Documents");

  return (
    <>
      <Section className={styles.section}>
        <Container>
          <Title className={styles.title}>{translate("documents")}</Title>
          <DocRepList data={documents} />
        </Container>
      </Section>
    </>
  );
}
