import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Btn from "../utils/Btn";

const UploadArea = ({ children, setChildren }) => {
  const [images, setImages] = useState([]);

  const fetchImages = () => {
    if (window.localStorage.getItem("images")) {
      setImages(JSON.parse(window.localStorage.getItem("images")));
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const onDragEnter = (e) => {
    document.getElementById("fileInput").classList.add("dragover");
  };
  const onDragLeave = (e) => {
    document.getElementById("fileInput").classList.remove("dragover");
  };

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const formData = new FormData();
      formData.append(
        "image",
        reader.result.slice(file.type === "image/png" ? 22 : 23)
      );
      formData.append("name", file.name);
      formData.append("key", process.env.NEXT_PUBLIC_IMGBB_STORAGE_KEY);

      const upload = axios
        .post("https://api.imgbb.com/1/upload", formData)
        .then((data) => {
          if (window.localStorage.getItem("images")) {
            const images = JSON.parse(window.localStorage.getItem("images"));
            window.localStorage.setItem(
              "images",
              JSON.stringify([
                ...images,
                {
                  name: file.name,
                  data: data.data.data.url,
                },
              ])
            );
          } else {
            window.localStorage.setItem(
              "images",
              JSON.stringify([
                {
                  name: file.name,
                  data: data.data.data.url,
                },
              ])
            );
          }

          fetchImages();
        });

      toast.promise(upload, {
        loading: "Uploading...",
        success: `Uploaded ${file.name}.png`,
        error: "Error Uploading File",
      });
    };
  };
  const uploadImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(e.target.files[0]);
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      getBase64(file);
    } else {
      toast.error("File must be png or jpg");
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
    <div className="w-full h-full p-3">
      <Btn className="!w-full">
        <div className="w-full bg-gradient p-[1px] rounded-[4px] text-[#222]">
          <input
            type="file"
            class="custom-file-input"
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDragLeave}
            onChange={uploadImage}
            id="fileInput"
          />
        </div>
      </Btn>
      <div className="mt-2 w-full">
        {images.map((data, key) => (
          <Btn
            className="bg-white !m-1"
            key={key}
            onClick={() => addImage(data.data)}
          >
            <img
              src={data.data}
              className="image"
              alt={data.name}
              className="max-h-[145px] max-w-[145px] rounded-[3px]"
            />
          </Btn>
        ))}
      </div>
    </div>
  );
};

export default UploadArea;
