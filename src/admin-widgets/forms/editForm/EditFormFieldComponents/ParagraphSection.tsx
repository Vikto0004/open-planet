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
}) => (
  <div key={section.id}>
    <ParagraphInput
      projectId={projectId}
      section={section}
      setValue={setValue}
      index={index}
      lang={lang}
    />
  </div>
);

export default ParagraphSection;
