import Image from "next/image";
import { useTranslations } from "next-intl";

import projectDetails from "@/db-local/project-details.json";
import {
  formatDate,
  isBudgetList,
  isImageList,
  isMainImg,
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
import Section from "../Section/Section";
import Title from "../Title/Title";

import css from "./ProjectDetails.module.css";

export default function ProjectDetails() {
  const translate = useTranslations("AboutProject");
  const lang = useValidLang();

  return (
    <Section className={css.section}>
      <Container>
        {projectDetails[lang].map(({ type, content }, index) => {
          switch (type) {
            case "title":
              return (
                isRenderable(content) && (
                  <div key={index} className={css.wrap}>
                    <Title className={css.title}>{content}</Title>
                    <ProjectDetailsDate
                      data={formatDate(projectDetails.createdAt, lang)}
                    />
                  </div>
                )
              );
            case "mainImg":
              return (
                isMainImg(content) && (
                  <Image
                    key={index}
                    width={800}
                    height={564}
                    src={content}
                    alt="Реконструкція бомбосховища для Школи №25"
                    className={css.mainImg}
                  />
                )
              );
            case "paragraf":
              return (
                isParagraphList(content) && (
                  <ProjectDetailsParagraphList key={index} data={content} />
                )
              );
            case "subtitle":
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
            case "subsection":
              return (
                isRenderable(content) && (
                  <ProjectDetailsSubsection key={index}>
                    {content}
                  </ProjectDetailsSubsection>
                )
              );
            case "budgetList":
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
      </Container>
    </Section>
  );
}
