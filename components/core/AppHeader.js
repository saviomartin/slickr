import React from "react";

// icons
import { FiDownload, FiMenu, FiMoon, FiShare2, FiSun } from "react-icons/fi";

// material btn
import { Btn } from "..";

// material ui
import Menu from "@material-ui/core/Menu";
import { MenuItem, TextField } from "@material-ui/core";

const AppHeader = ({
  anchorEl,
  setAnchorEl,
  fileName,
  setFileName,
  showLeftBar,
  darkMode,
  setDarkMode,
  getShareImage,
  downloadAsPng,
  downloadAsJpg,
  downloadAsSvg,
}) => {
  return (
    <div className="w-full bg-[#EFF1FE] dark:bg-[#0E102D] h-auto py-3 relative border-b border-[#564BB330] flex items-center justify-between px-3 flex-col lg:flex-row xl:flex-row">
      <div className="flex justify-between w-auto">
        <TextField
          label="File Name"
          variant="outlined"
          size="small"
          value={fileName}
          className="bg-white dark:bg-[#0E102D] epilogue"
          onChange={(e) => setFileName(e.target.value)}
        />
        <Btn onClick={showLeftBar} className="lg:!hidden xl:!hidden">
          <div className="px-2 rounded-md p-[8px] flex items-center justify-center text-[#222] dark:text-[#ccc]">
            <FiMenu className="text-xl" />
          </div>
        </Btn>
      </div>
      <div className="flex mt-2 lg:mt-0 xl:mt-0 w-auto">
        <Btn
          onClick={() => {
            window.localStorage.setItem("darkMode", !darkMode);
            setDarkMode(!darkMode);
          }}
        >
          <div className="px-2 rounded-md p-[8px] flex items-center justify-center text-[#222] dark:text-[#ccc]">
            {darkMode ? (
              <FiMoon className="text-xl" />
            ) : (
              <FiSun className="text-xl" />
            )}
          </div>
        </Btn>

        <Btn className="!mx-1 !mr-[5px]" onClick={getShareImage}>
          <div className="p-[2px] bg-app-graient-to-l rounded-md flex items-center justify-center capitalize">
            <div
              className="bg-[#EFF1FE] dark:bg-[#0E102D] px-4 p-[6px] flex items-center justify-center rounded-md dark:text-[#fafafa]"
              id="shareContainer"
            >
              <span id="share">Share Image</span>
              <FiShare2 className="text-xl ml-2" />
            </div>
          </div>
        </Btn>
        <Btn onClick={(e) => setAnchorEl(e.currentTarget)}>
          <div className="px-4 p-[8px] text-white bg-app-graient-to-l rounded-md flex items-center justify-center capitalize">
            Download
            <FiDownload className="text-xl ml-2" />
          </div>
        </Btn>
        <Menu
          getContentAnchorEl={null}
          className="!mt-1 !block"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          className="menu"
        >
          <MenuItem>
            <div
              className="w-[200px] flex items-center justify-between mx-4 my-2"
              onClick={downloadAsPng}
            >
              <div className="relative">
                <div className="flex">
                  <h3 className="font-semibold text-[#222]">PNG</h3>
                  <span className="ml-1 mb-1 bg-app-graient-to-l py-[3px] px-[7px] rounded-md text-white text-xs font-medium">
                    suggested
                  </span>
                </div>
                <p className="text-xs text-[#444]">High quality Image</p>
              </div>
              <FiDownload className="text-xl ml-2 text-[#564BB3]" />
            </div>
          </MenuItem>
          <div className="w-[90%] h-[1px] bg-[#ccc] mx-[5%] rounded-md my-1"></div>
          <MenuItem>
            <div
              className="w-[200px] flex items-center justify-between mx-4 my-2"
              onClick={downloadAsJpg}
            >
              <div className="relative">
                <h3 className="font-semibold text-[#222]">JPG</h3>
                <p className="text-xs text-[#444]">Low quality Image</p>
              </div>
              <FiDownload className="text-xl ml-2 text-[#564BB3]" />
            </div>
          </MenuItem>
          <div className="w-[90%] h-[1px] bg-[#ccc] mx-[5%] rounded-md my-1"></div>
          <MenuItem>
            <div
              className="w-[200px] flex items-center justify-between mx-4 my-2"
              onClick={downloadAsSvg}
            >
              <div className="relative">
                <h3 className="font-semibold text-[#222]">SVG</h3>
                <p className="text-xs text-[#444]">Sharp Vector Graphics</p>
              </div>
              <FiDownload className="text-xl ml-2 text-[#564BB3]" />
            </div>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default AppHeader;
