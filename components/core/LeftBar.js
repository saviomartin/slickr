import React, { useState } from "react";

// material vertical tabs
import { Tab, Tabs } from "@material-ui/core";

// icons
import { FiEdit, FiFolder, FiTwitter, FiUploadCloud } from "react-icons/fi";
import { IoShapesOutline } from "react-icons/io5";

// material btn
import Btn from "../utils/Btn";
import TabWrapper from "../utils/TabWrapper";

// color pickers
import SolidColorPicker from "../utils/SolidColorPicker";

const TabItem = ({ tab }) => {
  return (
    <div className="w-[85px] h-[60px] flex flex-col items-center justify-center text-[#111]">
      {tab.icon}
      <h3 className="text-xs font-medium lowercase">{tab.name}</h3>
    </div>
  );
};

const BgTabItem = ({ tab }) => {
  return (
    <div className="p-2 flex flex-col items-center justify-center text-[#111] border border-[#ddd]">
      <h3 className="text-sm font-medium lowercase">{tab}</h3>
    </div>
  );
};

const LeftBar = ({ data, setData }) => {
  // current tab
  const [value, setValue] = useState("home");

  // current background tab
  const [bgValue, setBgValue] = useState(data.background.type);

  // handleChange of tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // mapping of tabs
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

  const backgroundTabs = ["solid", "gradient", "pattern"];

  return (
    <div className="h-full absolute lg:relative xl:relative w-10/12 lg:w-[32.5%] xl:w-[32.5%] flex bg-[#F1F5FB] border-r border-[#564BB330] white-light-shadow">
      <div className="bg-gradient h-full w-[10px] bg-gradient-to-b"></div>
      <div className="h-full bg-[#fff] border-r border-[#564BB330] white-light-shadow py-3 flex flex-col items-center justify-between">
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
        <div className="w-[85px] h-[60px] flex flex-col items-center justify-center">
          <Btn>
            <div className="w-[70px] h-[60px] bg-[#0F84B425] rounded-md flex flex-col items-center justify-center text-[#0F84B4]">
              <FiTwitter className="text-xl mb-1" />
              <h3 className="text-xs font-medium lowercase">Share</h3>
            </div>
          </Btn>
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-start flex-col py-3">
        <TabWrapper name="Background">
          <Tabs
            value={bgValue}
            onChange={(event, newValue) => {
              setBgValue(newValue);
            }}
            indicatorColor="primary"
            className="!p-0 !m-0 !min-w-0 !min-h-0"
          >
            {backgroundTabs.map((tab, key) => (
              <Tab
                label={<BgTabItem tab={tab} />}
                value={tab}
                key={key}
                className="!p-0 !m-0 !min-w-0 !min-h-0"
              />
            ))}
          </Tabs>
          <div className="mt-5">
            {bgValue === "solid" && (
              <SolidColorPicker data={data} setData={setData} />
            )}
          </div>
        </TabWrapper>
        <h1>{value}</h1>
      </div>
    </div>
  );
};

export default LeftBar;
