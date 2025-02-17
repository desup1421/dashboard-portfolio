import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { HomePage, LoginPage, SignUpPage, HeroPage, EducationPage, ProjectPage, SkillPage, ContactPage } from "@pages";

const routes = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
];

const protectedRoutes = [
  {
    path: "hero",
    element: <HeroPage />,
  },
  {
    path: "education",
    element: <EducationPage />,
  },
  {
    path: "project",
    element: <ProjectPage />,
  },
  {
    path: "skill",
    element: <SkillPage />,
  },
  {
    path: "contact",
    element: <ContactPage />,
  },
]

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#F4F5F9]">
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
