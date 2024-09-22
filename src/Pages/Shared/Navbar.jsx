import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import mobileLogo from '../../assets/mobileLogo.png';
import useCurrentUser from '../../Hooks/useCurrentUser';
import { AiFillHome, AiFillInfoCircle } from 'react-icons/ai'; // Updated import
import { FaBriefcase } from 'react-icons/fa';


const Navbar = () => {
    const { currentUser, logout } = useCurrentUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItem = (
        <>
             <li className='text-stone-500 font-semibold flex items-center  lg:text-sm  md:text-sm text-3xl'>
            <Link to='/' className="flex items-center">
                <AiFillHome className="mr-2" />
                <span className="hidden lg:inline">Home</span> 
            </Link>
        </li>
        <li className='text-stone-500 font-semibold flex items-center  lg:text-sm  md:text-sm text-2xl'>
            <Link to='/advanced-search' className="flex items-center">
                <FaBriefcase className="mr-2" />
                <span className="hidden lg:inline">Find Job</span> 
            </Link>
        </li>
        <li className='text-stone-500 font-semibold flex items-center  lg:text-sm  md:text-sm text-3xl'>
            <Link to='/about' className="flex items-center">
                <AiFillInfoCircle className="mr-2" />
                <span className="hidden lg:inline">About Us</span> 
            </Link>
        </li>
        </>
    );

    return (
        <div>
            <div className="navbar bg-gradient-to-r from-stone-100 to-white fixed top-0 left-0 right-0 z-50 py-2 text-stone-500">
                <div className="navbar-start">
                    <div>
                        <img className='h-14 w-36 hidden lg:block' src={logo} alt="Logo" />
                        <img className='h-10 w-14 block lg:hidden' src={mobileLogo} alt="Mobile Logo" />
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="text-stone-500 gap-7 menu-horizontal px-1">
                        {navItem}
                    </ul>
                </div>
                
                <div className="navbar-center lg:hidden flex gap-7 justify-around">
                    <ul className="flex items-center gap-4">
                        {navItem}
                    </ul>
                </div>

                <div className="navbar-end relative">
                    <div className="flex gap-4 lg:gap-5 items-center">
                        {currentUser ? (
                            <div className="relative">
                                <img
                                    src={currentUser.photoURL}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                                    onClick={toggleMenu}
                                />
                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                                        <ul className="p-2 text-stone-600">
                                            <li className="py-2 px-4 hover:bg-gray-100">
                                                <Link to='/profile'>View Profile</Link>
                                            </li>
                                            <li className="py-2 px-4 hover:bg-gray-100">
                                                <Link to='/bookmarked-jobs'>Bookmarked Jobs</Link>
                                            </li>
                                            <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={logout}>
                                                Logout
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to='/login'>
                                    <button className="bg-white px-4 py-2 lg:px-6 lg:py-2 rounded-full font-">
                                        Log-in
                                    </button>
                                </Link>
                                <Link to='/register'>
                                    <button className="px-4 py-2 lg:px-6 lg:py-2 rounded-full">
                                        Register
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
