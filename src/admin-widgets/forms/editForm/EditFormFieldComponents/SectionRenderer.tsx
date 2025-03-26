import React from "react";

import ImageListPlug from "../../imageListPlug/ImageListPlug";

import BudgetCardsSection from "./BudgetCardsSection";
import ParagraphSection from "./ParagraphSection";
import ParagraphTitleSection from "./ParagraphTitleSection";
import SubtitleSection from "./SubtitleSection";

const SectionRenderer = ({
  section,
  index,
  projectId,
  setValue,
  lang,
}: {
  section: any;
  index: number;
  projectId: string;
  setValue: any;
  lang: string;
}) => {
  console.log("🔍 Rendering section:", section);

  switch (section.sectionType) {
    case "title":
      return (
        <ParagraphTitleSection
          projectId={projectId}
          section={section}
          setValue={setValue}
          index={index}
          lang={lang}
        />
      );
    case "subtitle":
      return (
        <SubtitleSection
          projectId={projectId}
          section={section}
          setValue={setValue}
          index={index}
          lang={lang}
        />
      );
    case "paragraph":
      return (
        <ParagraphSection
          projectId={projectId}
          section={section}
          setValue={setValue}
          index={index}
          lang={lang}
        />
      );
    case "budgetCards":
      return (
        <BudgetCardsSection
          projectId={projectId}
          section={section}
          setValue={setValue}
          index={index}
          lang={lang}
        />
      );
    case "imageList":
      console.log("✅ Rendering imageList:", section);
      return (
        <ImageListPlug
          projectId={projectId}
          id={section.id}
          text={section.text || "No text provided"}
          deletable={section.deletable ?? true}
        />
      );
    default:
      console.warn("⚠️ Unknown sectionType:", section.sectionType);
      return null;
  }
};

export default SectionRenderer;
