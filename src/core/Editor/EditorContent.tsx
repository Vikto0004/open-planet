import { BlockParagraphs } from "./blocks";
import css from "./Editor.module.css";
type PropsType = {
  blockParagraphs: BlockParagraphs;
};

export default function EditorContent({ blockParagraphs }: PropsType) {
  return (
    <ul contentEditable suppressContentEditableWarning className={css.list}>
      {blockParagraphs.map(({ id, paragraph }) => {
        return (
          <li className={css.item} key={id}>
            {paragraph.map(({ id, typePrint, text }) => {
              if (typePrint === "bold") {
                return (
                  <span key={id} className={css.textBold}>
                    {text}
                  </span>
                );
              } else if (typePrint === "usual") {
                return text;
              }
            })}
          </li>
        );
      })}
    </ul>
  );
}
