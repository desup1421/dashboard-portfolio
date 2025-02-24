import React, { useState, useRef, useEffect } from "react";
import { X, Upload } from "lucide-react";

const ProductUploadForm = () => {
  const [images, setImages] = useState([]);
  const [defaultImage, setDefaultImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Electronic",
    sku: "",
    stock: "",
    price: "",
    description: "",
    images: [],
  });

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

  console.log(images);
  console.log(formData);

  useEffect(() => {
    setFormData({ ...formData, images: images.map((image) => image.file) });
  }, [ images]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <button className="text-gray-400">
          <X size={24} />
        </button>
        <h1 className="text-xl font-semibold ml-2">Edit Product</h1>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg bg-gray-50"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Category
            </label>
            <select
              className="w-full p-2 border rounded-lg bg-gray-50"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option>Electronic</option>
              <option>Clothing</option>
              <option>Food</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SKU Product
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg bg-gray-50"
              value={formData.sku}
              onChange={(e) =>
                setFormData({ ...formData, sku: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Varian
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Warna"
                className="flex-1 p-2 border rounded-lg bg-gray-50"
              />
              <input
                type="text"
                placeholder="Size"
                className="flex-1 p-2 border rounded-lg bg-gray-50"
              />
              <button className="p-2 rounded-full bg-red-100 text-red-500">
                <div className="w-6 h-6 flex items-center justify-center">
                  +
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Product Stock
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg bg-gray-50"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg bg-gray-50"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <div className="border rounded-lg bg-gray-50">
            <div className="border-b p-2 bg-white">
              <div className="flex gap-2">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M13 5h-2v4H7v2h4v4h2v-4h4v-2h-4z"
                    />
                    <path
                      fill="currentColor"
                      d="M3 3v18h18V3H3zm16 16H5V5h14v14z"
                    />
                  </svg>
                </button>
                <button className="p-1 hover:bg-gray-100 rounded font-bold">
                  B
                </button>
                <button className="p-1 hover:bg-gray-100 rounded italic">
                  I
                </button>
                <button className="p-1 hover:bg-gray-100 rounded underline">
                  U
                </button>
                <div className="h-6 w-px bg-gray-300 mx-1"></div>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M4 9h16v2H4zm0 4h16v2H4z" />
                  </svg>
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M4 8h16v2H4zm0 4h16v2H4zm0 4h16v2H4z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <textarea
              className="w-full p-4 min-h-[200px] bg-transparent"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Type your description here..."
            />
          </div>
        </div>

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

        <div
          className="grid grid-cols-5 gap-4"
          value={formData.images}
          onChange={() => setFormData({ ...formData, images: images })}
        >
          {images.map((image, index) => (
            <div key={index} className="relative">
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
          <button
            className="px-6 py-2 rounded-lg bg-red-500 text-white"
            onClick={() => console.log(formData)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductUploadForm;
