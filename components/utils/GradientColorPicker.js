import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import Btn from "./Btn";
import CircularSlider from "@fseehawer/react-circular-slider";

const GradientColorPicker = ({ data, setData }) => {
  const [displayColorPickers, setDisplayColorPickers] = useState({
    colorPicker1: false,
    colorPicker2: false,
  });
  const [colors, setColors] = useState({
    color1: data.background.color1 ? data.background.color1 : "#BA0352",
    color2: data.background.color2 ? data.background.color2 : "#5E00F6",
  });
  const [direction, setDirection] = useState(0);

  const handleColorChange = (color, colorNo) => {
    if (colorNo === "color1") {
      setColors({
        ...colors,
        color1: color.hex,
      });
    } else {
      setColors({
        ...colors,
        color2: color.hex,
      });
    }
    setData({
      ...data,
      background: {
        type: "gradient",
        color1: colors.color1,
        color2: colors.color2,
        direction: direction,
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
    <div className="text-[#222]">
      <h3 className="text-sm mb-2">Choose Background Colors:</h3>
      <Btn>
        <div
          className="p-2 w-auto rounded-md border border-[#ddd] flex items-center justify-start"
          onClick={() =>
            setDisplayColorPickers({
              ...displayColorPickers,
              colorPicker1: true,
            })
          }
        >
          <div
            className="h-[28px] w-[28px] rounded-md"
            style={{ background: colors.color1 }}
          ></div>
          <h3 className="text-sm uppercase font-semibold mx-2">
            {colors.color1}
          </h3>
        </div>
      </Btn>
      {displayColorPickers.colorPicker1 && (
        <div style={popover}>
          <div
            style={cover}
            onClick={() =>
              setDisplayColorPickers({
                ...displayColorPickers,
                colorPicker1: false,
              })
            }
          />
          <SketchPicker
            color={colors.color1}
            onChange={(color) => handleColorChange(color, "color1")}
            onSwatchHover={(color, e) => {
              console.log("color", color);
            }}
          />
        </div>
      )}
      <Btn className="!ml-2">
        <div
          className="p-2 w-auto rounded-md border border-[#ddd] flex items-center justify-start"
          onClick={() =>
            setDisplayColorPickers({
              ...displayColorPickers,
              colorPicker2: true,
            })
          }
        >
          <div
            className="h-[28px] w-[28px] rounded-md"
            style={{ background: colors.color2 }}
          ></div>
          <h3 className="text-sm uppercase font-semibold mx-2">
            {colors.color2}
          </h3>
        </div>
      </Btn>
      {displayColorPickers.colorPicker2 && (
        <div style={popover}>
          <div
            style={cover}
            onClick={() =>
              setDisplayColorPickers({
                ...displayColorPickers,
                colorPicker2: false,
              })
            }
          />
          <SketchPicker
            color={colors.color2}
            onChange={(color) => handleColorChange(color, "color2")}
            onSwatchHover={(color, e) => {
              console.log("color", color);
            }}
          />
        </div>
      )}
      <h3 className="text-sm my-3">Direction:</h3>
      <CircularSlider
        width={90}
        valueFontSize="20px"
        labelFontSize="9px"
        verticalOffset="0em"
        onChange={(angle) => {
          setDirection(angle);
          setData({
            ...data,
            background: {
              type: "gradient",
              color1: colors.color1,
              color2: colors.color2,
              direction: direction,
            },
          });
        }}
      />
    </div>
  );
};

export default GradientColorPicker;
