import Image from "next/image";
import { useTranslations } from "next-intl";

import { langs, LangType } from "@/i18n/routing";
import { Project } from "@/query/types/projects";
import {
  formatDate,
  isBudgetList,
  isImageList,
  isParagraphList,
  isRenderable,
} from "@/utils/helper";
import { useValidLang } from "@/utils/hooks";
import { support } from "@/utils/routes";

import Container from "../Container/Container";
import CustomButton from "../CustomButton/CustomButton";
import ProjectDetailsBudgetList from "../ProjectDetailsBudgetList/ProjectDetailsBudget";
import ProjectDetailsDate from "../ProjectDetailsDate/ProjectDetailsDate";
import ProjectDetailsImagesList from "../ProjectDetailsImagesList/ProjectDetailsImagesList";
import ProjectDetailsParagraphList from "../ProjectDetailsParagraphList/ProjectDetailsParagraphList";
import ProjectDetailsSubsection from "../ProjectDetailsSubsection/ProjectDetailsSubsection";
import SaveTitleForBreadcrumbs from "../SaveTitleForBreadcrumbs/SaveTitleForBreadcrumbs";
import Section from "../Section/Section";
import Title from "../Title/Title";

import css from "./ProjectDetails.module.css";

type PropsType = {
  data: Project;
};

export default function ProjectDetails({ data }: PropsType) {
  const lang = useValidLang();
  const translate = useTranslations("AboutProject");

  const titles = langs.reduce<Record<LangType, string>>(
    (acc, lang) => {
      acc[lang] = data[lang].cardTitle;
      return acc;
    },
    {} as Record<LangType, string>,
  );

  return (
    data && (
      <Section className={css.section}>
        <Container>
          <div className={css.wrap}>
            <Title className={css.title}>{data[lang].cardTitle}</Title>
            <ProjectDetailsDate data={formatDate(data.createdAt, lang)} />
          </div>
          <Image
            width={800}
            height={564}
            src={data[lang].mainImg}
            alt={data[lang].cardTitle}
            className={css.mainImg}
          />
          {data[lang].sections.map(({ sectionType, content }, index) => {
            switch (sectionType) {
              case "paragraph":
                return (
                  isParagraphList(content) && (
                    <ProjectDetailsParagraphList key={index} data={content} />
                  )
                );
              case "title":
                return (
                  isRenderable(content) && (
                    <Title key={index} className={css.subtitle}>
                      {content}
                    </Title>
                  )
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
              case "budgetCards":
                return (
                  isBudgetList(content) && (
                    <ProjectDetailsBudgetList key={index} data={content} />
                  )
                );
              default:
                break;
            }
          })}
          <CustomButton className={css.button} link={support}>
            {translate("button")}
          </CustomButton>
          <SaveTitleForBreadcrumbs titles={titles} titleKey="projectTitle" />
        </Container>
      </Section>
    )
  );
}
