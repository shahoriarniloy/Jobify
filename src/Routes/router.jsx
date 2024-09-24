import { createBrowserRouter } from "react-router-dom";

import Main from "../Layout/Main";
import RouteNotFound from "../Pages/RouteNotFound";
import Home from "../Pages/Home/Home";
import CreateAccount from "../Pages/Auth/CreateAccount/CreateAccount";
import Login from "../Pages/Auth/Login/Login";
import AdvancedSearch from "../Pages/AdvancedSearch/AdvancedSearch";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import BookmarkedJobs from "../Pages/AdvancedSearch/BookmarkedJobs";
import SingleJob from "../Pages/SingleJob/SingleJob";
import PostJob from "../Pages/Dashboard/Company/PostJob";
import MyJob from "../Pages/Dashboard/Company/MyJob";


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
    path: "/dashboard",
    element: <Dashboard />,  // Dashboard as the main route
    children: [
      {
        path: "postJob",
        element: <PostJob></PostJob> ,// Nested under Dashboard
      },
      {
        path: "myJob",
        element: <MyJob></MyJob>,  // Nested under Dashboard
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
        path: "/bookmarked-jobs",
        element: <BookmarkedJobs />,
      },
      {
        path: "/job",
        element: <SingleJob />,
      },
    ],
  },
]);
