import clsx from "clsx";
import { useTranslations } from "next-intl";

import { Tenders } from "@/query/types/tenders";
import { useValidLang } from "@/utils/hooks";

import Container from "../Container/Container";
import { montserrat } from "../fonts";
import Renderer from "../Renderer/Renderer";
import SaveTitleForBreadcrumbs from "../SaveTitleForBreadcrumbs/SaveTitleForBreadcrumbs";
import Section from "../Section/Section";
import Title from "../Title/Title";

import styles from "./Tender.module.css";

type PropsType = {
  tender: Tenders;
};

export default function Tender({ tender }: PropsType) {
  const lang = useValidLang();
  const translate = useTranslations("PublishInfo");

  return (
    <Section className={clsx(montserrat.className, styles.section)}>
      <Container>
        <div className={styles.title}>
          <Title className={styles.headSec}>{tender[lang].title}</Title>
          <div className={styles.desc}>
            <p className={styles.par}>{translate("tender")}</p>
            <h3 className={styles.headThird}>{tender[lang].relevant}</h3>
          </div>
        </div>
        <div className={styles.info}>
          <div>
            {tender[lang].description.map((node, index) => {
              return <Renderer key={index} node={node} />;
            })}
          </div>
        </div>
        <SaveTitleForBreadcrumbs
          titleKey="tenderTitle"
          title={tender[lang].title}
        />
      </Container>
    </Section>
  );
}
