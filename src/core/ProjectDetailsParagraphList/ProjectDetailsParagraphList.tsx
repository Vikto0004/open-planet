import ProjectDetailsParagraph from "../ProjectDetailsParagraph/ProjectDetailsParagraph";
import ProjectDetailsParagraphListItem from "../ProjectDetailsParagraphListItem/ProjectDetailsParagraphListItem";

import css from "./ProjectDetailsParagraphList.module.css";

type PropsType = {
  data: string[];
};

export default function ProjectDetailsParagraphList({ data }: PropsType) {
  return (
    <>
      {data.length === 1 ? (
        <ProjectDetailsParagraph data={data[0]} />
      ) : (
        <ul className={css.list}>
          {data.map((text, index) => (
            <ProjectDetailsParagraphListItem key={index} text={text} />
          ))}
        </ul>
      )}
    </>
  );
}
