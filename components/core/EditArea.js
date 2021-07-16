import { Tab, Tabs, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TabWrapper from "../utils/TabWrapper";

// color pickers
import SolidColorPicker from "../utils/SolidColorPicker";
import GradientColorPicker from "../utils/GradientColorPicker";
import PatternPicker from "../utils/PatternPicker";
import IconsPicker from "../utils/IconsPicker";
import TextTab from "../utils/TextTab";

const BgTabItem = ({ tab }) => {
  return (
    <div className="p-2 flex flex-col items-center justify-center text-[#111] border border-[#ddd]">
      <h3 className="text-sm font-medium lowercase">{tab}</h3>
    </div>
  );
};

const EditArea = ({ data, setData }) => {
  // title
  const [title, setTitle] = useState({
    fontSize: data.title.fontSize,
    fontFamily: data.title.fontFamily,
    color: data.title.color,
    fontWeight: data.title.fontWeight,
    text: data.title.text,
  });
  const [tagline, setTagline] = useState({
    fontSize: data.tagline.fontSize,
    fontFamily: data.tagline.fontFamily,
    color: data.tagline.color,
    fontWeight: data.tagline.fontWeight,
    text: data.tagline.text,
  });

  // current background tab
  const [bgValue, setBgValue] = useState(data.background.type);

  const backgroundTabs = ["solid", "gradient", "pattern"];

  useEffect(() => {
    setData({
      ...data,
      title: {
        fontSize: title.fontSize,
        fontFamily: title.fontFamily,
        color: title.color,
        fontWeight: title.fontWeight,
        text: title.text,
      },
      tagline: tagline,
    });
  }, [title, tagline]);
  return (
    <>
      <TextTab title={title} setTitle={setTitle} name="title" />
      <TextTab title={tagline} setTitle={setTagline} name="tagline" />
      <TabWrapper name="Icon">
        <IconsPicker data={data} setData={setData} />
      </TabWrapper>
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
          {bgValue === "gradient" && (
            <GradientColorPicker data={data} setData={setData} />
          )}
          {bgValue === "pattern" && (
            <PatternPicker data={data} setData={setData} />
          )}
        </div>
      </TabWrapper>
    </>
  );
};

export default EditArea;
