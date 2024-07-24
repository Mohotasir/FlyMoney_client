
import {
    createBrowserRouter,
  } from "react-router-dom";
import LayoutUI from "../Layout/LayoutUI";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import DashBoardLayout from "../Layout/DashBoardLayout";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutUI></LayoutUI>,
      //errorElement:<Error></Error>,
      children:[
        {
            path: "/",
            element:<Login></Login>
        },
         {
            path:"/register",
             element:<Register></Register>
         },
    ]
    },
    {
      path:"/dashboard",
      element:<DashBoardLayout></DashBoardLayout>,
      children:[
       
      ]
    }
  ]);