import React, { useState, useRef } from "react";
import { X, Upload, GripHorizontal } from "lucide-react";

const ProductUploadForm = () => {
  const [images, setImages] = useState([]);
  const [defaultImage, setDefaultImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Electronic",
    sku: "",
    stock: "",
    price: "",
    description: "",
  });

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
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
    if (!defaultImage && newImages.length > 0) {
      setDefaultImage(newImages[0]);
    }
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
      }
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    if (defaultImage === images[index]) {
      setDefaultImage(images[0] === images[index] ? images[1] : images[0]);
    }
    URL.revokeObjectURL(images[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const setAsDefault = (index) => {
    setDefaultImage(images[index]);
  };

  // Rest of the component remains the same until the image gallery
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Previous form fields remain the same */}
      {/* <div className="flex items-center mb-6">
        <button className="text-gray-400">
          <X size={24} />
        </button>
        <h1 className="text-xl font-semibold ml-2">Edit Product</h1>
      </div> */}

      <div className="space-y-6">
        {/* ... other form fields ... */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Photo
          </label>
          <div
            className={`border-2 border-dashed ${
              isDragging ? "border-red-500 bg-red-50" : "border-gray-300"
            } rounded-lg p-8 text-center cursor-pointer`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileInput}
            />
            <Upload className="mx-auto text-gray-400 mb-2" />
            <p className="text-red-500">Click to upload</p>
            <p className="text-gray-500">or drag and drop</p>
            <p className="text-gray-500">SVG, PNG, JPG</p>
            <p className="text-gray-400">(max. 800x400px)</p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group bg-white rounded-lg shadow"
              draggable
              onDragStart={(e) => handleImageDragStart(e, index)}
              onDragEnd={handleImageDragEnd}
              onDragOver={(e) => handleImageDragOver(e, index)}
            >
              <div className="cursor-move absolute top-2 left-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <GripHorizontal size={16} />
              </div>
              <img
                src={image.preview}
                alt={`Preview ${index}`}
                className="w-full aspect-square object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-white rounded-full p-1"
              >
                <X size={16} />
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

        <div className="flex justify-end gap-4">
          <button className="px-6 py-2 rounded-lg border border-gray-300">
            Cancel
          </button>
          <button className="px-6 py-2 rounded-lg bg-red-500 text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductUploadForm;
