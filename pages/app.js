import { useRouter } from "next/router";
import React, { useState } from "react";
import Rnd from "../components/core/Rnd";
import { LeftBar, Editor } from "../components";

const app = (props) => {
  const [data, setData] = useState({
    title: {
      fontSize: 72,
      fontFamily: "Raleway",
      color: "#222",
      fontWeight: 700,
      text: "My Awesome Post Title Goes Here",
      lineHeight: 80,
    },
    tagline: {
      fontSize: 35,
      fontFamily: "Playfair-Display",
      color: "#555",
      fontWeight: 300,
      text: "written by @saviomartin",
      lineHeight: 60,
    },
    background: {
      type: "solid",
      color: "#F5F5F5",
    },
    icon: {
      name: "react",
      color: "#4A90E2",
      fontSize: 125,
    },
  });

  const code = {
    value: (
      <>
        <Rnd width={650} x={37} y={166}>
          <h1
            className={`${data.title.fontFamily}`}
            style={{
              fontSize: `${data.title.fontSize}px`,
              fontFamily: `${data.title.fontFamily.replace(/-/g, " ")}`,
              fontWeight: data.title.fontWeight,
              color: data.title.color,
              lineHeight: `${data.title.lineHeight}px`,
            }}
          >
            {data.title.text}
          </h1>
        </Rnd>
        <Rnd width={650} x={46} y={305}>
          <h1
            className={`${data.tagline.fontFamily}`}
            style={{
              fontSize: `${data.tagline.fontSize}px`,
              fontFamily: `${data.tagline.fontFamily.replace(/-/g, " ")}`,
              fontWeight: data.tagline.fontWeight,
              color: data.tagline.color,
              lineHeight: `${data.tagline.lineHeight}px`,
            }}
          >
            {data.tagline.text}
          </h1>
        </Rnd>
        <Rnd width="auto" x={900} y={400}>
          <i
            class={`devicon-${data.icon.name}-plain`}
            className={`${data.icon.fontFamily}`}
            style={{
              fontSize: `${data.icon.fontSize}px`,
              color: data.icon.color,
            }}
          />
        </Rnd>
      </>
    ),
  };

  const [children, setChildren] = useState([]);
  const router = useRouter();

  const { template } = router.query;

  return (
    <div className="w-full h-[100vh] flex overflow-hidden">
      <LeftBar
        {...props}
        data={data}
        setData={setData}
        children={children}
        setChildren={setChildren}
      />
      <Editor
        {...props}
        data={data}
        setData={setData}
        children={children}
        code={code}
      />
    </div>
  );
};

export default app;
