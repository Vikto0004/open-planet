import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";

import { Link } from "@/i18n/routing";

import { montserrat } from "../fonts";

import css from "./HeaderAccordionList.module.css";

type PropsType = {
  type: "cooperation" | "programs";
  dataLinks: {
    link: string;
    textForTranslate: string;
  }[];
  setIsOpenMenu?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HeaderAccordionList({
  type,
  dataLinks,
  setIsOpenMenu,
}: PropsType) {
  const translate = useTranslations("Header");
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {expanded && (
        <div
          onClick={() => setExpanded(false)}
          className={css.overlayAccordion}
        ></div>
      )}
      <Accordion expanded={expanded} className={css.accordion}>
        <AccordionSummary
          expandIcon={<KeyboardArrowDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          onClick={() => setExpanded(!expanded)}
          className={`${montserrat.className} ${css.accordionSummary}`}
        >
          {translate(`${type}.title`)}
        </AccordionSummary>
        <AccordionDetails className={css.accordionDetails}>
          <ul className={css.accordionList}>
            {dataLinks.map(({ link, textForTranslate }, index) => {
              return (
                <li key={index} className={css.accordionListItem}>
                  <GoDotFill size={8} />
                  <Link
                    href={link}
                    onClick={() => setIsOpenMenu && setIsOpenMenu(false)}
                    className={`${montserrat.className} ${css.accordionLink}`}
                  >
                    {translate(`${type}.${textForTranslate}`)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
