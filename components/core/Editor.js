import React, { useState, useEffect } from "react";

// components
import { AppHeader, Rnd, AppFooter } from "..";

// html2canvas for downloading images
import html2canvas from "html2canvas";

// react hot toast
import toast from "react-hot-toast";

// axios
import axios from "axios";

const Editor = ({ darkMode, setDarkMode, data, setData, children, Code }) => {
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
        return "data:image/svg+xml," + enCodeURIComponent(svgAsXML);
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

        document.querySelector(".overlay").style.background =
          data.background.color;
        document.querySelector(".overlay").style.opacity =
          data.background.opacity;
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

  const AppHeaderProps = {
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

      <AppHeader {...AppHeaderProps} darkMode={darkMode} />

      <div className="h-full overflow-hidden w-full relative flex items-center justify-center container">
        <div className="scale-[.95] lg:scale-[.85]">
          <div
            id="cover_image_preview"
            className="relative cover_image bg-blue-700 overflow-hidden select-none"
          >
            <div className="overlay"></div>
            {children.map((child, key) => (
              <Rnd key={key}>{child.component}</Rnd>
            ))}
            {Code()}
          </div>
        </div>
      </div>

      <AppFooter />
    </div>
  );
};

export default Editor;
