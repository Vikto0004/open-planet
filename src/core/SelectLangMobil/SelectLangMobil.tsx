import { AccordionDetails, AccordionSummary } from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import { IoIosArrowDown } from "react-icons/io";

import { langs, LangType } from "@/i18n/routing";
import { useValidLang } from "@/utils/hooks";

import { montserrat } from "../fonts";

import css from "./SelectLangMobil.module.css";

type PropsType = {
  selectChange: (lang: LangType) => void;
};

export default function SelectLangMobil({ selectChange }: PropsType) {
  const lang = useValidLang();

  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} {...props} />
  ))(() => ({
    border: `none`,
    overflow: "hidden",
    transition: "all 1s ease",
    margin: "0",
    background: "transparent",
    "&::before": {
      display: "none",
    },
  }));

  return (
    <Accordion TransitionProps={{ timeout: 500 }} className={css.accordion}>
      <AccordionSummary
        expandIcon={<IoIosArrowDown className={css.icon} />}
        aria-controls="panel1-content"
        id="panel1-header"
        className={clsx(montserrat.className, css.accordionSummary)}
      >
        {lang.toUpperCase()}
      </AccordionSummary>
      <AccordionDetails className={css.accordionDetails}>
        <ul className={css.accordionList}>
          {langs.map((lang, index) => {
            return (
              <li
                key={index}
                className={clsx(montserrat.className, css.accordionListItem)}
                onClick={() => selectChange(lang)}
              >
                {lang.toUpperCase()}
              </li>
            );
          })}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
}
