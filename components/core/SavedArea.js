import React, { useEffect, useState } from "react";

// icons
import { BsFillBookmarkFill } from "react-icons/bs";
import { FiBookmark } from "react-icons/fi";

// material icons
import Btn from "../utils/Btn";
import NotFound from "./NotFound";

const SavedArea = ({ children, setChildren }) => {
  const [bookmarks, setBookmarks] = useState([]); // bookmarks

  const fetchBookmarks = () => {
    if (window.localStorage.getItem("saved")) {
      setBookmarks(JSON.parse(window.localStorage.getItem("saved")));
    } else {
      window.localStorage.setItem("saved", JSON.stringify([]));
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarked = (src) => {
    if (bookmarks.some((image) => image.src === src)) {
      return true;
    } else {
      return false;
    }
  };

  // bookmarking a image
  const bookmarkImage = (src) => {
    if (typeof window !== "undefined") {
      if (fetchBookmarked(src)) {
        // removing bookmark if already bookmarked
        window.localStorage.setItem(
          "saved",
          JSON.stringify(bookmarks.filter((image) => image.src !== src))
        );

        // making state uptodate
        fetchBookmarks();
        fetchBookmarked(src);
      } else {
        // adding bookmark
        window.localStorage.setItem(
          "saved",
          JSON.stringify([
            ...bookmarks,
            {
              src: src,
            },
          ])
        );

        // making state uptodate
        fetchBookmarks();
        fetchBookmarked(src);
      }
    }
  };

  // adding image to app
  const addImage = (src) => {
    setChildren([
      ...children,
      {
        component: <img src={src} style={{ height: "100%", width: "100%" }} />,
      },
    ]);
  };

  return (
    <div className="w-full h-full flex items-center justify-start flex-col text-[#222]">
      {bookmarks.length > 0 && (
        <>
          <h1 className="font-bold text-xl mt-3 dark:text-[#fafafa]">
            Your BookMarks
          </h1>
          <p className="text-sm text-[#555] dark:text-[#aaa] mb-3 text-center">
            Bookmark an element or image to see it here
          </p>
        </>
      )}
      <div className="flex w-full h-full flex-wrap items-start content-start justify-center">
        {bookmarks.map((data, key) => {
          return (
            <Btn
              className="!bg-white dark:!bg-[#182341] !m-1 !p-1 !rounded-[3px]"
              key={key}
            >
              <img
                src={data.src}
                className="image"
                alt="An Image"
                onClick={() => addImage(data.src)}
                className="h-[85px] w-[85px] rounded-[3px]"
              />
              <div
                className="text-[#F5BA31] duration-500 text-lg capitalize rounded-md font-semibold flex items-center justify-center menu-animation-hover poppins dark:bg-[#1F1F1F] border border-transparent dark:border-[#555] absolute top-1 right-1"
                onClick={() => bookmarkImage(data.src)}
              >
                {fetchBookmarked(data.src) ? (
                  <BsFillBookmarkFill className="text-md span duration-500" />
                ) : (
                  <FiBookmark className="text-md span duration-500" />
                )}
              </div>
            </Btn>
          );
        })}
        <div className="mt-6">
          {bookmarks.length === 0 && (
            <NotFound
              heading="No Bookmarks Found"
              description="Bookmark images or elements to see it here."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedArea;
