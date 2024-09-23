import { createBrowserRouter } from "react-router-dom";

import Main from "../Layout/Main";
import RouteNotFound from "../Pages/RouteNotFound";

import Home from "../Pages/Home/Home";
import CreateAccount from "../Pages/Auth/CreateAccount/CreateAccount";
import Login from "../Pages/Auth/Login/Login";

import CompanyDetails from "../Pages/CompanyDetails/CompanyDetails";
import  About from "../Pages/About"
import AdvancedSearch from "../Pages/AdvancedSearch/AdvancedSearch";
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
        path: "/company/:companyId/jobs", 
        element: <CompanyJobs />,
      },
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
        element: <About/>,
      },
      {
        path: "/advanced-search",
        element: <AdvancedSearch/>,
      },
      {
        path: "/bookmarked-jobs",
        element: <BookmarkedJobs/>,
      },
      {
        path: "/job",
        element: <SingleJob/> ,
      },
    ],
  },
  
]);
