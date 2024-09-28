import { BN, US } from "country-flag-icons/react/3x2";
import { BiPhoneCall } from "react-icons/bi";
import { NavLink } from "react-router-dom"; 
import Navbar2 from "../Home/Navbar2/Navbar2";

const Navbar = () => {
    const navItem = (
        <>
            <li>
                <NavLink to='/' end className={({ isActive }) => isActive ? 'active-nav nav-link' : 'nav-link'}>Home</NavLink>
            </li>
            <li>
                <NavLink to='/advanced-search' className={({ isActive }) => isActive ? 'active-nav nav-link' : 'nav-link'}>Find Job</NavLink>
            </li>
            <li>
                <NavLink to='/companies' className={({ isActive }) => isActive ? 'active-nav nav-link' : 'nav-link'}>Find Company</NavLink>
            </li>
            <li>
                <NavLink to='/about' className={({ isActive }) => isActive ? 'active-nav nav-link' : 'nav-link'}>About Us</NavLink>
            </li>
            
        </>
    );

    return (
        <div>
            <div className="navbar bg-[#F1F2F4]">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navItem}
                        </ul>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="text-[#5E6670] gap-7 menu-horizontal px-1">
                        {navItem}
                    </ul>
                </div>

                <div className="navbar-end flex items-center gap-4">
                    <div className="flex gap-2">
                        <span className="text-gray-700 mt-1"><BiPhoneCall /></span>
                        <span className="text-gray-700">+1 234 567 890</span>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="text-gray-700 px-3 py-1 rounded-full cursor-pointer flex items-center gap-1">
                            <US title="United States" className="w-5 h-5" /> EN
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                            <li>
                                <button className="flex items-center gap-2">
                                    <US title="United States" className="w-5 h-5" /> EN
                                </button>
                            </li>
                            <li>
                                <button className="flex items-center gap-2">
                                    <BN title="Bangladesh" className="w-5 h-5" /> BN
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Navbar2 />
        </div>
    );
};

export default Navbar;