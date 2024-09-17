import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import RouteNotFound from "../Pages/RouteNotFound";
import Home from "../Pages/Home";
import CreateAccount from "../Pages/Auth/CreateAccount/CreateAccount";
import Login from "../Pages/Auth/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <RouteNotFound></RouteNotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      }


    ]
  },
  ,
  {
    path: "/register",
    element: <CreateAccount />
  }, {
    path: "/login",
    element: <Login />
  }

]);