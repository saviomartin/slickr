import React from "react";
import { useEffect } from "react";
import $ from "jquery";

const Editor = () => {
  useEffect(() => {
    const cover_image = document.getElementById("cover_image");

    // get width and height of cover_image
    const maxWidth = cover_image.offsetWidth;
    const maxHeight = cover_image.offsetHeight;

    window.onresize = () => {
      // get width and height of window
      const width = window.innerWidth;
      const height = window.innerHeight;

      let scale; // scale to be used

      // early exit
      if (width >= maxWidth && height >= maxHeight) {
        cover_image.style.transform = "";
        return;
      }

      scale = Math.min(width / maxWidth, height / maxHeight); // trick to get scale

      cover_image.style.transform = `scale(${scale})`; // transform scale applied
    };
  });

  return (
    <div className="h-full w-full lg:w-[65%] xl:w-[65%] relative bg-white flex items-center justify-center editor">
      <div className="scale-[.85] lg:scale-[.65]">
        <div id="cover_image">
          <p className="text-5xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nemo
            laborum consectetur saepe, qui nisi possimus maiores id, est non
            numquam! Id facilis vero quasi voluptatem ad blanditiis ullam error
            architecto reprehenderit nisi? Ratione omnis quia qui. Laborum,
            aspernatur sequi?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Editor;
