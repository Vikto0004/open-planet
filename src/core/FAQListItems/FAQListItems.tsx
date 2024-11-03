import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import AccordionWrapper from "../AccordionWrapper/AccordionWrapper";

import style from "./FAQListItems.module.css";

interface ItemType {
  id: number;
  title: string;
  info: string[];
}

interface Prop {
  item: ItemType;
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
  expanded: string | false;
}
const textParser = (text: string) => {
  if (text.trim().length === 0) {
    return <br />;
  }

  const combinedRegex =
    // eslint-disable-next-line no-useless-escape
    /\{\{(link|boldText):\s*\"(.*?)\"(?:,\s*\"(.*?)\")?\}\}/g;
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = combinedRegex.exec(text)) !== null) {
    parts.push(text.substring(lastIndex, match.index));
    parts.push(
      match[1] === "link" ? (
        <a
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className={style.linkWord}
          key={match.index}
        >
          {match[2]}
        </a>
      ) : (
        <span key={match.index} className={style.boldText}>
          {match[2]}
        </span>
      ),
    );

    lastIndex = combinedRegex.lastIndex;
  }
  parts.push(text.substring(lastIndex));

  return parts;
};

const FAQListItems = ({ item, setExpanded, expanded }: Prop) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <li
        key={item.id}
        className={`${style.listItem} ${isActive ? style.listItemActive : ""}`}
      >
        <AccordionWrapper
          setExpanded={setExpanded}
          expanded={expanded}
          setIsActive={setIsActive}
          expandIcon={<IoIosArrowDown className={style.icon} />}
        >
          <p className={style.title}>{item.title}</p>
          <div className={style.wrap}>
            {item.info.map((line, index) => (
              <p className={style.prg} key={index}>
                {textParser(line)}
              </p>
            ))}
          </div>
        </AccordionWrapper>
      </li>
    </>
  );
};

export default FAQListItems;
