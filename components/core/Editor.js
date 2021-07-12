import React, { useState, useEffect } from "react";

// icons
import { FiDownload, FiMoon, FiSun } from "react-icons/fi";

// material btn
import Btn from "../utils/Btn";

// material ui
import Menu from "@material-ui/core/Menu";
import { MenuItem, TextField } from "@material-ui/core";

// html2canvas for downloading images
import html2canvas from "html2canvas";

// react hot toast
import toast from "react-hot-toast";

const Editor = ({ darkMode, setDarkMode }) => {
  const [anchorEl, setAnchorEl] = useState(null); // for menu
  const [fileName, setFileName] = useState("Untitled Design");

  // resize cover image to fit the view
  const resizeCoverImage = () => {
    const cover_image = document.querySelector("#cover_image_preview");
    const container = document.querySelector(".container");

    // get width and height of cover_image
    const maxWidth = cover_image.offsetWidth;
    const maxHeight = cover_image.offsetHeight;

    // get width and height of window
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    let scale; // scale to be used

    // early exit
    if (width >= maxWidth && height >= maxHeight) {
      cover_image.style.transform = "";
      return;
    }

    scale = Math.min(width / maxWidth, height / maxHeight); // trick to get scale

    cover_image.style.transform = `scale(${scale})`; // transform scale applied
  };

  // useEffect to control window resize and all
  useEffect(() => {
    resizeCoverImage();

    window.addEventListener("resize", resizeCoverImage);
  });

  // download image as a .png
  const downloadAsPng = () => {
    const coverImage = document.querySelector("#cover_image_download");

    const downloadImage = html2canvas(coverImage).then(function (canvas) {
      const a = document.createElement("a");

      a.href = canvas.toDataURL("image/png"); // convert to dataURL
      a.download = fileName + ".png";
      a.click();
    });

    // toasting
    toast.promise(downloadImage, {
      loading: "Saving...",
      success: `Saved ${fileName}.png`,
      error: "Error Saving File",
    });
  };

  // download image as a .jpg
  const downloadAsJpg = () => {
    const coverImage = document.querySelector("#cover_image_download");

    const downloadImage = html2canvas(coverImage).then(function (canvas) {
      const a = document.createElement("a");

      a.href = canvas.toDataURL("image/jpeg"); // convert to dataURL
      a.download = fileName + ".jpg";
      a.click();
    });

    // toasting
    toast.promise(downloadImage, {
      loading: "Saving...",
      success: `Saved ${fileName}.png`,
      error: "Error Saving File",
    });
  };

  // download image as a .svg
  const downloadAsSvg = () => {
    const coverImage = document.querySelector("#cover_image_download");

    html2canvas(coverImage).then(function (canvas) {
      var image = canvas.toDataURL("image/png");
      var svgimg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "image"
      );
      svgimg.setAttribute("width", "1200");
      svgimg.setAttribute("height", "630");
      svgimg.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        image
      );

      document.getElementById("mySvg").appendChild(svgimg);

      function svgDataURL(svg) {
        var svgAsXML = new XMLSerializer().serializeToString(svg);
        return "data:image/svg+xml," + encodeURIComponent(svgAsXML);
      }

      const a = document.createElement("a");

      a.href = svgDataURL(document.getElementById("mySvg")); // convert to dataURL
      a.download = fileName + ".svg";
      a.click();

      // toasting
      toast.success(`Saved ${fileName}.svg`);
    });
  };

  return (
    <div className="h-full w-full lg:w-[67.5%] xl:w-[67.5%] relative bg-white flex items-center justify-center flex-col">
      <div
        id="cover_image_download"
        className="absolute z-[-10] cover_image bg-blue-700"
      >
        <p className="text-5xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nemo
          laborum consectetur saepe, qui nisi possimus maiores id, est non
          numquam! Id facilis vero quasi voluptatem ad blanditiis ullam error
          architecto reprehenderit nisi? Ratione omnis quia qui. Laborum,
          aspernatur sequi?
        </p>
      </div>
      <svg
        id="mySvg"
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        className="absolute z-[-10]"
      ></svg>
      <div className="w-full bg-[#EFF1FE] h-[70px] relative border-b border-[#564BB330] flex items-center justify-between px-3">
        <TextField
          label="File Name"
          variant="outlined"
          size="small"
          value={fileName}
          className="bg-white epilogue"
          onChange={(e) => setFileName(e.target.value)}
        />
        <div className="flex">
          <Btn onClick={() => setDarkMode(!darkMode)}>
            <div className="px-2 rounded-md p-[8px] flex items-center justify-center text-[#222]">
              {darkMode ? (
                <FiMoon className="text-xl" />
              ) : (
                <FiSun className="text-xl" />
              )}
            </div>
          </Btn>
          <div className="ml-1"></div>
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
          >
            <MenuItem>
              <div
                className="w-[200px] flex items-center justify-between"
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
                className="w-[200px] flex items-center justify-between"
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
                className="w-[200px] flex items-center justify-between"
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

      <div className="h-full overflow-hidden w-full relative flex items-center justify-center container">
        <div className="scale-[.85]">
          <div
            id="cover_image_preview"
            className="relative cover_image bg-blue-700"
          >
            <p className="text-5xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nemo
              laborum consectetur saepe, qui nisi possimus maiores id, est non
              numquam! Id facilis vero quasi voluptatem ad blanditiis ullam
              error architecto reprehenderit nisi? Ratione omnis quia qui.
              Laborum, aspernatur sequi?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
