import clsx from "clsx";
import { useTranslations } from "next-intl";

import { isImageList, isParagraphList, isRenderable } from "@/utils/helper";
import { useValidLang } from "@/utils/hooks";

import tenders from "../../db-local/tenders.json";
import Container from "../Container/Container";
import { montserrat } from "../fonts";
import ProjectDetailsImagesList from "../ProjectDetailsImagesList/ProjectDetailsImagesList";
import ProjectDetailsParagraphList from "../ProjectDetailsParagraphList/ProjectDetailsParagraphList";
import ProjectDetailsSubsection from "../ProjectDetailsSubsection/ProjectDetailsSubsection";
import Section from "../Section/Section";
import Title from "../Title/Title";

import styles from "./Tender.module.css";

export default function Tender() {
  const lang = useValidLang();
  const tender = tenders[0][lang];
  const info = tender.info;
  const translate = useTranslations("PublishInfo");
  return (
    <Section className={clsx(montserrat.className, styles.section)}>
      <Container>
        <div className={styles.title}>
          <Title className={styles.headSec}>{tender.cardTitle}</Title>
          <div className={styles.desc}>
            <p className={styles.par}>{tender.cardSubTitle}</p>
            <h3
              className={styles.headThird}
            >{`${translate("relevant")} ${tender.relevant}`}</h3>
          </div>
        </div>
        <div className={styles.info}>
          {info.map(({ sectionType, content }, index) => {
            switch (sectionType) {
              case "paragraph":
                return (
                  isParagraphList(content) && (
                    <div key={index} className={styles.normalizeWidth}>
                      <ProjectDetailsParagraphList data={content} />
                    </div>
                  )
                );
              case "title":
                return (
                  isRenderable(content) && <Title key={index}>{content}</Title>
                );
              case "imageList":
                return (
                  isImageList(content) && (
                    <ProjectDetailsImagesList key={index} data={content} />
                  )
                );
              case "subtitle":
                return (
                  isRenderable(content) && (
                    <ProjectDetailsSubsection key={index}>
                      {content}
                    </ProjectDetailsSubsection>
                  )
                );
              default:
                break;
            }
          })}
        </div>
      </Container>
    </Section>
  );
}
