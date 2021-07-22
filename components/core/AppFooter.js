import React from "react";
import { FiGithub } from "react-icons/fi";
import Btn from "../utils/Btn";

const AppFooter = () => {
  return (
    <div className="w-full py-1 px-5 flex items-center justify-between absolute bottom-0 left-0">
      <h1 className="text-[16px] font-normal dark:text-[#fafafa]">
        Made By
        <a
          href="/"
          className="ml-1 font-bold text-gradient bg-app-graient-to-l border-b-2 border-[#ae64db] dark:border-[#52fdbc]"
        >
          Savio Martin
        </a>
      </h1>
      <Btn href="https://github.com/saviomartin/loficlub">
        <h1 className="text-[16px] font-normal dark:text-[#fafafa] flex items-center">
          <FiGithub className="text-xl" />
          <a
            href="/"
            className="ml-1 font-bold text-gradient bg-app-graient-to-l border-[#ae64db] dark:border-[#52fdbc] capitalize"
          >
            59 Stars
          </a>
        </h1>
      </Btn>
    </div>
  );
};

export default AppFooter;
