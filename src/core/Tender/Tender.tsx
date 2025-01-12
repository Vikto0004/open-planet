import { useTranslations } from "next-intl";

import { useValidLang } from "@/utils/hooks";

import tenders from "../../db-local/tenders.json";
import Container from "../Container/Container";
import Section from "../Section/Section";
import Title from "../Title/Title";

import styles from "./Tender.module.css";

export default function Tender() {
  const lang = useValidLang();
  const info = tenders[0][lang].info;
  const translate = useTranslations("PublishInfo");

  return (
    <Section className={styles.section}>
      <Container>
        <div className={styles.title}>
          <Title className={styles.headSec}>{tenders[0][lang].cardTitle}</Title>
          <div className={styles.desc}>
            <p className={styles.par}>Тендери та конкурси</p>
            <h3
              className={styles.headThird}
            >{`${translate("relevant")} ${tenders[0][lang].relevant}`}</h3>
          </div>
        </div>
        <div className={styles.info}>
          <p>{info?.p1}</p>
          <p>{info?.p2}</p>
          <p>{info?.p3}</p>
          <p>{info?.p4}</p>
          <p>{info?.p5}</p>
          <p>{info?.p6}</p>
          <p>{info?.p7}</p>
          <p>{info?.p8}</p>
        </div>
      </Container>
    </Section>
  );
}
