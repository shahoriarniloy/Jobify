import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import RouteNotFound from "../Pages/RouteNotFound";
import Home from "../Pages/Home";
import Candidates from "../Pages/Candidates/Candidates";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <RouteNotFound></RouteNotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/candidates",
        element: <Candidates></Candidates>,
      }
    ],
  },
]);
