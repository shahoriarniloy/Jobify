import { PiBag } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState, useRef, useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/CreateAccount/CreateAccount";
import useUserRole from "../Hooks/useUserRole";
import { FaRegHeart, FaBriefcase } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineVideoCall } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { logOut as logOutAction } from "../Redux/userSlice";
import { toggleTheme } from "../Redux/themeSlice";
import { useTranslation } from "react-i18next";
import { FaMoon, FaSun } from "react-icons/fa";

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

  // Language Switcher functions
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className={theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}>
      <div className="lg:px-24 md:px-6 px-4">
        <div className="navbar pt-2">
          <div className="navbar-start">
            <div className="flex items-center gap-2 text-[#0a65cc]">
              <PiBag className="w-6 h-6" />
              <Link to="/" className="text-xl font-bold">
                {t("Jobify")}
              </Link>
            </div>
          </div>
          <div className="navbar-end">
            {/* Language Switcher */}
            <div>
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                defaultValue={i18n.language}
                className={`py-1 px-2 rounded-md transition-colors duration-300 ${
                  theme === "dark" ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"
                }`}
              >
                <option value="en">{t("english")}</option>
                <option value="bn">{t("bangla")}</option>
              </select>
            </div>

            <div className="flex gap-4 lg:gap-5 items-center">
              <button onClick={handleThemeToggle} className="p-2">
                {theme === "light" ? <FaMoon /> : <FaSun />}
              </button>
              {currentUser ? (
                <>
                  <div className="relative flex items-center gap-4">
                    <img
                      src={currentUser?.photoURL || "https://via.placeholder.com/150"}
                      alt={t("user_profile")}
                      className="w-10 h-10 rounded-full cursor-pointer"
                      onClick={toggleMenu}
                    />
                    {isMenuOpen && (
                      <div ref={menuRef} className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
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
                                {t("admin_dashboard")}
                              </Link>
                            </li>
                          )}
                          <li>
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

        <Modal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} center>
          <Login setSignUpModalOpen={setSignUpModalOpen} setLoginModalOpen={setLoginModalOpen} />
        </Modal>

        <Modal open={signUpModalOpen} onClose={() => setSignUpModalOpen(false)} center>
          <Register setLoginModalOpen={setLoginModalOpen} setSignUpModalOpen={setSignUpModalOpen} />
        </Modal>

        <Modal open={roomModal} onClose={() => setRoomModal(false)}>
          <div className="card w-full max-w-sm">
            <div className="form-control">
              <label className="label">
                <span className="label-text">{t("enter_your_name")}</span>
              </label>
              <input
                type="text"
                placeholder={t("type_name")}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">{t("room_id")}</span>
              </label>
              <input
                type="text"
                onChange={(e) => setRoomID(e.target.value)}
                placeholder={t("type_room_id")}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button
                disabled={!roomID}
                onClick={handleJoinRoom}
                className="btn btn-primary"
              >
                {t("join_now")}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Navbar2;
