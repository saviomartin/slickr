import React, { useEffect, useState } from "react";

// icons
import { FiGithub, FiZap } from "react-icons/fi";

// modal popup for material ui
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

// components
import { StylishBtn, Header, Btn } from "../components";

// next js
import Link from "next/link";
import { BsFillPlayFill } from "react-icons/bs";

const YTModal = ({ open, setOpen }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      className="flex items-center justify-center"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <iframe
          className="w-10/12 h-5/12 lg:w-[896px] lg:h-[504px] xl:w-[896px] xl:h-[504px]"
          src="https://www.youtube.com/embed/N4kSXdyR_Zc"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </Fade>
    </Modal>
  );
};

const index = () => {
  const [starCount, setStarCount] = useState(1);
  const [showYt, setShowYt] = useState(false);

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
      <YTModal open={showYt} setOpen={setShowYt} />
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
          <div className="w-6/12 h-full flex flex-col items-center justify-center">
            <Btn onClick={() => setShowYt(true)}>
              <div className="bg-app-graient-to-l p-[2px] rounded-md relative">
                <img
                  src="/assets/cover.png"
                  alt=""
                  className="w-[500px] rounded-md"
                />
                <div className="bg-app-graient-to-l p-4 rounded-full position-tracker duration-500 cursor-pointer border top-0 left-0 ">
                  <BsFillPlayFill className="text-white text-3xl transform hover:scale-125" />
                </div>
              </div>
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
