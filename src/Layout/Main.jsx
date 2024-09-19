import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer';
import Navbar from '../Pages/Shared/Navbar';

const Main = () => {

    return (
        <div className='roboto-regular'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;
