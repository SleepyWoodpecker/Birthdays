"use client";

import { useEffect, useState } from "react";
import GlassContainer from "./GlassContainer";
import { Image as ImagePlaceHolderIcon, X as XIcon } from "lucide-react";

export default function ImageUploader() {
  // food for thought: how should the pasting interaction look like?
  // should it be that any paste would upload an image, or should it be that you
  // have to be focussed on the field first, and copy and pasting after that would
  // upload the copied image
  const [uploadedImageUrl, setUploadedImageUrl] = useState<
    null | string | Blob
  >(null);
  // const [dragActive, setDragActive] = useState(false);
  // const deviceTypeRef = useRef(false);

  const displayUploadedImage = (image: File) => {
    const imageDisplayField = document.getElementById(
      "uploaded-main-image-preview",
    );

    if (!imageDisplayField) {
      return;
    }

    if (!image.type.startsWith("image/")) {
      console.log("Invalid image type");
      return;
    }

    if (imageDisplayField instanceof HTMLImageElement) {
      setUploadedImageUrl(URL.createObjectURL(image));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log(e.dataTransfer.files);
      displayUploadedImage(e.dataTransfer.files[0]);
    }
  };

  const handleUploadButtonClick = () => {
    const fileUploadElement = document.getElementById("main-image-upload");
    if (!fileUploadElement) {
      return;
    }

    fileUploadElement.click();
  };

  const handleFileClickUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("I have been clicked");
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      displayUploadedImage(e.target.files[0]);
    }
  };

  const clearUpload = () => {
    setUploadedImageUrl(null);
  };

  // TODO @Shawn: check the device type. if it is a mac, use command + v. if it is windows use ctrl + v
  useEffect(() => {});

  return (
    <GlassContainer disableHover>
      <div
        className="relative flex h-128 flex-col items-center justify-center gap-4"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {uploadedImageUrl ? (
          <button
            className="absolute top-1 right-1 cursor-pointer rounded-md bg-red-400"
            onClick={clearUpload}
          >
            <XIcon color="#ffffff" strokeWidth={1.25} />
          </button>
        ) : (
          ""
        )}

        {/* TODO: round image, improve proportions on image rounding */}
        <img
          alt="uploadedMainImage"
          id="uploaded-main-image-preview"
          className={`${uploadedImageUrl ? "" : "hidden"} h-96 w-full rounded-md p-5`}
          src={uploadedImageUrl || undefined}
        ></img>

        <ImagePlaceHolderIcon
          size={96}
          color="#bfbec2"
          strokeWidth={1.25}
          className={`${uploadedImageUrl ? "hidden" : ""}`}
        />
        {uploadedImageUrl ? (
          ""
        ) : (
          <div className="m-2 flex flex-col gap-2">
            <button
              className="cursor-pointer rounded-md bg-gray-400"
              onClick={handleUploadButtonClick}
            >
              Browse
            </button>
            <p>or drag and drop</p>
          </div>
        )}

        <input
          type="file"
          name="mainImageUpload"
          accept="image/*"
          id="main-image-upload"
          className="hidden"
          onChange={handleFileClickUpload}
        />
      </div>
    </GlassContainer>
  );
}
