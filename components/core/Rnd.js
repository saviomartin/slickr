import React, { useState } from "react";

import { Rnd } from "react-rnd"; // rnd library

const Component = ({ children, width, x, y }) => {
  const [isEditing, setIsEditing] = useState(false); // checking is dragging or reszing
  const [isHiddening, setIsHiddening] = useState(false);

  // adding border and effect when editing
  const onDragStart = () => {
    setIsEditing(true);
  };
  const onDragStop = () => {
    setIsEditing(false);
  };

  // default styles
  const style = {
    position: "absolute",
    top: 0,
    left: 0,
    display: isHiddening ? "none" : "block",
  };

  return (
    <Rnd
      style={style}
      default={{
        x: x || 0,
        y: y || 0,
        width: width || 320,
      }}
      onDragStart={onDragStart}
      onDragStop={onDragStop}
      onResizeStart={onDragStart}
      onResizeStop={onDragStop}
      className="resizerComp"
    >
      {children}
      <div
        className={`w-full h-full absolute top-0 left-0 border-[3px] border-[#4286f4] resizer ${
          !isEditing && "hidden"
        }`}
      >
        <div className="absolute top-[-7.5px] left-[-7.5px] rounded-full h-[15px] w-[15px] bg-white border-[3px] border-[#4286f4] overflow-visible"></div>
        <div className="absolute top-[-7.5px] right-[-7.5px] rounded-full h-[15px] w-[15px] bg-white border-[3px] border-[#4286f4]"></div>
        <div className="absolute bottom-[-7.5px] left-[-7.5px] rounded-full h-[15px] w-[15px] bg-white border-[3px] border-[#4286f4]"></div>
        <div className="absolute bottom-[-7.5px] right-[-7.5px] rounded-full h-[15px] w-[15px] bg-white border-[3px] border-[#4286f4]"></div>
        <div
          className="absolute right-0 top-[-50px] flex items-center justify-center p-2 px-3 z-10 rounded-md bg-red-500 hover:bg-red-700 cursor-pointer text-white"
          onClick={() => setIsHiddening(true)}
        >
          Delete
        </div>
      </div>
    </Rnd>
  );
};

export default Component;
