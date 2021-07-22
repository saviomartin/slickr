import React, { useState, useEffect } from "react";

// icons
import { FiDownload, FiMenu, FiMoon, FiShare2, FiSun } from "react-icons/fi";

// material btn
import { Btn, Rnd } from "..";

// material ui
import Menu from "@material-ui/core/Menu";
import { MenuItem, TextField } from "@material-ui/core";

// html2canvas for downloading images
import html2canvas from "html2canvas";

// react hot toast
import toast from "react-hot-toast";

// axios
import axios from "axios";

const Editor = ({ darkMode, setDarkMode, data, setData, children, code }) => {
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

  const coverImage = document.querySelector("#cover_image_download");

  const addInnerHtml = () => {
    coverImage.innerHTML = document.getElementById(
      "cover_image_preview"
    ).innerHTML;
  };

  // download image as a .png
  const downloadAsPng = () => {
    addInnerHtml();

    const downloadImage = html2canvas(coverImage, {
      useCORS: true,
    }).then(function (canvas) {
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
    addInnerHtml();

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
    addInnerHtml();

    html2canvas(coverImage, {
      useCORS: true,
    }).then(function (canvas) {
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

  useEffect(() => {
    const coverImagePreview = document.getElementById("cover_image_preview");
    const coverImageDownload = document.getElementById("cover_image_download");

    if (data.background.type === "solid") {
      coverImagePreview.style.background = data.background.color;
      coverImageDownload.style.background = data.background.color;
    } else if (data.background.type === "gradient") {
      coverImagePreview.style.background = `linear-gradient(${data.background.direction}deg, ${data.background.color1}, ${data.background.color2})`;
      coverImageDownload.style.background = `linear-gradient(${data.background.direction}deg, ${data.background.color1}, ${data.background.color2})`;
    } else if (data.background.type === "pattern") {
      coverImagePreview.style.backgroundColor = data.background.color1;
      coverImagePreview.style.backgroundImage = `url("${data.background.pattern}")`;
      coverImagePreview.style.backgroundSize = "auto";
      coverImageDownload.style.backgroundColor = data.background.color1;
      coverImageDownload.style.backgroundImage = `url("${data.background.pattern}")`;
      coverImageDownload.style.backgroundSize = "auto";
    } else if (data.background.type === "image") {
      if (data.background.src) {
        coverImagePreview.style.backgroundImage = `url("${data.background.src}")`;
        coverImagePreview.style.backgroundSize = "cover";
        coverImageDownload.style.backgroundImage = `url("${data.background.src}")`;
        coverImageDownload.style.backgroundSize = "cover";

        if (document.querySelector(".overlay")) {
          document.querySelector(".overlay").style.background =
            data.background.color;
          document.querySelector(".overlay").style.opacity =
            data.background.opacity;
        } else {
          const div = document.createElement("div");
          div.style.height = "100%";
          div.style.width = "100%";
          div.classList.add("overlay");
          div.style.background = data.background.color;
          div.style.opacity = data.background.opacity;

          coverImagePreview.appendChild(div);
        }
      }
    }
  }, [data]);

  const getShareImage = async () => {
    addInnerHtml();

    let base64Image;

    await html2canvas(coverImage, {
      useCORS: true,
    }).then(function (canvas) {
      base64Image = canvas.toDataURL("image/png").slice(22); // convert to dataURL
    });

    // upload the base64
    const formData = new FormData();
    formData.append("image", base64Image);
    formData.append("name", fileName);
    formData.append("key", process.env.NEXT_PUBLIC_IMGBB_STORAGE_KEY);

    const upload = axios
      .post("https://api.imgbb.com/1/upload", formData)
      .then((data) => {
        navigator.clipboard.writeText(data.data.data.url);
        document.querySelector("#share").innerHTML = "Sync Again";
        document.querySelector("#shareContainer").style.background =
          "transparent";
        document.querySelector("#shareContainer").style.color = "#fff";
      });

    toast.promise(upload, {
      loading: "Creating Shareable Image...",
      success: "Image URL copied to clipboard",
      error: "Error Creating Shareable Image",
    });
  };

  const showLeftBar = () => {
    if (document.querySelector("#leftBar").style.left === "0%") {
      document.querySelector("#leftBar").style.left = "-100%";
    } else {
      document.querySelector("#leftBar").style.left = "0%";
    }
  };

  return (
    <div className="h-full w-full lg:w-[67.5%] xl:w-[67.5%] relative bg-white dark:bg-[#0E102D] flex items-center justify-center flex-col">
      <div
        id="cover_image_download"
        className="absolute z-[-10] cover_image"
      ></div>
      <svg
        id="mySvg"
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        className="absolute z-[-10]"
      ></svg>
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
                className="bg-white dark:bg-[#0E102D] px-4 p-[6px] flex items-center justify-center rounded-md dark:text-[#fafafa]"
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

      <div className="h-full overflow-hidden w-full relative flex items-center justify-center container">
        <div className="scale-[.95] lg:scale-[.85]">
          <div
            id="cover_image_preview"
            className="relative cover_image bg-blue-700 overflow-hidden select-none"
          >
            {children.map((child, key) => (
              <Rnd key={key}>{child.component}</Rnd>
            ))}
            {code.value}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
