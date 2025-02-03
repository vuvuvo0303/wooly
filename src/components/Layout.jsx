import Navbar from "./Header/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function Layout() {
    return (
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;
