import { createBrowserRouter } from "react-router-dom";

import Main from "../Layout/Main";
import RouteNotFound from "../Pages/RouteNotFound";

import Home from "../Pages/Home/Home";
import CreateAccount from "../Pages/Auth/CreateAccount/CreateAccount";
import Login from "../Pages/Auth/Login/Login";

import CompanyDetails from "../Pages/CompanyDetails/CompanyDetails";
import About from "../Pages/About";
import AdvancedSearch from "../Pages/AdvancedSearch/AdvancedSearch";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <RouteNotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "company-details", 
        element: <CompanyDetails />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/advanced-search",
        element: <AdvancedSearch />,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,  // Use AuthLayout for auth-related routes
    children: [
      {
        path: "/register",
        element: <CreateAccount />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
 
]);
