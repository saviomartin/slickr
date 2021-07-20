import React, { useState } from "react";

// material-ui
import { TextField } from "@material-ui/core";
import { MenuItem, Select } from "@material-ui/core";
import { SketchPicker } from "react-color";

// components
import { Btn, TabWrapper } from "..";

const TextTab = ({ title, setTitle, name }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false); // show/hide color picker

  // properties
  const [color, setColor] = useState({
    color: title.color ? title.color : "#00ff00",
    opa: 1,
  });

  // all weights
  const weights = [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ];

  // all font families
  const families = [
    "Poppins",
    "Inter",
    "Roboto",
    "Open-Sans",
    "Montserrat",
    "Raleway",
    "Playfair-Display",
    "Fira-Sans",
  ];

  // handle color change
  const handleColorChange = (color) => {
    setColor({
      color: color.hex,
      opa: color.rgb.a,
    });
    setTitle({
      ...title,
      color: color.hex,
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

  // capitalize first letter
  const capitalize = ([first, ...rest]) =>
    `${first.toUpperCase()}${rest.join("")}`;

  return (
    <TabWrapper name={capitalize(name)}>
      <p className="text-xs text-[#666] mb-3">Enter an eye catchy {name}</p>
      <TextField
        label={capitalize(name)}
        variant="outlined"
        size="small"
        value={title.text}
        className="bg-white epilogue w-full"
        onChange={(e) => setTitle({ ...title, text: e.target.value })}
      />
      <p className="text-xs text-[#666] my-3">Font Size</p>
      <TextField
        label="Font Size"
        variant="outlined"
        size="small"
        value={title.fontSize}
        className="bg-white epilogue w-full"
        onChange={(e) => setTitle({ ...title, fontSize: e.target.value })}
      />
      <p className="text-xs text-[#666] my-3">Line Height</p>
      <TextField
        label="Line Height"
        variant="outlined"
        size="small"
        value={title.lineHeight}
        className="bg-white epilogue w-full"
        onChange={(e) => setTitle({ ...title, lineHeight: e.target.value })}
      />
      <p className="text-xs text-[#666] my-3">Font Family</p>
      <Select
        value={title.fontFamily}
        onChange={(e) => {
          setTitle({
            ...title,
            fontFamily: e.target.value,
          });
        }}
        className={`w-full ${title.fontFamily}`}
        variant="outlined"
        size="small"
      >
        {families.map((value, key) => (
          <MenuItem value={value} key={key}>
            <span className={value}>{value}</span>
          </MenuItem>
        ))}
      </Select>
      <p className="text-xs text-[#666] my-3">Font Weight</p>
      <Select
        value={title.fontWeight}
        onChange={(e) => {
          setTitle({
            ...title,
            fontWeight: e.target.value,
          });
        }}
        className="w-full epilogue"
        variant="outlined"
        size="small"
      >
        {weights.map((value, key) => (
          <MenuItem value={value} key={key} className="epilogue">
            {value}
          </MenuItem>
        ))}
      </Select>

      <p className="text-xs text-[#666] my-3">Color</p>
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
    </TabWrapper>
  );
};

export default TextTab;
