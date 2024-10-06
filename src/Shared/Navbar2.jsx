import { PiBag } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import useCurrentUser from '../Hooks/useCurrentUser';
import { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/CreateAccount/CreateAccount";
import useUserRole from "../Hooks/useUserRole";
import { toast } from "react-toastify";

const Navbar2 = () => {
    const { currentUser, logOut } = useCurrentUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [signUpModalOpen, setSignUpModalOpen] = useState(false);
    const { role } = useUserRole();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handelLogOut = () => {
        logOut()
            .then(res => {
                toast.success('Successfully Log Out !', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate("/");
            })

    }

    return (
        <div className="">
            <div className="navbar bg-white shadow-md pt-2">
                <div className="navbar-start">
                    <div className="flex items-center text-[#0a65cc] gap-2 lg:pl-24 md:pl-12 pl-12">
                        <PiBag className="w-6 h-6" />
                        <Link to="/" className="text-xl font-bold text-[#0a65cc]">Jobify</Link>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="flex gap-4 lg:gap-5 items-center lg:pr-24 md:pr-12 pr-4">
                        {currentUser ? (
                            <>
                                <div className="relative flex items-center gap-4">
                                    <img
                                        src={currentUser?.photoURL || 'https://via.placeholder.com/150'}
                                        alt="User Profile"
                                        className="w-10 h-10 rounded-full cursor-pointer"
                                        onClick={toggleMenu}
                                    />

                                    {isMenuOpen && (
                                        <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-md shadow-lg z-50"> {/* Set z-index here */}
                                            <ul className="py-1 text-gray-700">

                                                {
                                                    role == "Job Seeker" ? <>
                                                        <li>
                                                            <Link
                                                                to="/favorite-jobs"
                                                                className="block px-4 py-2 hover:bg-gray-100"
                                                                onClick={() => setIsMenuOpen(false)}
                                                            >
                                                                Favorite Jobs
                                                            </Link>
                                                        </li>
                                                    </>
                                                        :

                                                        <li>
                                                            <Link
                                                                to="/dashboard/overview"
                                                                className="block px-4 py-2 hover:bg-gray-100"
                                                                onClick={() => setIsMenuOpen(false)}
                                                            >
                                                                Dashboard
                                                            </Link>
                                                        </li>
                                                }
                                                <li>
                                                    <button
                                                        onClick={handelLogOut}
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

                                <button
                                    onClick={() => setLoginModalOpen(true)}
                                    className="bg-white px-5 py-2 lg:px-7 lg:py-3 rounded-lg text-blue-500 border border-blue-400 ">
                                    Join Us</button>

                            </>
                        )}
                    </div>
                </div>
            </div>




            {/* Sign up modals */}
            <Modal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} center>
                <Login
                    setSignUpModalOpen={setSignUpModalOpen}
                    setLoginModalOpen={setLoginModalOpen} />
            </Modal>

            <Modal open={signUpModalOpen} onClose={() => setSignUpModalOpen(false)} center>
                <Register
                    setLoginModalOpen={setLoginModalOpen}
                    setSignUpModalOpen={setSignUpModalOpen}
                />
            </Modal>



        </div>
    );
};

export default Navbar2;
