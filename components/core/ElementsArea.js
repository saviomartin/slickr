import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { BsFillBookmarkFill } from "react-icons/bs";
import { FiBookmark } from "react-icons/fi";
import Btn from "../utils/Btn";

const ElementsArea = ({ children, setChildren }) => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchUrl = `https://iconfinder-api-auth.herokuapp.com/v4/icons/search?query=${searchValue}&count=50`;

    fetch(fetchUrl)
      .then((res) => res.json())
      .then((json) => setData(json.icons))
      .catch((err) => console.error("error:" + err));
  }, [searchValue]);

  const searchImages = (e) => {
    if (e.keyCode === 13) {
      setSearchValue(e.target.value);
      setData([]);
    }
  };

  const addImage = (src) => {
    setChildren([
      ...children,
      {
        component: <img src={src} style={{ height: "100%", width: "100%" }} />,
      },
    ]);
  };

  const [bookmarks, setBookmarks] = useState([]);

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
  return (
    <div className="w-full h-auto flex items-center justify-center flex-col p-3">
      <TextField
        size="small"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => searchImages(e)}
        className="m-4"
        variant="outlined"
        label="Search Elements"
        className="w-full epilogue bg-white"
      />
      {searchValue.replace(/\s/g, "").length ? (
        <div className="flex items-center justify-center flex-wrap w-full h-auto mt-2">
          {data.map((data, key) => {
            return (
              <Btn className="!bg-white !m-[5px] !p-1 !rounded-md" key={key}>
                <img
                  src={
                    data.raster_sizes.slice(-1)[0].formats.slice(-1)[0]
                      .preview_url
                  }
                  className="image"
                  alt={data.icon_id}
                  onClick={() =>
                    addImage(
                      data.raster_sizes.slice(-1)[0].formats.slice(-1)[0]
                        .preview_url
                    )
                  }
                  className="h-[85px] w-[85px]"
                />
                <div
                  className="text-[#F5BA31] duration-500 text-lg capitalize rounded-md font-semibold flex items-center justify-center menu-animation-hover poppins dark:bg-[#1F1F1F] border border-transparent dark:border-[#555] absolute top-1 right-1"
                  onClick={() =>
                    bookmarkImage(
                      data.raster_sizes.slice(-1)[0].formats.slice(-1)[0]
                        .preview_url
                    )
                  }
                >
                  {fetchBookmarked(
                    data.raster_sizes.slice(-1)[0].formats.slice(-1)[0]
                      .preview_url
                  ) ? (
                    <BsFillBookmarkFill className="text-md span duration-500" />
                  ) : (
                    <FiBookmark className="text-md span duration-500" />
                  )}
                </div>
              </Btn>
            );
          })}
        </div>
      ) : (
        "hi"
      )}
    </div>
  );
};

export default ElementsArea;
