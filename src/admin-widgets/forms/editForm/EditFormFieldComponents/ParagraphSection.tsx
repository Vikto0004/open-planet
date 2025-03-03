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
  // 🔍 Лог для перевірки, що `content` має правильний формат перед передачею
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
            : [section.content], // ✅ Гарантуємо масив
        }}
        setValue={setValue}
        index={index}
        lang={lang}
      />
    </div>
  );
};

export default ParagraphSection;
