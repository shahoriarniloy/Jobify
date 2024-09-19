import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";
import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div className='roboto-regular'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            
        </div>
    );
};

export default Main;