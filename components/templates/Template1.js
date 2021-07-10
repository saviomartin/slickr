import React from "react";
import { LeftBar, Editor } from "..";

const Template1 = (props) => {
  return (
    <div className="w-full h-[100vh] flex overflow-hidden">
      <LeftBar {...props} />
      <Editor {...props} />
    </div>
  );
};

export default Template1;
