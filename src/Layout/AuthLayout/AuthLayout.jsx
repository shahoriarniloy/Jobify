import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../../Shared/Navbar';
import Navbar2 from '../../Shared/Navbar2';
import Footer from '../../Shared/Footer';
import { FaEnvelope } from 'react-icons/fa'; 

const AuthLayout = () => {
    const navigate = useNavigate();

    const goToMessages = () => {
        navigate('/dashboard/messages');
    };

    return (
        <div className='bg-white'>
            <Navbar2 />
            <div className="auth-container lg:px-24 md:px-12 px-4">
                <Outlet />
            </div>
            <Footer />

            <button
                onClick={goToMessages}
                className='fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition'
            >
                <FaEnvelope size={24} />
            </button>
        </div>
    );
};

export default AuthLayout;
