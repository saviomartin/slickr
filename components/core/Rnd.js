import React from "react";
import { Rnd } from "react-rnd";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
};

const Component = ({ children }) => (
  <Rnd
    style={style}
    default={{
      x: 0,
      y: 0,
      width: 320,
      height: 200,
    }}
  >
    {children}
  </Rnd>
);

export default Component;
