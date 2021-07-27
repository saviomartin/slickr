import React, { useEffect, useState } from "react";

// icons
import { FiGithub, FiZap } from "react-icons/fi";

// components
import { StylishBtn, Header } from "../components";

// next js
import Link from "next/link";

const index = () => {
  const [starCount, setStarCount] = useState(1);

  const fetchStarCount = () => {
    // fetch
    fetch("https://api.github.com/repos/saviomartin/slickr")
      .then((response) => response.json())
      .then((json) => {
        // update
        setStarCount(json.stargazers_count);
      });
  };

  // fetch on load once
  useEffect(() => {
    fetchStarCount();
  }, []);
  return (
    <div className="home h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="h-[95%] w-[95%] rounded-md glassmorphism border border-[#1CC8EE85]">
        <Header />
        <div className="flex h-[calc(100%-50px)]">
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
              Enjoy creating cover image for your hashnode blog like never
              before, get started in seconds 🎉
            </p>
            <div className="flex mt-3">
              <Link href="/app">
                <a>
                  <StylishBtn
                    text="Try Now"
                    icon1={<FiZap className="text-xl ml-2" />}
                    icon={<FiZap className="text-xl ml-2 text-[#fff]" />}
                  />
                </a>
              </Link>

              <div className="ml-1">
                <a href="https://github.com/saviomartin/slickr" target="_blank">
                  <StylishBtn
                    text={`${starCount} Stars`}
                    icon1={<FiGithub className="text-xl ml-2" />}
                    icon={<FiGithub className="text-xl ml-2 text-[#fff]" />}
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="w-6/12 h-full"></div>
        </div>
      </div>
    </div>
  );
};

export default index;
