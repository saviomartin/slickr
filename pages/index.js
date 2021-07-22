import React from "react";
import { FiGithub, FiZap } from "react-icons/fi";
import { Btn, StylishBtn } from "../components";

const index = () => {
  return (
    <div className="home h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="h-[95%] w-[95%] rounded-md glassmorphism border border-[#1CC8EE85] flex">
        <div className="w-6/12 h-full flex flex-col items-start justify-center pl-8">
          <h1 className="font-bold text-[2.55em] leading-[1.2em] text-[#14142B]">
            The most powerful cover image designer for your {""}
            <div className="flex items-center">
              <a
                href="https://hashnode.com/"
                className="text-gradient bg-app-graient-to-l relative"
              >
                hashnode blog
                <div className="absolute bottom-1 left-0 bg-app-graient-to-l h-[3px] w-full"></div>
              </a>
              <img
                src="/assets/hashnode-logo.png"
                alt="Logo"
                className="w-[40px] h-[40px] ml-2"
              />
            </div>
          </h1>
          <p className="text-[#6E7191] mt-4">
            Enjoy creating cover image for your hashnode blog like never before,
            get started in seconds 🎉
          </p>
          <div className="flex mt-3">
            <StylishBtn
              text="Try Now"
              icon1={<FiZap className="text-xl ml-2" />}
              icon={<FiZap className="text-xl ml-2 text-[#fff]" />}
            />
            <div className="ml-1">
              <StylishBtn
                text="50 Stars"
                icon1={<FiGithub className="text-xl ml-2" />}
                icon={<FiGithub className="text-xl ml-2 text-[#fff]" />}
              />
            </div>
          </div>
        </div>
        <div className="w-6/12 h-full"></div>
      </div>
    </div>
  );
};

export default index;
