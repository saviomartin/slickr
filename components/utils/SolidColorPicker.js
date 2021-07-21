import React, { useState } from "react";

// sketch picker from react color
import { SketchPicker } from "react-color";
import Btn from "./Btn"; // material btn

const SolidColorPicker = ({ data, setData }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false); // show/hide color picker
  const [color, setColor] = useState({
    color: data.background.color ? data.background.color : "#00ff00",
    opa: 1,
  });

  // handle change
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

  // styles to make the sketchbar pop over
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
    <div className="text-[#666] dark:text-[#bbb]">
      <h3 className="text-sm mb-2">Choose Background Color:</h3>
      <Btn>
        <div
          className="p-2 w-auto rounded-md border border-[#ddd] dark:border-[#555] flex items-center justify-start"
          onClick={() => setDisplayColorPicker(true)}
        >
          <div
            className="h-[28px] w-[28px] rounded-md"
            style={{ background: color.color }}
          ></div>
          <h3 className="text-sm uppercase font-semibold mx-2 dark:text-[#fafafa]">
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
