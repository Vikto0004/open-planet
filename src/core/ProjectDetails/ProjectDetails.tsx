import Image from "next/image";
import { createTranslator } from "next-intl";

import {
  formatDate,
  isBudgetList,
  isImageList,
  isParagraphList,
  isRenderable,
} from "@/utils/helper";

import { support } from "@/utils/routes";

import Container from "../Container/Container";
import CustomButton from "../CustomButton/CustomButton";
import ProjectDetailsBudgetList from "../ProjectDetailsBudgetList/ProjectDetailsBudget";
import ProjectDetailsDate from "../ProjectDetailsDate/ProjectDetailsDate";
import ProjectDetailsImagesList from "../ProjectDetailsImagesList/ProjectDetailsImagesList";
import ProjectDetailsParagraphList from "../ProjectDetailsParagraphList/ProjectDetailsParagraphList";
import ProjectDetailsSubsection from "../ProjectDetailsSubsection/ProjectDetailsSubsection";
import Section from "../Section/Section";
import Title from "../Title/Title";

import css from "./ProjectDetails.module.css";

import { getProjectById } from "@/query/api/projects";
import { langs, LangType } from "@/i18n/routing";
import ProjectDetailsSaveTitle from "../ProjectDetailsSaveTitle/ProjectDetailsSaveTitle";

type PropsType = {
  projectId: string;
  lang: LangType;
};

export default async function ProjectDetails({ projectId, lang }: PropsType) {
  const translator = await createTranslator({
    locale: lang,
    messages: (await import(`@/../messages/${lang}.json`)).default,
  });

  const data = await getProjectById(projectId);

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
            {translator("AboutProject.button")}
          </CustomButton>
          <ProjectDetailsSaveTitle titles={titles} />
        </Container>
      </Section>
    )
  );
}
