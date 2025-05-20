"use client";

import { useEffect, useCallback } from "react";

export default function ImageUploader() {
  // food for thought: how should the pasting interaction look like?
  // should it be that any paste would upload an image, or should it be that you
  // have to be focussed on the field first, and copy and pasting after that would
  // upload the copied image

  const displayUploadedImage = (image: File) => {
    const imageDisplayField = document.getElementById(
      "uploaded-main-image-preview"
    );

    if (!imageDisplayField) {
      return;
    }

    if (imageDisplayField instanceof HTMLImageElement) {
      imageDisplayField.src = URL.createObjectURL(image);
    }
  };

  const imagePasteHandler = useCallback(
    (e: ClipboardEvent, imageUploadElement: HTMLElement) => {
      console.log("upload detected");
      // take the newest image on the clipboard
      const latestImages = e.clipboardData?.files;

      console.log(latestImages);

      if (!latestImages || latestImages.length === 0) {
        return;
      }

      displayUploadedImage(latestImages[0]);

      if (imageUploadElement instanceof HTMLInputElement) {
        imageUploadElement.files = latestImages;
      }
    },
    []
  );

  useEffect(() => {
    const imageUploadElement = document.getElementById("main-image-upload");

    imageUploadElement?.addEventListener("paste", (e) =>
      imagePasteHandler(e, imageUploadElement)
    );

    return () => {
      imageUploadElement?.removeEventListener("paste", (e) =>
        imagePasteHandler(e, imageUploadElement)
      );
    };
  }, [imagePasteHandler]);

  return (
    <div className="flex flex-col gap-3">
      <img alt="uploadedMainImage" id="uploaded-main-image-preview"></img>

      <input
        type="file"
        name="mainImageUpload"
        accept="image/*"
        id="main-image-upload"
      />
    </div>
  );
}
