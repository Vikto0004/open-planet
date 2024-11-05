import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import * as React from "react";

import links from "@/utils/routes";

import { montserrat } from "../fonts";
import HeaderAccordionList from "../HeaderAccordionList/HeaderAccordionList";

import css from "./HeaderAccordion.module.css";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  width: "100%",
  border: `none`,
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon className={css.icon} />}
    {...props}
  />
))(() => ({
  "& .MuiAccordionSummary-content": {
    margin: "0",
  },
  "&": {
    minHeight: "0",
    padding: "0 ",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  marginTop: "24px",
  padding: "0",
  border: "none",
}));

type PropsType = {
  setIsOpenMenu?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HeaderAccordion({ setIsOpenMenu }: PropsType) {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const { Header } = links;

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        className={css.accordion}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          className={`${montserrat.className} ${css.summary} ${expanded === "panel1" && css.isActive}`}
        >
          Cooperation
        </AccordionSummary>
        <AccordionDetails>
          <HeaderAccordionList
            type="cooperation"
            dataLinks={Header.cooperation}
            setIsOpenMenu={setIsOpenMenu}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        className={css.accordion}
      >
        <AccordionSummary
          aria-controls="panel2d-content"
          id="panel2d-header"
          className={`${montserrat.className} ${css.summary} ${expanded === "panel2" && css.isActive}`}
        >
          Programs
        </AccordionSummary>
        <AccordionDetails>
          <HeaderAccordionList
            type="programs"
            dataLinks={Header.programs}
            setIsOpenMenu={setIsOpenMenu}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
