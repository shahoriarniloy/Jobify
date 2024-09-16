import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Navbar';
import Navbar from '../Pages/Shared/Footer';

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