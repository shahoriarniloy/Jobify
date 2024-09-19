import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Navbar';
import Navbar from '../Pages/Shared/Footer';
import useCurrentUser from '../Hooks/useCurrentUser';

const Main = () => {
    const { currentUser } = useCurrentUser();
    if (!currentUser?.email) return <div className='flex justify-center items-center min-h-screen'><span className="loader"></span></div>
    return (
        <div className='roboto-regular'>

            <Navbar></Navbar>
            <Outlet>


            </Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;