
import { Outlet } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from '../components/Navbar'
function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-white ">
      <Navbar />
     <Outlet/>
      <Footer />
    </div>
  );
}

export default Layout;
