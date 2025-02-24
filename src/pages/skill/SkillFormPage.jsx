import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
import { useAddSkillMutation } from "../../store/slices/skillSlice";

const SkillFormPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    image: null,
  });
  const [addSkill] = useAddSkillMutation();

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: acceptedFiles[0],
      }));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/svg+xml": [".svg"],
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxSize: 5000000, // 5MB
    multiple: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("level", formData.level);
  
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    console.log("image", formData.image)  
  
    try {
      await addSkill(formDataToSend).unwrap();
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to create skill : ", error);
    }
  };
  

  const handleCancel = () => {
    setFormData({
      name: "",
      level: "",
      image: null,
    });
  };

  return (
    <div className="w-full mx-auto p-6 ">
      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="flex justify-between items-baseline p-6">
          <header className="space-y-2">
            <h1 className="text-2xl font-bold">Add Skill</h1>
            {/* BREADCRUMB */}
            <p className="flex gap-2 items-center">
              <span className="flex gap-2 items-center">
                <span
                  className="text-primary cursor-pointer text-xs"
                  onClick={() => navigate("/dashboard")}
                >
                  Home
                </span>
                {">"}
                {/* ArrowRightSmall */}
                <span className="text-primary text-xs">Skill</span>
                {">"}
                {/* ArrowRightSmall */}
                <span className="text-primary text-xs">Add Skill</span>
              </span>
            </p>
          </header>
        </div>
        <form onSubmit={handleSubmit} className="">
          <div className="p-6 space-y-6">
            {/* Name and Level inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="level"
                  className="block text-sm font-medium text-gray-700"
                >
                  Level
                </label>
                <input
                  type="text"
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Dropzone */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Logo
              </label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors
                ${
                  isDragActive
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 hover:border-red-500"
                }`}
              >
                <input {...getInputProps()} type="file" />
                <div className="flex flex-col items-center justify-center text-center">
                  <svg
                    className="w-12 h-12 text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-sm">
                    <span className="text-red-500 hover:text-red-600">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-sm text-gray-500 mt-1">SVG, PNG, JPG</p>
                  <p className="text-sm text-gray-500">(max, 800x400px)</p>
                </div>
              </div>
            </div>


            {/* File Preview */}
            {formData.image && (
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm">{formData.image.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, image: null }))
                  }
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Link
                to={"/dashboard/skill"}
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillFormPage;
