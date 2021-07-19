import React, { useState } from "react";
import { Rnd } from "react-rnd";

const Component = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);

  const onDragStart = () => {
    setIsEditing(true);
  };

  const onDragStop = () => {
    setIsEditing(false);
  };

  const style = {
    position: "relative",
    overflow: "hidden",
  };

  return (
    <Rnd
      style={style}
      default={{
        x: 0,
        y: 0,
        width: 320,
        height: 200,
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
        <div className="absolute top-[-7.5px] left-[-7.5px] rounded-full h-[15px] w-[15px] bg-white border-[3px] border-[#4286f4]"></div>
        <div className="absolute top-[-7.5px] right-[-7.5px] rounded-full h-[15px] w-[15px] bg-white border-[3px] border-[#4286f4]"></div>
        <div className="absolute bottom-[-7.5px] left-[-7.5px] rounded-full h-[15px] w-[15px] bg-white border-[3px] border-[#4286f4]"></div>
        <div className="absolute bottom-[-7.5px] right-[-7.5px] rounded-full h-[15px] w-[15px] bg-white border-[3px] border-[#4286f4]"></div>
      </div>
    </Rnd>
  );
};

export default Component;
