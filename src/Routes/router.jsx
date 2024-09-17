
import { createBrowserRouter } from "react-router-dom";

import Main from "../Layout/Main";
import RouteNotFound from "../Pages/RouteNotFound";

import Home from "../Pages/Home/Home";

import CreateAccount from "../Pages/Auth/CreateAccount/CreateAccount";
import Login from "../Pages/Auth/Login/Login";

import CompanyDetails from "../Pages/CompanyDetails/CompanyDetails";



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
        path: "/company-details",
        element: <CompanyDetails />,
      },
    ],
  },
  {
    path: "/register",
    element: <CreateAccount />,
  },
  {
    path: "/login",
    element: <Login />,
  }
]);
