import clsx from "clsx";
import { useTranslations } from "next-intl";

import tenders from "../../db-local/tenders.json";
import Container from "../Container/Container";
import { montserrat } from "../fonts";
import Section from "../Section/Section";
import TendersList from "../TendersList/TendersList";
import Title from "../Title/Title";

import styles from "./DetailsOfTenders.module.css";

export default function DetailsOfTenders() {
  const translate = useTranslations("DetailsOfTenders");

  return (
    <>
      <Section className={clsx(montserrat.className, styles.section)}>
        <Container>
          <Title className={styles.title}>{translate("title")}</Title>
          <TendersList data={tenders} />
        </Container>
      </Section>
    </>
  );
}
