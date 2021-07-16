import React, { useState } from "react";
import { LeftBar, Editor } from "..";

const Template1 = (props) => {
  const [data, setData] = useState({
    title: {
      fontSize: 72,
      fontFamily: "Poppins",
      color: "#000",
      fontWeight: 900,
      text: "My Awesome Post Title Goes Here",
    },
    tagline: {
      fontSize: 72,
      fontFamily: "Poppins",
      color: "#000",
      fontWeight: 900,
      text: "written by @saviomartin",
    },
    background: {
      type: "solid",
      color: "#F5F5F5",
    },
    icon: {
      name: "react",
      color: "#000",
      fontSize: 72,
    },
  });
  return (
    <div className="w-full h-[100vh] flex overflow-hidden">
      <LeftBar {...props} data={data} setData={setData} />
      <Editor {...props} data={data} setData={setData} />
    </div>
  );
};

export default Template1;
