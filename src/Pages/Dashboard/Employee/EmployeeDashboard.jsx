import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FaBriefcase, FaRegHeart, FaEdit } from "react-icons/fa";
import { MdHome, MdOutlineLogout, MdMenu, MdClose } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import useUserRole from "../../../Hooks/useUserRole";
import { useSelector } from "react-redux";
import { FiLayers } from "react-icons/fi";
import { useTranslation } from "react-i18next"; // Import useTranslation

const EmployeeDashboard = () => {
  const { t } = useTranslation(); // Destructure t from useTranslation
  const currentUser = useSelector((state) => state.user.currentUser);
  const {
    role,
    loading: roleLoading,
    error: roleError,
  } = useUserRole(currentUser?.email);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (roleLoading) return <div>{t("loading_role")}</div>; // Translated string
  if (roleError) return <div>{t("error_fetching_role")}: {roleError}</div>; // Translated string

  return (
    <div className="relative">
      <div className="lg:hidden p-4 fixed top-0 left-0 z-50">
        <button onClick={toggleSidebar} className="text-2xl">
          {isSidebarOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      <div className="mb-3 border-y-2">
        <div className="container mx-auto flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div
            className={`${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 lg:block 
        fixed top-0 left-0 w-[75%] max-w-[290px] bg-white z-40 min-h-screen p-6 lg:min-h-[60vh] transition-transform
        duration-300 ease-in-out lg:relative`}
          >
            <div className="space-y-2">
              {role === "Job Seeker" && (
                <div>
                  <NavLink
                    to="/jobSeeker/overview"
                    className={({ isActive }) =>
                      isActive
                        ? "isActiveRoute"
                        : "flex items-center pl-5 py-2 text-[#767F8C] gap-2"
                    }
                  >
                    <FiLayers className="text-xl" /> {t("overview")}
                  </NavLink>
                  <NavLink
                    to="/jobSeeker/appliedjobs"
                    className={({ isActive }) =>
                      isActive
                        ? "isActiveRoute flex items-center pl-5 py-2 text-[#0a65cc] gap-2"
                        : "flex items-center pl-5 py-2 text-[#767F8C] gap-2"
                    }
                  >
                    <FaBriefcase /> {t("applied_jobs")}
                  </NavLink>
                  <NavLink
                    to="/jobSeeker/favorite-jobs"
                    className={({ isActive }) =>
                      isActive
                        ? "isActiveRoute flex items-center pl-5 py-2 text-[#0a65cc] gap-2"
                        : "flex items-center pl-5 py-2 text-[#767F8C] gap-2"
                    }
                  >
                    <FaRegHeart /> {t("favorite_jobs")}
                  </NavLink>
                  <NavLink
                    to="/jobSeeker/resume-builder"
                    className={({ isActive }) =>
                      isActive
                        ? "isActiveRoute flex items-center pl-5 py-2 text-[#0a65cc] gap-2"
                        : "flex items-center pl-5 py-2 text-[#767F8C] gap-2"
                    }
                  >
                    <FaEdit /> {t("edit_resume")}
                  </NavLink>
                  <NavLink
                    to="/jobSeeker/employee-settings"
                    className={({ isActive }) =>
                      isActive
                        ? "isActiveRoute flex items-center pl-5 py-2 text-[#0a65cc] gap-2"
                        : "flex items-center pl-5 py-2 text-[#767F8C] gap-2"
                    }
                  >
                    <IoSettingsOutline /> {t("profile_setting")}
                  </NavLink>
                </div>
              )}
            </div>

            {/* General links */}
            <div className="mt-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "isActiveRoute flex items-center pl-5 py-2 text-[#0a65cc] gap-2"
                    : "flex items-center pl-5 py-2 text-[#767F8C] gap-2"
                }
              >
                <MdHome className="text-xl" /> {t("home")}
              </NavLink>
              <NavLink
                to="/logout"
                className={({ isActive }) =>
                  isActive
                    ? "isActiveRoute flex items-center pl-5 py-2 text-[#0a65cc] gap-2"
                    : "flex items-center pl-5 py-2 text-[#767F8C] gap-2"
                }
              >
                <MdOutlineLogout className="text-xl" /> {t("log_out")}
              </NavLink>
            </div>
          </div>

          {/* Content area */}
          <div className="w-full py-14 lg:py-14 lg:px-4 border-l-0 lg:border-l-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
