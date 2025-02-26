import React, { useState, useRef, useEffect } from "react";

import { Download, Trash } from "@icons";

const Dropzone = ({
  label = "Upload",
  data = [],
  setData = () => {},
  multiple = true,
  cover = "",
  setCover = () => {},
}) => {
  const [images, setImages] = useState(data);
  const [defaultImage, setDefaultImage] = useState(cover);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const fileInputRef = useRef(null);

  // File Upload Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/")
    );
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    if (multiple) {
      setImages((prev) => [...prev, ...newImages]);
    } else {
      setImages([...newImages]);
    }
    // setImages((prev) => [...prev, ...newImages]);
    if (!defaultImage && newImages.length > 0) {
      setDefaultImage(newImages[0]);
      setCover(0);
    }
    // Add the new images to the data
  };

  // Image Reordering Handlers
  const handleImageDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    // Make the drag preview transparent
    e.target.style.opacity = "0.5";
  };

  const handleImageDragEnd = (e) => {
    setDraggedIndex(null);
    e.target.style.opacity = "1";
  };

  const handleImageDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    if (draggedIndex !== index) {
      const newImages = [...images];
      const draggedImage = newImages[draggedIndex];
      // Remove dragged item
      newImages.splice(draggedIndex, 1);
      // Insert at new position
      newImages.splice(index, 0, draggedImage);
      setImages(newImages);
      setDraggedIndex(index);

      // Update default image reference if it was moved
      if (defaultImage === images[draggedIndex]) {
        setDefaultImage(draggedImage);
        setCover(draggedIndex);
      }
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    if (defaultImage === images[index]) {
      setDefaultImage(images[0] === images[index] ? images[1] : images[0]);
      setCover(0);
    }
    URL.revokeObjectURL(images[index].url);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const setAsDefault = (index) => {
    setDefaultImage(images[index]);
    setCover(index);
  };

  useEffect(() => {
    // const data = images.map((image) =>
    //   image instanceof Object ? image.file : image
    // );
    setData(images);

  }, [images]);

  return (
    <>
      <div className=" border border-surface-border bg-surface-background py-3 px-4 rounded-lg space-y-3 flex flex-col">
        <label className="text-sm self-start" htmlFor="image">
          {label}
        </label>
        <div
          className={`border-dashed border-2 border-primary rounded-md flex flex-col items-center justify-center text-sm py-2 cursor-pointer ${
            isDragging ? "bg-[#F4F5F7]" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            className="hidden"
            type="file"
            ref={fileInputRef}
            accept="image/*"
            multiple={multiple}
            onChange={handleFileInput}
            name="image"
            id="image"
          />
          <Download />
          <p className="pt-2">
            <span className="text-primary">Click to Upload</span> or drag and
            drop
          </p>
          <p>SVG, PNG, JPG</p>
          <p className="text-[#89868D]">(max, 800x400px)</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group bg-white rounded-lg shadow"
            draggable
            onDragStart={(e) => handleImageDragStart(e, index)}
            onDragEnd={handleImageDragEnd}
            onDragOver={(e) => handleImageDragOver(e, index)}
          >
            <img
              src={image instanceof Object ? image.url : image}
              alt={`Preview ${index}`}
              className="w-full aspect-square object-cover rounded-lg"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 bg-white rounded-full p-1"
              type="button"
            >
              <Trash />
            </button>
            {defaultImage === image ? (
              <div className="absolute bottom-2 left-2 bg-purple-500 text-white text-xs px-2 py-1 rounded">
                Default
              </div>
            ) : (
              <button
                onClick={() => setAsDefault(index)}
                className="absolute bottom-2 left-2 bg-black text-white text-xs px-2 py-1 rounded"
              >
                Set as default image
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Dropzone;
