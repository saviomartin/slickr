import React from "react";

const NotFound = ({ heading, description }) => {
  return (
    <div className="flex items-center justify-center flex-col">
      <img src="/assets/not-found.png" alt="Not Found" className="h-[230px]" />
      <h3 className="font-bold text-lg mt-3 text-[#222]">{heading}</h3>
      <p className="text-sm text-[#555] text-center px-3">{description}</p>
    </div>
  );
};

export default NotFound;
