import React from "react";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";
import Btn from "../utils/Btn";

const UploadArea = () => {
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
      const fileName = file.name;
      uploadToLocalStorage(reader.result, fileName);
    };
  };

  const uploadToLocalStorage = (file, fileName) => {
    if (localStorage.getItem("files")) {
      const files = JSON.parse(localStorage.getItem("files"));
      localStorage.setItem(
        "files",
        JSON.stringify([
          ...files,
          {
            name: fileName,
            data: file,
          },
        ])
      );
    } else {
      localStorage.setItem(
        "files",
        JSON.stringify([
          {
            name: fileName,
            data: file,
          },
        ])
      );
    }

    toast.success("Successfully Uploaded File");
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
    </div>
  );
};

export default UploadArea;
