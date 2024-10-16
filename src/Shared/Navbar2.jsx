import { PiBag } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState, useRef, useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { io } from "socket.io-client";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/CreateAccount/CreateAccount";
import useUserRole from "../Hooks/useUserRole";
import { FaRegHeart, FaBriefcase, FaBell, FaEdit } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineVideoCall } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { logOut as logOutAction } from "../Redux/userSlice";
import { toggleTheme } from "../Redux/themeSlice";
import { useTranslation } from "react-i18next";
import { FaMoon, FaSun } from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar2 = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [roomModal, setRoomModal] = useState(false);
  const [roomID, setRoomID] = useState();
  const { role } = useUserRole();
  const menuRef = useRef(null);
  const { t, i18n } = useTranslation();

  const [jobNotifications, setJobNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    // const socket = io("http://localhost:5000");
    const socket = io("https://jobify-server-ujo0.onrender.com");

    socket.on("jobPosted", (notification) => {
      setJobNotifications((prev) => [...prev, notification]);
      Swal.fire({
        title: "New Job Posted!",
        text: `New job '${notification.jobTitle}' at ${notification.company}`,
        icon: "info",
        confirmButtonText: "Ok",
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogOut = () => {
    dispatch(logOutAction());
    navigate("/");
  };

  const handleJoinRoom = useCallback(() => {
    setRoomModal(false);
    navigate(`/rooms/${roomID}`);
  }, [navigate, roomID]);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleMarkAllAsRead = () => {
    setJobNotifications([]);
  };

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleModalToggle(); // Close the modal if clicking outside
      }
    };

    // Add event listener if the modal is open
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutsideModal);
    }

    // Cleanup the event listener when the modal is closed or component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, [isModalOpen]);

  // Language Switcher functions
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div
      className={
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }
    >
      <div className="container mx-auto">
        <div className="navbar pt-2">
          <div className="navbar-start">
            <div className="flex items-center gap-2 text-[#0a65cc]">
              <PiBag className="w-6 h-6" />
              <Link to="/" className="text-xl font-bold">
                {t("Jobify")}
              </Link>
            </div>
          </div>
          <div className="navbar-end gap-3">
            {/* Language Switcher */}
            <div className="text-sm text-black">
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                defaultValue={i18n.language}
                className={`py-1 px-2 rounded-md  duration-300 text-xs${
                  theme === "dark"
                    ? "bg-gray-800 text-black border-gray-600"
                    : "bg-gray-400 text-[#0a65cc] border-gray-300"
                }`}
              >
                <option value="en">{t("english")}</option>
                <option value="bn">{t("bangla")}</option>
              </select>
            </div>

            <div className="flex gap-4 lg:gap-5 items-center">
              <button onClick={handleThemeToggle} className="p-2">
                {theme === "light" ? (
                  <FaMoon style={{ color: "#0a65cc" }} />
                ) : (
                  <FaSun style={{ color: "#0a65cc" }} />
                )}
              </button>

              {/* Notifications Bell Icon */}
              <div className="relative rounded-full p-2 hover:bg-[#e7f0fa]">
                <FaBell
                  className="cursor-pointer text-[#0a65cc]"
                  onClick={handleModalToggle}
                />
                {jobNotifications.length > 0 && (
                  <span className="absolute top-0 left-2 bg-red-500 text-white rounded-full text-xs px-1">
                    {jobNotifications.length}
                  </span>
                )}

                {/* Notifications Modal */}
                {isModalOpen && (
                  <div
                    ref={modalRef}
                    className="absolute top-10 right-0 bg-white p-4 shadow-lg rounded-lg max-w-xs w-80 z-50"
                  >
                    <h2 className="text-lg font-bold mb-4">Notifications</h2>

                    {/* Mark all as read button */}
                    {jobNotifications.length > 0 && (
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-sm">
                          You have {jobNotifications.length} notifications
                        </p>
                        <button
                          onClick={handleMarkAllAsRead}
                          className="text-blue-600 text-sm hover:underline"
                        >
                          Mark all as read
                        </button>
                      </div>
                    )}

                    {jobNotifications.length > 0 ? (
                      <ul className="text-sm">
                        {jobNotifications.map((notification, index) => (
                          <li
                            key={index}
                            className="py-2 text-gray-700 bg-[#f4f8fffa] rounded-md p-4 mb-2"
                          >
                            <Link
                              to={`/job/${notification.jobId}`}
                              className="hover:underline"
                            >
                              <strong>{notification.jobTitle} position</strong>{" "}
                              at <strong>{notification.company}</strong>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No notifications available</p>
                    )}

                    <div className="flex justify-end">
                      <button
                        className="btn bg-[#0a65cc] text-white mt-4"
                        onClick={handleModalToggle}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {currentUser ? (
                <>
                  <div className="relative flex items-center gap-4">
                    <img
                      src={
                        currentUser?.photoURL ||
                        "https://via.placeholder.com/150"
                      }
                      alt={t("user_profile")}
                      className="w-10 h-10 rounded-full cursor-pointer"
                      onClick={toggleMenu}
                    />
                    {isMenuOpen && (
                      <div
                        ref={menuRef}
                        className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
                      >
                        <ul className="py-1 text-gray-700">
                          {role === "Job Seeker" && (
                            <>
                              <li>
                                <Link
                                  to="/appliedjobs"
                                  className="px-4 py-2 hover:bg-gray-100 hover:text-[#0a65cc] flex items-center gap-2"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  <FaBriefcase />
                                  {t("applied_jobs")}
                                </Link>
                                <Link
                                  to="/favorite-jobs"
                                  className="px-4 py-2 hover:bg-gray-100 hover:text-[#0a65cc] flex items-center gap-2"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  <FaRegHeart />
                                  {t("favorite_jobs")}
                                </Link>
                                <Link
                                  to="/resume-builder"
                                  className="px-4 py-2 hover:bg-gray-100 hover:text-[#0a65cc] flex items-center gap-2"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  <FaEdit />
                                  {t("edit_resume")}
                                </Link>
                                <Link
                                  className="px-4 py-2 hover:bg-gray-100 hover:text-[#0a65cc] flex items-center gap-2"
                                  onClick={() => {
                                    setIsMenuOpen(false);
                                    setRoomModal(true);
                                  }}
                                >
                                  <MdOutlineVideoCall className="text-xl" />
                                  {t("join_call")}
                                </Link>
                                <Link
                                  to="/employee-settings"
                                  className="px-4 py-2 hover:bg-gray-100 hover:text-[#0a65cc] flex items-center gap-2"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  <IoSettingsOutline />
                                  {t("profile_settings")}
                                </Link>
                              </li>
                            </>
                          )}
                          {role === "Employer" && (
                            <li>
                              <Link
                                to="/dashboard"
                                className="px-4 py-2 hover:bg-gray-100 hover:text-[#0a65cc] flex items-center gap-2"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <MdOutlineDashboardCustomize />
                                {t("dashboard")}
                              </Link>
                              <Link
                                to="/dashboard/company-settings"
                                className="px-4 py-2 hover:bg-gray-100 hover:text-[#0a65cc] flex items-center gap-2"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <IoSettingsOutline />
                                {t("profile_settings")}
                              </Link>
                              <Link
                                className="px-4 py-2 hover:bg-gray-100 hover:text-[#0a65cc] flex items-center gap-2"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setRoomModal(true);
                                }}
                              >
                                <MdOutlineVideoCall className="text-xl" />
                                {t("join_call")}
                              </Link>
                            </li>
                          )}
                          <li>
                            <button
                              onClick={handleLogOut}
                              className="px-4 py-2 hover:bg-gray-100 hover:text-[#0a65cc] flex items-center gap-2 w-full"
                            >
                              <MdLogout />
                              {t("logout")}
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="bg-white px-5 py-2 lg:px-7 lg:py-3 rounded-lg text-blue-500 border border-blue-400"
                >
                  {t("join_us")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <Modal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        center
      >
        <Login />
      </Modal>

      {/* Sign Up Modal */}
      <Modal
        open={signUpModalOpen}
        onClose={() => setSignUpModalOpen(false)}
        center
      >
        <Register />
      </Modal>

      {/* Room Modal */}
      <Modal open={roomModal} onClose={() => setRoomModal(false)} center>
        <h2>Enter Room ID</h2>
        <input
          type="text"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
          className="border rounded-md p-2 w-full"
          placeholder="Room ID"
        />
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleJoinRoom}
        >
          Join Room
        </button>
      </Modal>
    </div>
  );
};

export default Navbar2;
