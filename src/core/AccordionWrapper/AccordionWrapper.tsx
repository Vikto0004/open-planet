"use client";

import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import useId from "@mui/material/utils/useId";
import * as React from "react";

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
  <MuiAccordionSummary {...props} />
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
  margin: "0",
  padding: "0",
  border: "none",
}));

type PropsType = {
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
  expanded: string | false;
  expandIcon?: React.ReactNode;
  expandedStyle?: string;
  children: React.ReactNode[];
};

/**
 * AccordionWrapper - a component that wraps an accordion and manages the open state.
 *
 * @param setExpanded - Function to change the expansion state, for example: const [expanded, setExpanded] = useState<string | false>(false)
 * @param expanded - A state indicating whether the accordion is expanded and which one.
 * @param children - The child elements of the component, minimum 2, where the first serves as the header of the accordion and all others as content.
 * @param expandIcon - An icon that changes its position relative to the accordion state.
 * @param expandedStyle - Style for the active accordion.
 */

export default function AccordionWrapper({
  setExpanded,
  expanded,
  expandIcon,
  expandedStyle,
  children,
}: PropsType) {
  const id = useId();

  if (React.Children.count(children) < 2) {
    throw new Error(
      "AccordionWrapper requires at least two child elements, where the first is a summary and all others are details",
    );
  }

  const [summary, ...details] = React.Children.toArray(children);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      <Accordion
        expanded={expanded === `panel${id}`}
        onChange={handleChange(`panel${id}`)}
      >
        <AccordionSummary
          aria-controls={`panel${id}-content`}
          id={`panel${id}d-header`}
          className={
            expanded === `panel${id}` && expandedStyle ? expandedStyle : ""
          }
          expandIcon={expandIcon}
        >
          {summary}
        </AccordionSummary>
        <AccordionDetails>{details}</AccordionDetails>
      </Accordion>
    </>
  );
}
