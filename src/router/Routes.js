import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as AppRoutes,
  Navigate,
} from "react-router-dom";
import { RouteNames } from "./RouteNames";

//import pages and layouts
import Homepage from "../pages/Homepage";
import CreateTask from "../pages/CreateTask";
import Contact from "../pages/Contact";
import HeaderView from "../components/common/HeaderView";
import FooterView from "../components/common/FooterView";
import Registration from "../components/accounts/registration/Registration";
import Login from "../components/accounts/login/Login";
import ProjectDetails from "../pages/ProjectDetails";
import ProtectedRoutes from "./ProtectedRoutes";

const Routes = () => {
  return (
    <Router>
      <div className="routes">
        <HeaderView />
        <AppRoutes>
          <Route path={RouteNames.Login} element={<Login />} />
          <Route path={RouteNames.Register} element={<Registration />} />
          <Route element={<ProtectedRoutes />}>
            <Route path={RouteNames.HomePage} element={<Homepage />} />
            <Route path={RouteNames.CreateTask} element={<CreateTask />} />
            <Route path={RouteNames.UpdateTask} element={<CreateTask />} />
            <Route path={RouteNames.Contact} element={<Contact />} />
            <Route
              path={RouteNames.ProjectDetails}
              element={<ProjectDetails />}
            />
            <Route
              path={RouteNames.ProjectRequirements}
              element={<ProjectDetails />}
            />
            <Route path={RouteNames.Registration} element={<Registration />} />
          </Route>
          <Route
            path="*"
            element={<Navigate to={RouteNames.Login} replace />}
          />
        </AppRoutes>
        <FooterView />
      </div>
    </Router>
  );
};

export default Routes;
