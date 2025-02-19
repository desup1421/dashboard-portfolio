import React from "react";
import EducationTable from "./EducationTable";
import { Link } from "react-router-dom";

const EducationList = () => {
  return (
    <div className="w-full bg-white p-5">
      <div className="w-full flex justify-between">
        <div>
          <h2 className="font-bold text-3xl">Education</h2>
          <span className="text-red-600">Home</span> {'>'}
          <span className="text-red-600">Education</span>
        </div>
        <div>
          <Link to={'/dashboard/education/add'} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            Add New Education
          </Link>
        </div>
      </div>
      <div>
        <EducationTable />
      </div>
    </div>
  );
};

export default EducationList;
