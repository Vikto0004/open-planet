import React from "react";

import SubtitleInput from "@/admin-widgets/subtitleInput/SubtitleInput";

const SubtitleSection = ({
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
    <SubtitleInput
      projectId={projectId}
      section={section}
      setValue={setValue}
      index={index}
      lang={lang}
    />
  </div>
);

export default SubtitleSection;
