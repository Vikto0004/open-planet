import { Section } from "../../[selectedLang]/page";
import css from "./Content.module.css";
import ContentItem from "../ContentItem/ContentItem";

type ContentProps = {
  data: Section[] | null;
  updateContentById: (currentId: string, newContent: string | string[]) => void;
};
export default function Content({ data, updateContentById }: ContentProps) {
  return (
    <ul className={css.list}>
      {data &&
        data.map(({ id, type, content }) => (
          <ContentItem
            key={id}
            id={id}
            type={type}
            content={content}
            updateContentById={updateContentById}
          />
        ))}
    </ul>
  );
}