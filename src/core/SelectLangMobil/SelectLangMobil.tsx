import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AccordionDetails, AccordionSummary } from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";

import { languages } from "@/utils/constants";

import { montserrat } from "../fonts";

import css from "./SelectLangMobil.module.css";

type TypeSelectedLang = {
  id: number;
  language: string;
};

type PropsType = {
  selectedLang: TypeSelectedLang;
  setSelectedLang: React.Dispatch<React.SetStateAction<TypeSelectedLang>>;
  selectChange: (local: string) => void;
};

export default function SelectLangMobil({
  selectedLang,
  setSelectedLang,
  selectChange,
}: PropsType) {
  const handleChange = (object: TypeSelectedLang) => {
    setSelectedLang(object);
    selectChange(object.language);
  };

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
    <Accordion TransitionProps={{ timeout: 500 }}>
      <AccordionSummary
        expandIcon={<KeyboardArrowDownIcon className={css.icon} />}
        aria-controls="panel1-content"
        id="panel1-header"
        className={`${montserrat.className} ${css.accordionSummary}`}
      >
        {selectedLang.language}
      </AccordionSummary>
      <AccordionDetails className={css.accordionDetails}>
        <ul className={css.accordionList}>
          {languages.map((object) => {
            return (
              <li
                key={object.id}
                className={`${montserrat.className} ${css.accordionListItem}`}
                onClick={() => handleChange(object)}
              >
                {object.language}
              </li>
            );
          })}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
}
