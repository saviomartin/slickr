import { MenuItem, Select } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const IconsPicker = () => {
  const [icons, setIcons] = useState([]);
  const [icon, setIcon] = useState("react");

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
      <Select
        value={icon}
        onChange={(e) => {
          setIcon(e.target.value);
        }}
      >
        {icons.map((icon, key) => (
          <MenuItem value={icon.name} key={key}>
            {icon.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default IconsPicker;
