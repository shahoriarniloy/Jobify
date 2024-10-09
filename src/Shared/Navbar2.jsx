import { PiBag } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import useCurrentUser from "../Hooks/useCurrentUser";
import { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/CreateAccount/CreateAccount";
import useUserRole from "../Hooks/useUserRole";
import { FaRegHeart, FaBriefcase } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

const Navbar2 = () => {
  const { currentUser, logOut } = useCurrentUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const { role } = useUserRole();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handelLogOut = () => {
    logOut();
    navigate("/");
  };

  return (
    <div className="">
      <div className="navbar bg-white pt-2">
        <div className="navbar-start">
          <div className="flex items-center text-[#0a65cc] gap-2 ">
            <PiBag className="w-6 h-6" />
            <Link to="/" className="text-xl font-bold text-[#0a65cc]">
              Jobify
            </Link>
          </div>
        </div>
        <div className="navbar-end">
          <div className="flex gap-4 lg:gap-5 items-center ">
            {currentUser ? (
              <>
                <div className="relative flex items-center gap-4">
                  <img
                    src={
                      currentUser?.photoURL || "https://via.placeholder.com/150"
                    }
                    alt="User Profile"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={toggleMenu}
                  />

                  {isMenuOpen && (
                    <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                      {" "}
                      {/* Set z-index here */}
                      <ul className="py-1 text-gray-700">
                        {role == "Job Seeker" && (
                          <>
                            <li>
                              <Link
                                to="/appliedjobs"
                                className="px-4 py-2 hover:bg-gray-100 hover:text-[#0a65cc] flex items-center gap-2"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <FaBriefcase />
                                Applied Jobs
                              </Link>
                              <Link
                                to="/favorite-jobs"
                                className="px-4 py-2 hover:bg-gray-100 hover:text-[#0a65cc] flex items-center gap-2"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <FaRegHeart />
                                Favorite Jobs
                              </Link>
                              <Link
                                to="/employee-settings"
                                className="px-4 py-2 hover:bg-gray-100 hover:text-[#0a65cc] flex items-center gap-2"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <IoSettingsOutline />
                                Profile Settings
                              </Link>
                            </li>
                          </>
                        )}
                        {role == "Employer" && (
                          <>
                            <li>
                              <Link
                                to="/dashboard/overview"
                                className="px-4 py-2 hover:bg-gray-100 hover:text-[#0a65cc] flex items-center gap-2"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <MdOutlineDashboardCustomize />
                                Dashboard
                              </Link>
                            </li>
                          </>
                        )}

                        <li>
                          <button
                            onClick={handelLogOut}
                            className="px-4 py-2 hover:bg-gray-100 hover:text-[#0a65cc] flex items-center gap-2 w-full"
                          >
                            <MdLogout />
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
                  className="bg-white px-5 py-2 lg:px-7 lg:py-3 rounded-lg text-blue-500 border border-blue-400 "
                >
                  Join Us
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        center
      >
        <Login
          setSignUpModalOpen={setSignUpModalOpen}
          setLoginModalOpen={setLoginModalOpen}
        />
      </Modal>

      <Modal
        open={signUpModalOpen}
        onClose={() => setSignUpModalOpen(false)}
        center
      >
        <Register
          setLoginModalOpen={setLoginModalOpen}
          setSignUpModalOpen={setSignUpModalOpen}
        />
      </Modal>
    </div>
  );
};
export default Navbar2;
