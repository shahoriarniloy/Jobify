import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer';
import Navbar from '../Shared/Navbar';
import Navbar2 from '../Shared/Navbar2';


const Main = () => {

    return (
        <div className='roboto-regular bg-[#f1f2f4] '>
            <Navbar />
            <Navbar2></Navbar2>
            <div className='lg:px-24 md:px-12 px-4 '>
               <Outlet />
            </div>
            <Footer /> 

            
        </div>
    );
};

export default Main;
