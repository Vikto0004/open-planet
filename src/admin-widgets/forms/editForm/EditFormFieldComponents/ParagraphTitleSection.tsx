import React from "react";

import ParagraphTitleInput from "@/admin-widgets/forms/paragraphTitleInput/ParagraphTitleInput";

const ParagraphTitleSection = ({
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
    <ParagraphTitleInput
      projectId={projectId}
      section={section}
      setValue={setValue}
      index={index}
      lang={lang}
    />
  </div>
);

export default ParagraphTitleSection;
