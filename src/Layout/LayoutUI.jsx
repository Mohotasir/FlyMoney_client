import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";


export default function LayoutUI() {
  return (
    <div>
         <Navbar></Navbar>
         <Outlet></Outlet>
    </div>
  )
}
