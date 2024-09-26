import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import style from "./FAQListItems.module.css";

interface ItemType {
  id: number;
  title: string;
  info: string[];
}

interface Prop {
  item: ItemType;
}
const textParser = (text: string) => {
  if (text.trim().length === 0) {
    return <br />;
  }

  const combinedRegex =
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

const FAQListItems = ({ item }: Prop) => {
  return (
    <>
      <li key={item.id} className={style.listItem}>
        <Accordion>
          <AccordionSummary
            expandIcon={<KeyboardArrowDownIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            {item.title}
          </AccordionSummary>
          <AccordionDetails>
            {item.info.map((line, index) => (
              <p key={index}>{textParser(line)}</p>
            ))}
          </AccordionDetails>
        </Accordion>
      </li>
    </>
  );
};

export default FAQListItems;
