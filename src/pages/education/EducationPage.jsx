import React from "react";
import EducationList from "../../components/education/EducationList";
import { useLocation } from "react-router-dom";
import EducationForm from "../../components/education/EducationForm";

const EducationPage = () => {
  const location = useLocation()
  const currentPath = location.pathname
  
  return (
    <>
    {currentPath  == '/dashboard/education/' ? <EducationList /> : <EducationForm />}
    </>
  );
};

export default EducationPage;
