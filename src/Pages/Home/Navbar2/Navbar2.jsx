import { PiBag } from "react-icons/pi";
import { Link } from "react-router-dom";
import useCurrentUser from '../../../Hooks/useCurrentUser';
import { useState } from 'react';

const Navbar2 = () => {
    const { currentUser, logout } = useCurrentUser(); 
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <div className="navbar bg-white shadow-md py-2">
                <div className="navbar-start">
                    <div className="flex items-center text-[#0a65cc] gap-2 px-24">
                        <PiBag className="w-6 h-6" /> 
                        <Link to="/" className="text-xl font-bold text-[#0a65cc]">Jobify</Link>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="flex gap-4 lg:gap-5 items-center">
                        {currentUser ? (
                            <>
                                <div className="relative">
                                    <img
                                        src={currentUser.photoURL || 'https://via.placeholder.com/150'}
                                        alt="User Profile"
                                        className="w-10 h-10 rounded-full cursor-pointer"
                                        onClick={toggleMenu}
                                    />
                                    
                                    {isMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                                            <ul className="py-1 text-gray-700">
                                                <li>
                                                    <Link 
                                                        to="/dashboard/overview" 
                                                        className="block px-4 py-2 hover:bg-gray-100"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        Dashboard
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link 
                                                        to="/bookmarked-jobs" 
                                                        className="block px-4 py-2 hover:bg-gray-100"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        Bookmarks
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={logout}
                                                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                                    >
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to='/login'>
                                    <button className="bg-white px-5 py-2 lg:px-7 lg:py-3 rounded-lg text-blue-500 border border-blue-400">Sign In</button>
                                </Link>
                                <Link to='/register'>
                                    <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 lg:px-7 lg:py-3 rounded-lg">Register</button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar2;
