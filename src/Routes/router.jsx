import { createBrowserRouter } from "react-router-dom";

import Main from "../Layout/Main";
import RouteNotFound from "./RouteNotFound";

import Candidates from "../Pages/Dashboard/Company/Candidates/Candidates";

import Home from "../Pages/Home/Home";
import CreateAccount from "../Pages/Auth/CreateAccount/CreateAccount";
import Login from "../Pages/Auth/Login/Login";


import CompanyDetails from "../Pages/FindCompany/CompanyDetails/CompanyDetails";

import About from "../Pages/About/About"
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import EmployeeHome from "../Pages/Dashboard/Employee/EmployeeHome";
import AppliedJobs from "../Pages/Dashboard/Employee/AppliedJobs";
// import FavoriteJobs from "../Pages/Dashboard/Employee/FavoriteJobs";


import AdvancedSearch from "../Pages/Find Job/AdvancedSearch";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import BookmarkedJobs from "../Pages/Dashboard/Employee/BookmarkedJobs";
import SingleJob from "../Pages/Find Job/SingleJob";
import FindCompany from "../Pages/FindCompany/FindCompany";

import PostJob from "../Pages/Dashboard/Company/PostJob";
import MyJob from "../Pages/Dashboard/Company/MyJob";
import CompanyJobs from "../Pages/FindCompany/CompanyDetails/CompanyJobs"




export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <RouteNotFound />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      
      {
        path: "company-details/:companyId", 
        element: <CompanyDetails />,
      },
      {

        path: "/about",
        element: <About />,
      },
      {
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
      {
        path: "/companies",
        element: <FindCompany />,
      },
      {
        path: "/job/:id",
        element: <SingleJob/> ,

      },
      {
        path: "/candidates",
        element: <Candidates/> ,

      },
    ],
  },
  // {
  //   path: "/dashboard",
  //   element: <Dashboard />, 
  //   children: [
  //     {
  //       path: "/postJob",
  //       element: <PostJob></PostJob> ,
  //     },
  //     {
  //       path: "/myJob",
  //       element: <MyJob></MyJob>, 
  //     },
  //   ],
  // },
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
            element:<BookmarkedJobs/>
          },
          {
            path: "/dashboard/postJob",
            element: <PostJob></PostJob> ,
          },
          {
            path: "/dashboard/myJob",
            element: <MyJob></MyJob>,  
          },
          {
            path: "/dashboard/candidates",
            element: <Candidates></Candidates>,
           
          },

        ]

      }
    ],
  },

]);
