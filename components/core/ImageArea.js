import React, { useEffect, useState, useRef } from "react";

import { TextField } from "@material-ui/core"; // material-ui
import { Btn, Loader } from "..";

// icons
import { FiBookmark } from "react-icons/fi";
import { BsFillBookmarkFill } from "react-icons/bs";

const InfiniteScroll = ({ children, setChildren }) => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("code");
  const [searchValue, setSearchValue] = useState("code");

  // bookmarks
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

  // tracking on which page we currently are
  const [page, setPage] = useState(1);
  // add loader refrence
  const loader = useRef(null);

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    // initialize IntersectionObserver
    // and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  useEffect(() => {
    const client_id = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;
    const fetchUrl = `https://api.unsplash.com/search/photos?client_id=${client_id}&query=${searchValue}&page=${page}&per_page=12`;

    fetch(fetchUrl)
      .then((res) => res.json())
      .then((json) => setData([...data, ...json.results]))
      .catch((err) => console.error("error:" + err));
  }, [page]);

  // here we handle what happens when user scrolls to Load More div
  // in this case we just update page variable
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1);
    }
  };

  // search image on enter
  const searchImages = (e) => {
    if (e.keyCode === 13) {
      setSearchValue(query);
      setData([]);
      setPage(1);
    }
  };

  // add image to app
  const addImage = (src) => {
    setChildren([
      ...children,
      {
        component: <img src={src} style={{ height: "100%", width: "100%" }} />,
      },
    ]);
  };

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
        label="Search Images"
        className="w-full epilogue !bg-auto"
      />
      <div className="flex items-center justify-center flex-wrap w-full h-auto mt-2">
        {data.map((data, key) => {
          return (
            <Btn className="bg-white !m-1" key={key}>
              <img
                src={data.urls.small}
                className="image"
                alt={data.alt_description}
                onClick={() => addImage(data.urls.raw)}
                className="h-[145px] w-[145px] rounded-[3px]"
              />
              <div
                className="text-[#F5BA31] duration-500 text-lg capitalize rounded-md font-semibold flex items-center justify-center menu-animation-hover poppins dark:bg-[#1F1F1F] border border-transparent dark:border-[#555] absolute top-1 right-1"
                onClick={() => bookmarkImage(data.urls.raw)}
              >
                {fetchBookmarked(data.urls.raw) ? (
                  <BsFillBookmarkFill className="text-md span duration-500" />
                ) : (
                  <FiBookmark className="text-md span duration-500" />
                )}
              </div>
            </Btn>
          );
        })}
      </div>
      <div className="loading" ref={loader}>
        <Loader />
      </div>
    </div>
  );
};

export default InfiniteScroll;
