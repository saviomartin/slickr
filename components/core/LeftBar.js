import React, { useState } from "react";
import { Tab, Tabs } from "@material-ui/core";
import { FiEdit, FiFolder, FiUploadCloud } from "react-icons/fi";
import { IoShapesOutline } from "react-icons/io5";

const TabItem = ({ tab }) => {
  return (
    <div className="w-[85px] h-[60px] flex flex-col items-center justify-center text-[#111]">
      {tab.icon}
      <h3 className="text-xs font-medium lowercase">{tab.name}</h3>
    </div>
  );
};

const LeftBar = () => {
  // current tab
  const [value, setValue] = useState("home");

  // handleChange of tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const allTabs = [
    {
      name: "home",
      icon: <FiEdit className="text-xl mb-1" />,
    },
    {
      name: "elements",
      icon: <IoShapesOutline className="text-xl mb-1" />,
    },
    {
      name: "uploads",
      icon: <FiUploadCloud className="text-xl mb-1" />,
    },
    {
      name: "saved",
      icon: <FiFolder className="text-xl mb-1" />,
    },
  ];

  return (
    <div className="h-full absolute lg:relative xl:relative w-10/12 lg:w-[32.5%] xl:w-[32.5%] flex bg-[#F1F5FB] border-r border-[#564BB330] white-light-shadow">
      <div className="h-full bg-[#fff] border-r border-[#564BB330] white-light-shadow">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          orientation="vertical"
          variant="scrollable"
        >
          {allTabs.map((tab, key) => (
            <Tab
              label={<TabItem tab={tab} />}
              value={tab.name}
              key={key}
              className="!p-0 !m-0 !min-w-0 !min-h-0"
            />
          ))}
        </Tabs>
      </div>
      {value}
    </div>
  );
};

export default LeftBar;
