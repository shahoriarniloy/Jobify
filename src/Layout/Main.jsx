import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer';
import Navbar from '../Pages/Shared/Navbar';

const Main = () => {

    return (
        <div className='roboto-regular bg-[#f1f2f4] '>
            <Navbar />
            <div className='lg:px-24 '>
               <Outlet />
            </div>
            <Footer /> 

            
        </div>
    );
};

export default Main;
