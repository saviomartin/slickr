import React, { useState, useEffect } from "react";

import axios from "axios"; // axios
import toast from "react-hot-toast"; // toast
import Btn from "../utils/Btn"; // material-ui
import NotFound from "./NotFound";

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

  // changing appearence of button
  const onDragEnter = (e) => {
    document.getElementById("fileInput").classList.add("dragover");
  };
  const onDragLeave = (e) => {
    document.getElementById("fileInput").classList.remove("dragover");
  };

  // getting base 64 and upload to imggur
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

  // basic checking
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

  // adding image to editor
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
            className="custom-file-input"
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
              className="h-[130px] w-[145px] rounded-[3px]"
            />
          </Btn>
        ))}
        {images.length === 0 && (
          <NotFound
            heading="No Uploads Found"
            description="Please Upload an image to see it here"
          />
        )}
      </div>
    </div>
  );
};

export default UploadArea;
