import React from "react";
import { useEffect } from "react";
import $ from "jquery";

const Editor = () => {
  useEffect(() => {
    var maxWidth = $("#outer").width();
    var maxHeight = $("#outer").height();

    $(window).resize(function (evt) {
      var $window = $(window);
      var width = $window.width();
      var height = $window.height();
      var scale;

      // early exit
      if (width >= maxWidth && height >= maxHeight) {
        $("#outer").css({ "-webkit-transform": "" });
        $("#wrap").css({ width: "", height: "" });
        return;
      }

      scale = Math.min(width / maxWidth, height / maxHeight);

      $("#outer").css({ "-webkit-transform": "scale(" + scale + ")" });
      $("#wrap").css({ width: maxWidth * scale, height: maxHeight * scale });
    });
  });
  return (
    <div className="h-full w-full lg:w-[65%] xl:w-[65%] relative bg-white flex items-center justify-center editor">
      <div id="wrap" className="scale-[.85] lg:scale-[.65]">
        <div id="outer"></div>
      </div>
    </div>
  );
};

export default Editor;
