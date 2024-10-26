import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiLayers } from "react-icons/fi";
import { FaBriefcase, FaEdit, } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout, MdMenu, MdClose } from "react-icons/md";
import { useTranslation } from "react-i18next";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const{logOutUser} = useCurrentUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogOut = () => {
    logOutUser()
    .then(res=>{
      toast.success("Logout Successful")
      navigate("/")
    })
  };

  return (
    <div className="relative">
       <Helmet>
        <title>Jobify - Dashboard</title>
      </Helmet>
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
              isSidebarOpen ? "translate-x-0 z-40 " : "-translate-x-full"
            } lg:translate-x-0 lg:block 
        fixed top-0 left-0 w-[75%] max-w-[290px] bg-white min-h-screen p-6 lg:min-h-[60vh] transition-transform
        duration-300 ease-in-out lg:static`}
          >
            <div className="space-y-2">
              <NavLink
                to="/dashboard/overview"
                className={({ isActive }) =>
                  isActive
                    ? "isActiveRoute"
                    : "flex items-center pl-5 py-2 text-[#767F8C] gap-2"
                }
              >
                <FiLayers className="text-xl" /> {t("overview")}
              </NavLink>
              <NavLink
                to="/dashboard/postJob"
                className={({ isActive }) =>
                  isActive
                    ? "isActiveRoute"
                    : "flex items-center pl-5 py-2 text-[#767F8C] gap-2"
                }
              >
                <FaEdit className="text-xl" /> {t("post_a_job")}
              </NavLink>
              <NavLink
                to="/dashboard/myJob"
                className={({ isActive }) =>
                  isActive
                    ? "isActiveRoute"
                    : "flex items-center pl-5 py-2 text-[#767F8C] gap-2"
                }
              >
                <FaBriefcase className="text-xl" /> {t("my_jobs")}
              </NavLink>
              <NavLink
                to="/dashboard/company-settings"
                className={({ isActive }) =>
                  isActive
                    ? "isActiveRoute"
                    : "flex items-center pl-5 py-2 text-[#767F8C] gap-2"
                }
              >
                <IoSettingsOutline className="text-xl" /> {t("settings")}
              </NavLink>
            </div>

            <div className="mt-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "isActiveRoute"
                    : "flex items-center pl-5 py-2 text-[#767F8C] gap-2"
                }
              >
                <MdHome className="text-xl" /> {t("home")}
              </NavLink>
              <button
                onClick={handleLogOut}
                className="flex items-center pl-5 py-2 text-[#767F8C] gap-2"
              >
                <MdOutlineLogout className="text-xl" /> {t("log_out")}
              </button>
            </div>
          </div>

          {/* Content area */}
          <div className="w-full py-14 lg:pt-14 lg:px-4 lg:border-l-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
