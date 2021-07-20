import React, { useEffect, useState } from "react";

// material-ui
import { Slider, TextField } from "@material-ui/core";
import Btn from "./Btn";
import { SketchPicker } from "react-color";

const BgImagePicker = ({ data, setData }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false); // show/hide color picker
  const [color, setColor] = useState({
    color: data.background.color ? data.background.color : "#000",
    opa: 1,
  });
  const [bgImageURL, setBgImageURL] = useState(
    data.background.src ? data.background.src : ""
  );
  const [opacity, setOpacity] = useState(
    data.background.opacity ? data.background.opacity : 60
  );

  const changeBg = (e) => {
    if (e.keyCode === 13) {
      if (bgImageURL.replace(/\s/g, "").length) {
        setData({
          ...data,
          background: {
            type: "image",
            src: bgImageURL,
            color: color.color,
            opacity: opacity / 100,
          },
        });
      }
    }
  };

  // handle change
  const handleColorChange = (color) => {
    setColor({
      color: color.hex,
      opa: color.rgb.a,
    });
    setData({
      ...data,
      background: {
        type: "image",
        src: bgImageURL,
        color: color.hex,
        opacity: opacity / 100,
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
    <div className="w-full">
      <h3 className="text-sm mb-2 text-[#666]">Background Image URL:</h3>
      <TextField
        label="Image URL"
        variant="outlined"
        size="small"
        value={bgImageURL}
        onKeyDown={(e) => changeBg(e)}
        className="bg-white epilogue w-full !mt-2"
        onChange={(e) => setBgImageURL(e.target.value)}
      />
      <h3 className="text-sm mt-4 mb-2 text-[#666]">
        Choose Overlay Background Color:
      </h3>
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
      <h3 className="mt-4 text-sm text-[#666]">Choose Opacity:</h3>
      <Slider
        value={opacity}
        min={0}
        max={100}
        onChange={(event, newValue) => {
          setOpacity(newValue);
          setData({
            ...data,
            background: {
              type: "image",
              src: bgImageURL,
              color: color.color,
              opacity: newValue / 100,
            },
          });
        }}
        aria-labelledby="input-slider"
      />
    </div>
  );
};

export default BgImagePicker;
