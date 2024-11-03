import { PiBag } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState, useRef, useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { io } from "socket.io-client";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/CreateAccount/CreateAccount";
import useUserRole from "../Hooks/useUserRole";
import { FaBell } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { MdOutlineVideoCall } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../Redux/themeSlice";
import { useTranslation } from "react-i18next";
import { FaMoon, FaSun } from "react-icons/fa";
import { switchLanguage } from "../Redux/languageSlice";
import useCurrentUser from "../Hooks/useCurrentUser";
import { toast } from "react-toastify";
import useConditionalDataFetch from "../Redux/UserDataSlice";
import { CardGiftcardTwoTone } from "@mui/icons-material";
import { GiCrown } from "react-icons/gi";
import logo from '../assets/logo/logo.png'


const Navbar2 = () => {
  const { currentUser, logOutUser } = useCurrentUser();
  const theme = useSelector((state) => state.theme.theme);
  const { data: fetchedUser, isLoading, error } = useConditionalDataFetch();
  const loggedUser = useSelector((state) => state.user.loggedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [roomModal, setRoomModal] = useState(false);
  const [roomID, setRoomID] = useState();
  const { role } = useUserRole();
  const menuRef = useRef(null);
  const { t } = useTranslation();
  const currentLanguage = useSelector((state) => state.language.language);

  const [jobNotifications, setJobNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    // const socket = io("https://jobify-server-ujo0.onrender.com");
    const socket = io("http://localhost:5000");

    socket.on("jobPosted", (notification) => {
      setJobNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // console.log(jobNotifications);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogOut = () => {
    logOutUser().then(() => {
      toast.success("You have successfully logged out.");
      navigate("/");
    });
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
        handleModalToggle();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutsideModal);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, [isModalOpen]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(switchLanguage(selectedLanguage));
  };

  return (
    <div
      className={
        theme === "dark"
          ? "bg-gray-800 text-white "
          : "bg-secondary text-black "
      }
    >
      <div className="container mx-auto">
        <div className="navbar pt-2">
          <div className="navbar-start ">
            <div className="flex flex-row items-center gap-2 text-[#0a65cc]">
              <Link
                to="/"
                className="text-xl border-none outline-none font-bold h-12 w-12 flex items-center"
              ><img  src={logo} alt="" />
                {t("Jobify")}
              </Link>
            </div>
          </div>
          <div className="navbar-end lg:gap-3 md:gap-3 gap-1">
            <div className="text-sm text-black">
              <select
                onChange={handleLanguageChange}
                value={currentLanguage}
                className={`py-1 px-2 rounded-md  transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800  text-white"
                    : "bg-transparent text-black"
                }`}
              >
                <option value="en">{t("english")}</option>
                <option value="bn">{t("bangla")}</option>
                <option value="ar">{t("العربية")}</option>
                <option value="ur">{t(" اُردُو")}</option>
                <option value="hi">{t("हिन्दी")}</option>
                <option value="zh-CN">{t("中国")}</option>
                <option value="es">{t("Español")}</option>
              </select>
            </div>

            <div className="flex gap-4 sm-gap-1 lg:gap-5 items-center">
              <button onClick={handleThemeToggle} className="p-2">
                {theme === "light" ? (
                  <FaMoon style={{ color: "#0a65cc" }} />
                ) : (
                  <FaSun style={{ color: "#0a65cc" }} />
                )}
              </button>
              {currentUser ? (
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

                  {isModalOpen && (
                    <div
                      ref={modalRef}
                      className={
                        theme === "dark"
                          ? "bg-gray-900 text-slate-400 absolute top-10 right-0  p-4 shadow-lg rounded-lg max-w-xs w-80 z-50"
                          : "absolute top-10 right-0 bg-white p-4 shadow-lg rounded-lg max-w-xs w-80 z-50"
                      }
                    >
                      <h2 className="text-lg font-bold mb-4">
                        {t("notifications")}
                      </h2>

                      {jobNotifications.length > 0 && (
                        <div className="flex justify-between items-center mb-4">
                          <p className="text-sm">
                            {t("notifications_count", {
                              count: jobNotifications.length,
                            })}
                          </p>
                          <button
                            onClick={handleMarkAllAsRead}
                            className="text-blue-600 text-sm hover:underline"
                          >
                            {t("mark_all_as_read")}
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
                                <strong>
                                  {notification.jobTitle} position
                                </strong>{" "}
                                at <strong>{notification.company}</strong>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>{t("no_notifications_available")}</p>
                      )}

                      <div className="flex justify-end">
                        <button
                          className="btn bg-[#0a65cc] text-white mt-4"
                          onClick={handleModalToggle}
                        >
                          {t("close")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}

              {currentUser ? (
                <>
                  <div className="relative lg:flex md:flex lg:items-center md:items-center gap-4 hidden">
                  <img
  src={
    loggedUser?.photoURL ||
    loggedUser?.company_logo ||
    "https://i.ibb.co.com/P6RfpHT/stylish-default-user-profile-photo-avatar-vector-illustration-664995-353.jpg"
  }
  alt={t("user_profile")}
  className="w-10 h-10 rounded-full cursor-pointer"
  style={{
    border: loggedUser?.accountType === 'premium' ? '4px solid #3B82F7' : 'none' 
  }}
  onClick={toggleMenu}
/>



                    {isMenuOpen && (
                      <div
                        ref={menuRef}
                        className={
                          theme === "dark"
                            ? "absolute right-0 top-12 mt-2 w-48 bg-slate-700  rounded-md shadow-lg z-50"
                            : "absolute right-0 top-12 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
                        }
                      >
                        <ul
                          className={
                            theme === "dark"
                              ? "py-1 text-white"
                              : "py-1 text-gray-700"
                          }
                        >
                          {role === "Job Seeker" && (
                            <div>
                              <li>
                              <Link
                                to="jobSeeker/overview"
                                className="px-4 py-2 hover:bg-gray-100 hover:text-[#0a65cc] flex items-center gap-2"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <MdOutlineDashboardCustomize />
                                {t("dashboard")}
                              </Link>
                            </li>
                            {
                              loggedUser?.accountType !=="premium" &&(
                                <Link
                                to="/premium-plan"
                                className="px-4 py-2 hover:bg-gray-100 hover:text-[#0a65cc] flex items-center gap-2"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <GiCrown />
                                {t("Premium Account")}
                              </Link>
                              )
                            }
                            
                            </div>
                            
                          )}
                          {role === "Employer" && (
                            
                            <li>
                              <Link
                                to="/dashboard/overview"
                                className="px-4 py-2 hover:bg-gray-100 hover:text-[#0a65cc] flex items-center gap-2"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <MdOutlineDashboardCustomize />
                                {t("dashboard")}
                              </Link>
                            </li>
                           
                          )}

                          {role === "Admin" && (
                            <li>
                              <Link
                                to="/admin/overview"
                                className="px-4 py-2 hover:bg-gray-100 hover:text-[#0a65cc] flex items-center gap-2"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <MdOutlineDashboardCustomize />
                                {t("dashboard")}
                              </Link>
                            </li>
                          )}
                          <li>
                            <button
                              className="px-4 py-2 w-full hover:bg-gray-100 hover:text-[#0a65cc] flex items-center gap-2"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setRoomModal(true);
                              }}
                            >
                              <MdOutlineVideoCall className="text-xl" />
                              {t("join_call")}
                            </button>
                          </li>
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
                  className={`${
                    theme == "dark" ? "bg-transparent" : "bg-white"
                  }  rounded-lg text-blue-500 border border-blue-400 px-6 py-3 relative lg:flex md:flex lg:items-center md:items-center gap-4 hidden`}
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
        styles={{
          modal: {
            backgroundColor: theme === "dark" ? "#1A202C" : "white",
            color: theme === "dark" ? "white" : "black",
            borderRadius: "8px",
          },
        }}
        classNames={{
          closeButton:
            theme === "dark"
              ? "custom-close-icon-dark"
              : "custom-close-icon-light",
        }}
      >
        <Login
          setLoginModalOpen={setLoginModalOpen}
          setSignUpModalOpen={setSignUpModalOpen}
        />
      </Modal>

      {/* Sign Up Modal */}
      <Modal
        open={signUpModalOpen}
        onClose={() => setSignUpModalOpen(false)}
        center
        styles={{
          modal: {
            backgroundColor: theme === "dark" ? "#1A202C" : "white",
            color: theme === "dark" ? "white" : "black",
            borderRadius: "8px",
          },
        }}
        classNames={{
          closeButton:
            theme === "dark"
              ? "custom-close-icon-dark"
              : "custom-close-icon-light",
        }}
      >
        <Register
          setLoginModalOpen={setLoginModalOpen}
          setSignUpModalOpen={setSignUpModalOpen}
        />
      </Modal>

      {/* Room Modal */}
      <Modal open={roomModal} onClose={() => setRoomModal(false)} center>
        <h2>{t("enter_room_id")}</h2>
        <input
          type="text"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
          className="border rounded-md p-2 w-full"
          placeholder={t("room_id_placeholder")}
        />
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleJoinRoom}
        >
          {t("join_room")}
        </button>
      </Modal>
    </div>
  );
};

export default Navbar2;
