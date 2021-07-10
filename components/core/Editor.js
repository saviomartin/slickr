import { TextField } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import Btn from "../utils/Btn";

const Editor = () => {
  // resize cover image to fit the view
  const resizeCoverImage = () => {
    const cover_image = document.getElementById("cover_image");
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

  return (
    <div className="h-full w-full lg:w-[67.5%] xl:w-[67.5%] relative bg-white flex items-center justify-center flex-col">
      <div className="w-full bg-[#EFF1FE] h-[70px] relative border-b border-[#564BB330] flex items-center justify-between px-3">
        <input
          type="text"
          className="bg-white px-3 p-[7px] border border-[#564BB330] rounded-md"
          value="Untitled Design"
        />
        <Btn>
          <div className="px-4 p-[8px] text-white bg-app-graient-to-l rounded-md flex items-center justify-center capitalize">
            Download
            <FiDownload className="text-xl ml-2" />
          </div>
        </Btn>
      </div>
      <div className="h-full overflow-hidden w-full relative flex items-center justify-center container">
        <div className="scale-[.85]">
          <div id="cover_image">
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
