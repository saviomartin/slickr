import React from "react";

// material-ui
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

// icons
import { FiChevronDown } from "react-icons/fi";

const TabWrapper = ({ children, name }) => {
  return (
    <div className="w-11/12 bg-gradient p-[1px] rounded-[4px] my-[5px]">
      <div className="w-full bg-[#fff] dark:bg-[#182341] rounded-[4px] dark:text-[#fafafa]">
        <Accordion
          style={{
            background: "inherit",
          }}
        >
          <AccordionSummary
            expandIcon={<FiChevronDown className="dark:text-[#fafafa]" />}
            style={{
              borderBottom: "1px solid",
              background: "inherit",
            }}
            className="!border-[#ddd] dark:!border-[#fafafa50]"
          >
            <h1 className="font-semibold dark:text-[#fafafa]">{name}</h1>
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
