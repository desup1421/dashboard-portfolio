import React from "react";
import {Link} from "react-router-dom"
import PropTypes from "prop-types";

const EducationForm = ({ handleSubmit, handleChange, formData, path,id }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid lg:grid-cols-2 grid-cols-1">
        <div className="col-span-1 gap-y-2 flex flex-col p-4">
          <label htmlFor="degree" className="font-semibold">
            Degree
          </label>
          <input
            type="text"
            name="degree"
            onChange={handleChange}
            value={formData.degree}
            className="w-full p-2 bg-slate-200 rounded focus:outline-gray-400"
          />
        </div>
        <div className="col-span-1 gap-y-2 flex flex-col p-4">
          <label htmlFor="institution" className="font-semibold">
            Institution
          </label>
          <input
            type="text"
            name="institution"
            onChange={handleChange}
            value={formData.institution}
            className="w-full p-2 bg-slate-200 rounded focus:outline-gray-400"
          />
        </div>
        <div className="col-span-1 gap-y-2 flex flex-col p-4">
          <label htmlFor="courses" className="font-semibold">
            Courses
          </label>
          <input
            type="text"
            name="courses"
            onChange={handleChange}
            value={formData.courses}
            className="w-full p-2 bg-slate-200 rounded focus:outline-gray-400"
          />
        </div>
        <div className="col-span-1 gap-y-2 flex flex-col p-4">
          <label htmlFor="starDate" className="font-semibold">
            Start Date
          </label>
          <input
            value={formData.startDate}
            type="date"
            name="startDate"
            onChange={handleChange}
            className="w-full p-2 bg-slate-200 rounded focus:outline-gray-400"
          />
        </div>
        <div className="col-span-1 gap-y-2 flex flex-col p-4">
          <label htmlFor="endDate" className="font-semibold">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            onChange={handleChange}
            value={formData.endDate}
            className="w-full p-2 bg-slate-200 rounded focus:outline-gray-400"
          />
        </div>
      </div>
      <div className="flex  justify-end items-center gap-x-3 mt-4 p-4">
        <Link
          to={"/dashboard/education"}
          className="cursor-pointer  border px-10 py-2 bg-white text-red-500 rounded hover:bg-red-200 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          {path === id ? "Save Education" : "Add  Education"}
        </button>
      </div>
    </form>
  );
};


EducationForm.prototype = {
  handleSubmit : PropTypes.func.isRequired,
  handleChange : PropTypes.func.isRequired,
  formData : PropTypes.object.isRequired,
  path : PropTypes.string.isRequired,
  id : PropTypes.string.isRequired
}

export default EducationForm;
