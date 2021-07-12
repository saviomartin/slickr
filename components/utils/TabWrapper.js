import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { FiChevronDown } from "react-icons/fi";

const TabWrapper = ({ children, name }) => {
  return (
    <div className="w-11/12 bg-gradient p-[1px] rounded-[4px] my-[5px]">
      <div className="w-full bg-[#fff] rounded-[4px]">
        <Accordion>
          <AccordionSummary
            expandIcon={<FiChevronDown />}
            style={{
              borderBottom: "1px solid #ddd",
            }}
          >
            <h1 className="font-semibold">{name}</h1>
          </AccordionSummary>
          <AccordionDetails>
            <div className="w-full py-1 mt-2">{children}</div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default TabWrapper;
