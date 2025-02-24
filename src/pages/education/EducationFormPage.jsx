import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useAddEducationMutation,
  useGetEducationQuery,
  useUpdateEducationMutation,
} from "../../store/slices/educationSlice";
import { EducationForm } from "../../components";

const EducationFormPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const path = pathname.split("/").pop();
  const [addEducation] = useAddEducationMutation();
  const [updateEducation] = useUpdateEducationMutation();

  const { data: item } = useGetEducationQuery();
  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    courses: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (id && item?.data) {
      const educationData = item.data.find((edu) => edu._id === id);
      if (educationData) {
        setFormData({
          degree: educationData.degree,
          institution: educationData.institution,
          courses: educationData.courses,
          startDate: educationData.startDate,
          endDate: educationData.endDate,
        });
      }
    }
  }, [id, item]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (path == id) {
        await updateEducation({ id, ...formData }).unwrap();
        navigate("/dashboard/education")
      }
      await addEducation(formData).unwrap();
      navigate("/dashboard/education"); 
    } catch (error) {
      console.log("Failed to create education : ", error);
    }
  };

  return (
    <div className="w-full p-5">
      <div className="w-full mb-5 p-4">
        <h2 className="font-bold text-3xl mb-5">
          {path === id ? "Edit Education" : "Add  Education"}
        </h2>
        <Link to={'/dashboard'} className="text-red-600">Home</Link> {" > "}
        <Link to={'/dashboard/education'} className="text-red-600">Education</Link> {" > "}
        <Link to={path === id ? `/dashboard/education/edit/${id}` : "/dashboard/education/add"} className="text-red-600">
          {path === id ? "Edit Education" : "Add  Education"}
        </Link>
      </div>
      <div className="w-full">
        <EducationForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formData={formData}
          path={path}
          id={id}
         />
      </div>
    </div>
  );
};

export default EducationFormPage;
