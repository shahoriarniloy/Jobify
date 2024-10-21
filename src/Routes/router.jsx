import { createBrowserRouter } from "react-router-dom";

import Main from "../Layout/Main";
import RouteNotFound from "./RouteNotFound";

import Candidates from "../Pages/Dashboard/Company/Candidates/Candidates";

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
import Messages from "../Pages/Dashboard/Employee/Message/Messages";
import MessageDetail from "../Pages/Dashboard/Employee/Message/MessageDetail";

// import JobTable from "../Pages/Dashboard/Company/MyJob";

import EmployeeHome from "../Pages/Dashboard/Company/EmployeeHome";
import Home from "../Pages/Home/Home";
import JobTable from "../Pages/Dashboard/Company/MyJob";
import CompanySettings from "../Pages/Dashboard/Company/CompanySettings/CompanySettings";
import EmployeeSettings from "../Pages/Dashboard/Employee/EmployeeAccountSettings/EmployeeSettings";
import AppliedCandidates from "../Pages/Dashboard/Company/Candidates/AppliedCandidates";
import Overview from "../Pages/Dashboard/Company/Overview";
import PostStatus from "../Pages/Posts/PostStatus";
import Posts from "../Pages/Posts/Posts";
import Comments from "../Pages/Posts/Comments";
import FindJobSeeker from "../Pages/FindJobSeeker/FindJobSeeker";
import Inbox from "../Pages/Dashboard/Employee/Message/Inbox";
import CompanyOverview from "../Pages/Dashboard/Company/CompanyOverview";
import AllJobs from "../Pages/Dashboard/Admin/AllJobs";
import AllCompanies from "../Pages/Dashboard/Admin/AllCompanies";
import AllJobSeekers from "../Pages/Dashboard/Admin/AllJobSeekers";
import AdminOverview from "../Pages/Dashboard/Admin/AdminOverview";
import AdminLayout from "../Pages/Dashboard/Admin/AdminLayout";
import Room from "../Pages/Room/Room";
import ResumeForm from "../Pages/Dashboard/Employee/ResumeBuilder/ResumeForm";
import Resume from "../Pages/Dashboard/Employee/ResumeBuilder/Resume";
import ResumeBuilder from "../Pages/Dashboard/Employee/ResumeBuilder/ResumeBuilder";
import EmployeeDashboard from "../Pages/Dashboard/Employee/EmployeeDashboard";
import CandidateResume from "../Pages/Dashboard/Company/Candidates/CandidateResume";
import FavoriteCompany from "../Pages/FavoriteCompany/FavoriteCompany";

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
        path: "/favorite-company",
        element: <FavoriteCompany />,
      },

      {
        path: "/company/:email/jobs",
        element: <CompanyJobs />,
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
        path: "/myjobs",
        element: <JobTable />,
      },

      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/comments/:postId",
        element: <Comments />,
      },
      {
        path: "/find-job-seekers",
        element: <FindJobSeeker />,
      },
      {
        path: "/messages",
        element: <Messages></Messages>,
      },
      {
        path: "/inbox/:otherPartyEmail",
        element: <Inbox></Inbox>,
      },
      {
        path: "/messages/:otherPartyEmail",
        element: <MessageDetail></MessageDetail>,
      },

      // {
      //   path: "/resume-builder",
      //   element: <ResumeBuilder></ResumeBuilder>,
      // },
    ],
  },
  {
    path: "/rooms/:roomID",
    element: <Room />,
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
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "user-overview",
            element: <EmployeeHome />,
          },
          {
            path: "overview",
            element: <CompanyOverview />,
          },
          {
            path: "applied-jobs",
            element: <AppliedJobs />,
          },
          {
            path: "postJob",
            element: <PostJob></PostJob>,
          },
          {
            path: "myjob",
            element: <MyJob></MyJob>,
          },
          {
            path: "job-candidates",
            element: <AppliedCandidates></AppliedCandidates>,
          },
          {
            path: "candidates",
            element: <Candidates></Candidates>,
          },
          {
            path: "candidate-resume/:email",
            element: <CandidateResume></CandidateResume>,
          },

          {
            path: "company-settings",
            element: <CompanySettings />,
          },
        ],
      },

      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            path: "alljobs",
            element: <AllJobs />,
          },
          {
            path: "allcompanies",
            element: <AllCompanies />,
          },
          {
            path: "alljobseekers",
            element: <AllJobSeekers />,
          },
          {
            path: "overview",
            element: <AdminOverview />,
          },
        ],
      },

      {
        path: "/jobSeeker",
        element: <EmployeeDashboard />,
        children: [
          {
            path: "overview",
            element: <EmployeeHome />,
          },
          {
            path: "appliedjobs",
            element: <AppliedJobs />,
          },
          {
            path: "favorite-jobs",
            element: <BookmarkedJobs />,
          },
          {
            path: "resume-builder",
            element: <ResumeForm></ResumeForm>,
          },
          {
            path: "resume/:email",
            element: <Resume></Resume>,
          },
          {
            path: "employee-settings",
            element: <EmployeeSettings />,
          },
        ],
      },
    ],
  },
]);
