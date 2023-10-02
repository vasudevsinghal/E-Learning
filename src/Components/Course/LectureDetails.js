import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

import { BsChevronRight } from "react-icons/bs";

import LectureList from "./LectureList";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<BsChevronRight sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function LectureDetails({ CourseDetails }) {
  const [expanded, setExpanded] = React.useState("2");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return Object.entries(CourseDetails.videos).map(([lectureNumber, videos]) => (
    <Accordion
      expanded={expanded === lectureNumber}
      onChange={handleChange(lectureNumber)}
    >
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography>{`Lecture ${lectureNumber}`}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <LectureList videos={videos} />
      </AccordionDetails>
    </Accordion>
  ));
}
