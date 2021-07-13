import { MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";

const IconsPicker = ({ data, setData }) => {
  const [icons, setIcons] = useState([]);
  const [icon, setIcon] = useState(data.icon ? data.icon : "react");

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
          setData({
            ...data,
            icon: e.target.value,
          });
        }}
        className="w-full epilogue"
      >
        {icons.map((icon, key) => (
          <MenuItem value={icon.name} key={key} className="epilogue">
            {icon.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default IconsPicker;
