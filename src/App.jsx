import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { ContactPage, HomePage, ProjectPage, RegisterPage } from "@pages";

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
