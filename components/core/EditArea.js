import React, { useEffect, useState } from "react";

import { Tab, Tabs } from "@material-ui/core"; // material-ui

import {
  SolidColorPicker,
  GradientColorPicker,
  BgImagePicker,
  PatternPicker, // color pickers
  IconsPicker, // icon picker
  TabWrapper, // tab wrapper
  TextTab, // text tab wrapper
} from "..";

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
    lineHeight: data.title.lineHeight,
  });
  const [tagline, setTagline] = useState({
    fontSize: data.tagline.fontSize,
    fontFamily: data.tagline.fontFamily,
    color: data.tagline.color,
    fontWeight: data.tagline.fontWeight,
    text: data.tagline.text,
    lineHeight: data.tagline.lineHeight,
  });

  // current background tab
  const [bgValue, setBgValue] = useState(data.background.type);

  // background tabs
  const backgroundTabs = ["solid", "gradient", "pattern", "image"];

  useEffect(() => {
    setData({
      ...data,
      title: title,
      tagline: tagline,
    });
  }, [title, tagline]);

  const props = {
    data,
    setData,
  };

  return (
    <>
      <TextTab title={title} setTitle={setTitle} name="title" />
      <TextTab title={tagline} setTitle={setTagline} name="tagline" />
      <TabWrapper name="Icon">
        <IconsPicker {...props} />
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
          {bgValue === "solid" && <SolidColorPicker {...props} />}
          {bgValue === "gradient" && <GradientColorPicker {...props} />}
          {bgValue === "pattern" && <PatternPicker {...props} />}
          {bgValue === "image" && <BgImagePicker {...props} />}
        </div>
      </TabWrapper>
    </>
  );
};

export default EditArea;
