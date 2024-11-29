import clsx from "clsx";

import { inter } from "../fonts";

import css from "./PublicOfferParagraphList.module.css";

type PropsType = {
  data: string[];
};

export default function PublicOfferParagraphList({ data }: PropsType) {
  const renderTextWithBoldFont = (text: string) => {
    const parts = text.split(/(<boldFont>.*?<\/boldFont>)/g);

    return parts.map((part, index) => {
      if (part.startsWith("<boldFont>") && part.endsWith("</boldFont>")) {
        const boldText = part.replace(/<\/?boldFont>/g, "");
        return (
          <span key={index} className={css.boldFont}>
            {boldText}
          </span>
        );
      }
      return part;
    });
  };

  return data.length === 1 ? (
    <p className={clsx(inter.className, css.text)}>
      {renderTextWithBoldFont(data[0])}
    </p>
  ) : (
    <ul className={css.list}>
      {data.map((text, index) => (
        <li key={index}>
          <p className={clsx(inter.className, css.text)}>
            {renderTextWithBoldFont(text)}
          </p>
        </li>
      ))}
    </ul>
  );
}
