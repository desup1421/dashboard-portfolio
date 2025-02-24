import { useEffect, useState } from "react";
import { ChevronLeft, Calendar, Upload, ImageIcon, Trash2 } from "lucide-react";
import { useGetSkillQuery } from "../../store/slices/skillSlice";
import { useLocation } from "react-router-dom";
import PropsType from "prop-types";

const SkillForm = ({
  formData,
  handleDragOver,
  handleDrop,
  handleImageUpload,
}) => {
  return (
    <div className=" w-full p-4 md:p-6">
      <div className="">
        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="grid gap-6 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Level */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Level</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Logo</label>
              <div
                className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <Upload className="h-10 w-10 text-gray-400" />
                <div className="mt-4 text-center">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer text-red-500 hover:text-red-600"
                  >
                    Click to upload
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <span className="text-gray-500"> or drag and drop</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">SVG, PNG, JPG</p>
                <p className="text-sm text-gray-500">(max, 800x400px)</p>
              </div>
            </div>

            {/* File Preview */}
            {logo && (
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                <div className="flex items-center gap-3">
                  <ImageIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-sm">{formData.logo}</span>
                </div>
                <button
                  onClick={() => setLogo(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SkillForm.prototype = {
  formData: PropsType.object.isRequired,
  handleDrop: PropsType.func.isRequired,
  handleDragOver: PropsType.func.isRequired,
  handleImageUpload: PropsType.func.isRequired,
};

export default SkillForm;
