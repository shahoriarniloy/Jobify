import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiLayers } from "react-icons/fi";
import { FaBriefcase } from "react-icons/fa";
import { FaEdit, FaUsers } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout, MdMenu, MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logOut as logOutAction } from "../../../Redux/userSlice";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handelLogOut = () => {
    dispatch(logOutAction());
    navigate("/");
  };

  return (
    <div className="relative">
      <div className="lg:hidden p-4 fixed top-0 left-0 z-50">
        <button onClick={toggleSidebar} className="text-2xl">
          {isSidebarOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      <div className="mb-3 border-y-2">
        <div className="container mx-auto flex flex-col lg:flex-row">
          <div
            className={`${
              isSidebarOpen ? "translate-x-0 z-40 " : "-translate-x-full"
            } lg:translate-x-0 lg:block 
        fixed top-0 left-0 w-[75%] max-w-[290px] bg-white min-h-screen p-6 lg:min-h-[60vh] transition-transform
        duration-300 ease-in-out lg:static`}
          >
            <div className="space-y-2">
              <>
                <NavLink
                  to="/admin/overview"
                  className={({ isActive }) =>
                    isActive
                      ? "isActiveRoute"
                      : "flex items-center pl-5 py-2 text-[#767F8C] gap-2"
                  }
                >
                  <FiLayers className="text-xl" /> Overview
                </NavLink>
                <NavLink
                  to="/admin/allCompanies"
                  className={({ isActive }) =>
                    isActive
                      ? "isActiveRoute"
                      : "flex items-center pl-5 py-2 text-[#767F8C] gap-2"
                  }
                >
                  <FaEdit className="text-xl" /> Employer
                </NavLink>

                <NavLink
                  to="/admin/alljobseekers"
                  className={({ isActive }) =>
                    isActive
                      ? "isActiveRoute"
                      : "flex items-center pl-5 py-2 text-[#767F8C] gap-2"
                  }
                >
                  <FaBriefcase className="text-xl" /> Candidates
                </NavLink>
                <NavLink
                  to="/admin/alljobs"
                  className={({ isActive }) =>
                    isActive
                      ? "isActiveRoute"
                      : "flex items-center pl-5 py-2 text-[#767F8C] gap-2"
                  }
                >
                  <FaBriefcase className="text-xl" /> Jobs
                </NavLink>

                {/* <NavLink
                  to="/dashboard/companySettings"
                  className={({ isActive }) =>
                    isActive
                      ? "isActiveRoute"
                      : "flex items-center pl-5 py-2 text-[#767F8C] gap-2"
                  }
                >
                  <IoSettingsOutline className="text-xl" /> Settings
                </NavLink> */}
              </>
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
                <MdHome className="text-xl" /> Home
              </NavLink>
              <NavLink
                onClick={() => {
                  handelLogOut();
                  navigate("/");
                }}
                className="flex items-center pl-5 py-2 text-[#767F8C] gap-2"
              >
                <MdOutlineLogout className="text-xl" /> Log-out
              </NavLink>
            </div>
          </div>

          <div className="w-full py-14 lg:pt-14 lg:px-4 lg:border-l-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
