import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import style from "./FAQListItems.module.css";

interface ItemType {
  id: number;
  title: string;
  info: string[];
}

interface Prop {
  item: ItemType;
}

const createLinks = (text: string) => {
  if (text.trim().length === 0) {
    return <br />;
  }

  const linkRegex = /\{\{link:"(.*?)",\s*"(.*?)"\}\}/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    parts.push(text.substring(lastIndex, match.index));
    parts.push(
      <a
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className={style.linkWord}
        key={match.index}
      >
        {match[1]}
      </a>,
    );

    lastIndex = linkRegex.lastIndex;
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
            expandIcon={<KeyboardArrowUpIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            {item.title}
          </AccordionSummary>
          <AccordionDetails>
            {item.info.map((line, index) => (
              <p key={index}>{createLinks(line)}</p>
            ))}
          </AccordionDetails>
        </Accordion>
      </li>
    </>
  );
};

export default FAQListItems;
