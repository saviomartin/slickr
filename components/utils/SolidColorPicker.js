import React, { useState } from "react";
import { SketchPicker } from "react-color";
import Btn from "./Btn";

const SolidColorPicker = ({ data, setData }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState({
    color: data.background.color ? data.background.color : "#00ff00",
    opa: 1,
  });

  const handleColorChange = (color) => {
    setColor({
      color: color.hex,
      opa: color.rgb.a,
    });
    setData({
      ...data,
      background: {
        type: "solid",
        color: color.hex,
      },
    });
  };

  const popover = {
    position: "absolute",
    zIndex: "2",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };

  return (
    <div className="text-[#666]">
      <h3 className="text-sm mb-2">Choose Background Color:</h3>
      <Btn>
        <div
          className="p-2 w-auto rounded-md border border-[#ddd] flex items-center justify-start"
          onClick={() => setDisplayColorPicker(true)}
        >
          <div
            className="h-[28px] w-[28px] rounded-md"
            style={{ background: color.color }}
          ></div>
          <h3 className="text-sm uppercase font-semibold mx-2">
            {color.color}
          </h3>
        </div>
      </Btn>
      {displayColorPicker && (
        <div style={popover}>
          <div style={cover} onClick={() => setDisplayColorPicker(false)} />
          <SketchPicker
            color={color.color}
            onChange={handleColorChange}
            onSwatchHover={(color, e) => {
              console.log("color", color);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SolidColorPicker;
