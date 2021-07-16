import { MenuItem, Select, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import Btn from "./Btn";

const IconsPicker = ({ data, setData }) => {
  const [icons, setIcons] = useState([]);
  const [icon, setIcon] = useState(data.icon.name ? data.icon.name : "react");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState({
    color: data.icon.color ? data.icon.color : "#00ff00",
    opa: 1,
  });

  const handleColorChange = (color) => {
    setColor({
      color: color.hex,
      opa: color.rgb.a,
    });
    setData({
      ...data,
      icon: {
        ...data.icon,
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

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/devicons/devicon/master/devicon.json"
    )
      .then((r) => r.json())
      .then((data) => {
        setIcons(data);
      });
  }, []);
  return (
    <div>
      <p className="text-xs text-[#666] mb-3">Choose your Icon:</p>
      <Select
        value={icon}
        onChange={(e) => {
          setIcon(e.target.value);
          setData({
            ...data,
            icon: {
              ...data.icon,
              name: e.target.value,
            },
          });
        }}
        className="w-full epilogue"
        variant="outlined"
        size="small"
      >
        {icons.map((icon, key) => (
          <MenuItem value={icon.name} key={key} className="epilogue">
            {icon.name}
          </MenuItem>
        ))}
      </Select>
      <p className="text-xs text-[#666] my-3">Icon Size</p>
      <TextField
        label="Font Size"
        variant="outlined"
        size="small"
        value={data.icon.fontSize}
        className="bg-white epilogue w-full"
        onChange={(e) =>
          setData({
            ...data,
            icon: {
              ...data.icon,
              fontSize: e.target.value,
            },
          })
        }
      />
      <p className="text-xs text-[#666] my-3">Icon Color</p>
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

export default IconsPicker;
