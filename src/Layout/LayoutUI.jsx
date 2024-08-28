import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";


export default function LayoutUI() {
  return (
    <div className="bg-secondary md:min-h-[100vh]">
         <div className="h-[80px]">
         <Navbar></Navbar>
         </div>
         <Outlet></Outlet>
    </div>
  )
}
