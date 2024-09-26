import { createBrowserRouter } from "react-router-dom";

import Main from "../Layout/Main";
import RouteNotFound from "../Pages/RouteNotFound";

import Home from "../Pages/Home/Home";
import CreateAccount from "../Pages/Auth/CreateAccount/CreateAccount";
import Login from "../Pages/Auth/Login/Login";

import CompanyDetails from "../Pages/CompanyDetails/CompanyDetails";

import About from "../Pages/About"
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import EmployeeHome from "../Pages/Dashboard/Employee/EmployeeHome";
import AppliedJobs from "../Pages/Dashboard/Employee/AppliedJobs";
import FavoriteJobs from "../Pages/Dashboard/Employee/FavoriteJobs";

import AdvancedSearch from "../Pages/AdvancedSearch/AdvancedSearch";

import AuthLayout from "../Layout/AuthLayout/AuthLayout";

import CompanyJobs from "../Pages/CompanyDetails/CompanyJobs";
import BookmarkedJobs from "../Pages/AdvancedSearch/BookmarkedJobs";
import SingleJob from "../Pages/SingleJob/SingleJob";




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
        path: "company-details/:companyId", 
        element: <CompanyDetails />,
      },
      {

        path: "/about",
        element: <About />,
        path: "/company/:companyId/jobs", 
        element: <CompanyJobs />,
      },
      {
        path: "/register",
        element: <CreateAccount />,
      },
      {
        path: "/advanced-search",
        element: <AdvancedSearch />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,  
    children: [
      {
        path: "/register",
        element: <CreateAccount />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {

        path: "/about",
        element: <About />,

        path: "/bookmarked-jobs",
        element: <BookmarkedJobs/>,
      },
      {
        path: "/job",
        element: <SingleJob/> ,

      },



      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard/overview",
            element: <EmployeeHome />
          },
          {
            path:"/dashboard/applied-jobs",
            element:<AppliedJobs/>
          }
          ,
          {
            path:"/dashboard/favorite-jobs",
            element:<FavoriteJobs/>
          }

        ]
      }
    ],
  },

]);
