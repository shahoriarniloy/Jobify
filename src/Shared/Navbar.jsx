import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import useCurrentUser from "../Hooks/useCurrentUser";
import {
  MdLogout,
  MdOutlineDashboardCustomize,
  MdOutlineVideoCall,
} from "react-icons/md";
import { toast } from "react-toastify";
import Modal from "react-responsive-modal";
import Register from "../Pages/Auth/CreateAccount/CreateAccount";
import useUserRole from "../Hooks/useUserRole";
import Login from "../Pages/Auth/Login/Login";

const Navbar = () => {
  const { t } = useTranslation();
  const [isSticky, setIsSticky] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  const loggedUser = useSelector((state) => state?.user?.loggedUser);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { currentUser, logOutUser } = useCurrentUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [roomModal, setRoomModal] = useState(false);
  const [roomID, setRoomID] = useState("");
  const { role } = useUserRole();
  const menuRef = useRef(null);
  const modalRef = useRef(null);

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

  const navItem = (
    <>
      <li>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "active-nav nav-link" : "nav-link"
          }
        >
          {t("home")}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/advanced-search"
          className={({ isActive }) =>
            isActive ? "active-nav nav-link" : "nav-link"
          }
        >
          {t("find_job")}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/companies"
          className={({ isActive }) =>
            isActive ? "active-nav nav-link" : "nav-link"
          }
        >
          {t("find_company")}
        </NavLink>
      </li>
      {role == "Job Seeker" && (
        <li>
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              isActive ? "active-nav nav-link" : "nav-link"
            }
          >
            {t("my_network")}
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "active-nav nav-link" : "nav-link"
          }
        >
          {t("about_us")}
        </NavLink>
      </li>
    </>
  );

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsSticky(scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="">
      <div
        className={`navbar shadow-sm ${
          isSticky ? "sticky top-0 z-50" : ""
        } roboto-regular ${
          theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-black"
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className={
                theme === "dark"
                  ? "menu menu-sm dropdown-content mt-1 z-[1] shadow bg-slate-700 text-gray-300 rounded-box w-52"
                  : "menu menu-sm dropdown-content mt-1 z-[1] shadow bg-base-100 rounded-box w-52"
              }
            >
              {navItem}
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul
            className={
              theme === "dark"
                ? "text-gray-300 gap-7 menu-horizontal px-1"
                : "text-[#5E6670] gap-7 menu-horizontal px-1"
            }
          >
            {navItem}
          </ul>
        </div>

        <div className="navbar-end relative">
          {currentUser ? (
            <>
              <div className="relative flex lg:hidden md:hidden items-center  gap-4  ">
                <img
                  src={
                    loggedUser?.photoURL ||
                    loggedUser?.company_logo ||
                    "https://i.ibb.co.com/P6RfpHT/stylish-default-user-profile-photo-avatar-vector-illustration-664995-353.jpg"
                  }
                  alt={t("user_profile")}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={toggleMenu}
                />
                {isMenuOpen && (
                  <div
                    ref={menuRef}
                    className={
                      theme === "dark"
                        ? "absolute right-0 top-12 mt-2 w-48 bg-slate-700 rounded-md shadow-lg z-50"
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
              className="bg-white rounded-lg text-blue-500 border border-blue-400 px-6 relative flex lg:hidden md:hidden items-center  gap-4 "
            >
              {t("join_us")}
            </button>
          )}
        </div>
      </div>

      <Modal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        center
      >
        <Login />
      </Modal>

      <Modal
        open={signUpModalOpen}
        onClose={() => setSignUpModalOpen(false)}
        center
      >
        <Register />
      </Modal>

      {/* Room Modal */}
      <Modal open={roomModal} onClose={() => setRoomModal(false)} center>
        <h2 className="text-2xl">{t("join_room")}</h2>
        <input
          type="text"
          className="input input-bordered w-full mt-4"
          placeholder={t("room_id")}
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
        />
        <button className="btn btn-primary mt-4" onClick={handleJoinRoom}>
          {t("join_now")}
        </button>
      </Modal>
    </div>
  );
};

export default Navbar;
