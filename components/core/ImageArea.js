import { TextField } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Btn } from "..";

const InfiniteScroll = ({ children, setChildren }) => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("code");
  const [searchValue, setSearchValue] = useState("code");

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

    axios
      .get(fetchUrl, {
        headers: {},
      })
      .then((response) => {
        setData([...data, ...response.data.results]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  // here we handle what happens when user scrolls to Load More div
  // in this case we just update page variable
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1);
    }
  };

  const searchImages = (e) => {
    if (e.keyCode === 13) {
      setSearchValue(query);
      setData([]);
      setPage(1);
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
        className="w-full epilogue bg-white"
      />
      <div className="flex items-center justify-center flex-wrap w-full h-auto mt-2">
        {data.map((data, key) => (
          <Btn
            className="bg-white !m-1"
            key={key}
            onClick={() => addImage(data.urls.raw)}
          >
            <img
              src={data.urls.small}
              className="image"
              alt={data.alt_description}
              className="h-[145px] w-[145px] rounded-[3px]"
            />
          </Btn>
        ))}
      </div>
      <div className="loading" ref={loader}>
        <h2>Load More</h2>
      </div>
    </div>
  );
};

export default InfiniteScroll;
