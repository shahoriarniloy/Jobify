import { createBrowserRouter } from "react-router-dom";

import Main from "../Layout/Main";
import RouteNotFound from "./RouteNotFound";

import Candidates from "../Pages/Dashboard/Company/Candidates/Candidates";

import Home from "../Pages/Home/Home";
import CreateAccount from "../Pages/Auth/CreateAccount/CreateAccount";
import Login from "../Pages/Auth/Login/Login";

import CompanyDetails from "../Pages/FindCompany/CompanyDetails/CompanyDetails";

import About from "../Pages/About/About";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
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
import CompanyJobs from "../Pages/FindCompany/CompanyDetails/CompanyJobs";
import Messages from "../Pages/Dashboard/Employee/Messages";
import MessageDetail from "../Pages/Dashboard/Employee/MessageDetail";

// import JobTable from "../Pages/Dashboard/Company/MyJob";


import EmployeeHome from "../Pages/Dashboard/Company/EmployeeHome";
import JobTable from "../Pages/Dashboard/Company/MyJob";
import CompanySettings from '../Pages/Dashboard/Company/CompanySettings/CompanySettings';
import EmployeeSettings from "../Pages/Dashboard/Employee/EmployeeAccountSettings/EmployeeSettings";
import AppliedCandidates from "../Pages/Dashboard/Company/Candidates/AppliedCandidates";
import Overview from "../Pages/Dashboard/Company/Overview";
import PostStatus from "../Pages/Posts/PostStatus";
import Posts from "../Pages/Posts/Posts";
import Comments from "../Pages/Posts/Comments";


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
        path: "/company/:email/jobs",
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
        element: <SingleJob />,

      },
      {
        path: "/candidates",
        element: <Candidates />,

      },
      {
        path:"/employee-settings",
        element:<EmployeeSettings/>
      },

      {
        path: "/myjobs",
        element: <JobTable />
      },
      {
        path: "/favorite-jobs",
        element: <BookmarkedJobs />
      },

      {
        path: "/appliedjobs",
        element: <AppliedJobs />,
      },
      {
        path: "/favorite-jobs",
        element: <BookmarkedJobs />,
      },

      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/comments/:postId",
        element: <Comments />,
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
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard/overview",
            element: <EmployeeHome />,
          },
          {
            path: "/dashboard/company-overview",
            element: <Overview />,
          },
          {
            path: "/dashboard/applied-jobs",
            element: <AppliedJobs />,
          },
          {
            path: "/dashboard/postJob",
            element: <PostJob></PostJob>,
          },
          {
            path: "/dashboard/myjob",
            element: <MyJob></MyJob>,
          },
          {
            path: "/dashboard/job-candidates",
            element: <AppliedCandidates></AppliedCandidates>,
          },
          {
            path: "/dashboard/candidates",
            element: <Candidates></Candidates>,
          },

          {
            path: "/dashboard/messages",
            element: <Messages></Messages>,
          },
          {
            path: "/dashboard/messages/:otherPartyEmail",
            element: <MessageDetail></MessageDetail>,

          },

          {
            path: "/dashboard/companySettings",
            element: <CompanySettings/>,

          },
        ],
      },
    ],
  },
]);
