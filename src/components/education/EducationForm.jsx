import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const EducationForm = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate()

  const handleCencel = () => {
    navigate('/dashboard/education/')
  }




  return (
    <div className="w-full p-5">
      <div className="w-full mb-5 p-4">
        <h2 className="font-bold text-3xl mb-5">{pathname === '/dashboard/education/add' ? "Add  Education" : "Edit Education"}</h2>
        <span className="text-red-600">Home</span> {" > "}
        <span className="text-red-600">Education</span> {" > "}
        <span className="text-red-600">{pathname === '/dashboard/education/add' ? "Add  Education" : "Edit Education"}</span>
      </div>
      <div className="w-full">
        <form>
          <div className="grid lg:grid-cols-2 grid-cols-1">
            <div className="col-span-1 gap-y-2 flex flex-col p-4">
              <label htmlFor="degree" className="font-semibold">
                Degree
              </label>
              <input
                type="text"
                className="w-full p-2 bg-slate-100 focus:outline-gray-400"
              />
            </div>
            <div className="col-span-1 gap-y-2 flex flex-col p-4">
              <label htmlFor="degree" className="font-semibold">
                Institution
              </label>
              <input
                type="text"
                className="w-full p-2 bg-slate-100 focus:outline-gray-400"
              />
            </div>
            <div className="col-span-1 gap-y-2 flex flex-col p-4">
              <label htmlFor="degree" className="font-semibold">
                Courses
              </label>
              <input
                type="text"
                className="w-full p-2 bg-slate-100 focus:outline-gray-400"
              />
            </div>
            <div className="col-span-1 gap-y-2 flex flex-col p-4">
              <label htmlFor="degree" className="font-semibold">
                Start Date
              </label>
              <input
                type="text"
                className="w-full p-2 bg-slate-100 focus:outline-gray-400"
              />
            </div>
            <div className="col-span-1 gap-y-2 flex flex-col p-4">
              <label htmlFor="degree" className="font-semibold">
                End Date
              </label>
              <input
                type="text"
                className="w-full p-2 bg-slate-100 focus:outline-gray-400"
              />
            </div>
          </div>
          <div className="flex  justify-end items-center gap-x-3 mt-4 p-4">
            <button onClick={handleCencel} className="cursor-pointer  border px-10 py-2 bg-white text-red-500 rounded hover:bg-red-200 transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            {pathname === '/dashboard/education/add' ? "Add  Education" : "Save Education"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationForm;
