import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../Shared/Footer';
import Navbar from '../Shared/Navbar';
import Navbar2 from '../Shared/Navbar2';
import { FaEnvelope } from 'react-icons/fa'; // Import an icon for the message button

const Main = () => {
    const navigate = useNavigate();

    // Function to handle navigation to the messages route
    const goToMessages = () => {
        navigate('/dashboard/messages');
    };

    return (
        <div className='roboto-regular bg-white'>
            <Navbar2 />
            <Navbar />
            <div className='lg:px-24 md:px-12 px-4'>
                <Outlet />
            </div>
            <Footer />

            {/* Floating Message Icon */}
            <button
                onClick={goToMessages}
                className='fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition'
            >
                <FaEnvelope size={24} />
            </button>
        </div>
    );
};

export default Main;
