import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { FiChevronDown } from "react-icons/fi";

const TabWrapper = ({ children, name }) => {
  return (
    <div className="w-11/12 bg-gradient p-[1px] rounded-[4px]">
      <div className="w-full bg-[#fff] rounded-[4px]">
        <Accordion>
          <AccordionSummary
            expandIcon={<FiChevronDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h1 className="font-bold">{name}</h1>
          </AccordionSummary>
          <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default TabWrapper;
