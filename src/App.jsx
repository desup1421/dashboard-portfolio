import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { ContactPage, HomePage, ProjectPage, RegisterPage } from "@pages";
import EducationPage from "./pages/education/EducationPage";
import AddEducation from "./components/education/EducationForm";
import EducationFormPage from "./pages/education/EducationFormPage";

const routes = [
  {
    path: "/",
    element: <RegisterPage />,
  },
];

const protectedRoutes = [
  {
    path: "contact",
    element: <ContactPage />,
  },
  {
    path: "project",
    element: <ProjectPage />,
  },
  {
    path: "education",
    element: <EducationPage />,
  },
  {
    path: "education/add",
    element: <EducationFormPage />,
  },
  {
    path: "education/edit/:id",
    element: <EducationFormPage />,
  },
];

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-surface-background">
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} element={element} path={path} />
          ))}

          <Route element={<ProtectedLayout />} path="/dashboard">
            <Route index element={<HomePage />} />

            {protectedRoutes.map(({ path, element }) => (
              <Route key={path} element={element} path={path} />
            ))}
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
