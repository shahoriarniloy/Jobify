import { Outlet } from 'react-router-dom';
import Navbar from '../../Shared/Navbar';
import Navbar2 from '../../Shared/Navbar2';
import Footer from '../../Shared/Footer';

const AuthLayout = () => {
    return (
        <div className=' bg-[#F1F2F4]'>
             {/* <Navbar></Navbar> */}
             <Navbar2></Navbar2>
            <div className="auth-container lg:px-24 md:px-12 px-4">
           

                <Outlet />
            </div>
            <Footer />

        </div>
    );
};

export default AuthLayout;
