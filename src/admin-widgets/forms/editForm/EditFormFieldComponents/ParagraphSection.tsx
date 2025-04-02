import React from "react";

import ParagraphInput from "@/admin-widgets/forms/paragraphInput/ParagraphInput";

const ParagraphSection = ({
  projectId,
  section,
  setValue,
  index,
  lang,
}: {
  projectId: string;
  section: any;
  setValue: any;
  index: number;
  lang: string;
}) => {
  console.log(
    `🧐 Контент у ParagraphSection перед передачею в ParagraphInput:`,
    section.content,
  );

  return (
    <div key={section.id}>
      <ParagraphInput
        projectId={projectId}
        section={{
          ...section,
          content: Array.isArray(section.content)
            ? section.content
            : [section.content],
        }}
        setValue={setValue}
        index={index}
        lang={lang}
      />
    </div>
  );
};

export default ParagraphSection;
