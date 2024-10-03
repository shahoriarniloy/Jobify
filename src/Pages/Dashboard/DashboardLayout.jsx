import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FiLayers } from "react-icons/fi";

// import { LuBellRing } from "react-icons/lu";
import { FaBriefcase, FaHeart, FaBell, FaEnvelope } from 'react-icons/fa';
import { FaEdit, FaUsers } from 'react-icons/fa';
import { MdHome } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout, MdMenu, MdClose } from "react-icons/md";
import useUserRole from '../../Hooks/useUserRole';
import useCurrentUser from '../../Hooks/useCurrentUser';


const DashboardLayout = () => {
const { currentUser } = useCurrentUser();
const { role, loading: roleLoading, error: roleError } = useUserRole(currentUser?.email);

const [isSidebarOpen, setIsSidebarOpen] = useState(false);

const toggleSidebar = () => {
setIsSidebarOpen(!isSidebarOpen);
};

if (roleLoading) return <div>Loading role...</div>;
if (roleError) return <div>Error fetching role: {roleError}</div>;

return (
<div className="relative">
  <div className="lg:hidden p-4 fixed top-0 left-0 z-50">
    <button onClick={toggleSidebar} className="text-2xl">
      {isSidebarOpen ?
      <MdClose /> :
      <MdMenu />}
    </button>
  </div>

  <div className="mb-3 border-y-2">
    <div className="container mx-auto flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className={`${ isSidebarOpen ? 'translate-x-0' : '-translate-x-full' } lg:translate-x-0 lg:block lg:static
        fixed top-0 left-0 w-[75%] max-w-[290px] bg-white z-40 min-h-screen p-6 lg:min-h-[60vh] transition-transform
        duration-300 ease-in-out lg:relative`}>
        <div className="space-y-2">
          {/* <NavLink to="/dashboard/overview" className={({ isActive })=>
            isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
            }
            >
            <FiLayers className="text-xl" /> Overview
          </NavLink> */}

          {role === "Job Seeker" && (
          <>
            <NavLink to="/dashboard/applied-jobs" className={({ isActive })=>
              isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
              }
              >
              <FaBriefcase className="text-xl" /> Applied Jobs
            </NavLink>

            <NavLink to="/dashboard/favorite-jobs" className={({ isActive })=>
              isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
              }
              >
              <FaHeart className="text-xl" /> Favorite Jobs
            </NavLink>

            <NavLink to="/job-alert" className={({ isActive })=>
              isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
              }
              >
              <FaBell className="text-xl" /> Job Alert
            </NavLink>

            <NavLink to="/dashboard/messages" className={({ isActive })=>
              isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
              }
              >
              <FaEnvelope className="text-xl" /> Messages
            </NavLink>
          </>
          )}


          {role === "Employer" && (
          <>
          <NavLink to="/dashboard/overview" className={({ isActive })=>
            isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
            }
            >
            <FiLayers className="text-xl" /> Overview
          </NavLink>
            <NavLink to="/dashboard/postJob" className={({ isActive })=>
              isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
              }
              >
              <FaEdit className="text-xl" /> Post a Job
            </NavLink>

            <NavLink to="/dashboard/myJob" className={({ isActive })=>
              isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
              }
              >
              <FaBriefcase className="text-xl" /> My Jobs
            </NavLink>

            <NavLink to="/dashboard/candidates" className={({ isActive })=>
              isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
              }
              >
              <FaUsers className="text-xl" /> Candidates
            </NavLink>

            <NavLink to="/dashboard/messages" className={({ isActive })=>
              isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
              }
              >
              <FaEnvelope className="text-xl" /> Messages
            </NavLink>
          </>
          )}


          <NavLink to="/dashboard/EmployeeSettings" className={({ isActive })=>
            isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
            }
            >
            <IoSettingsOutline className="text-xl" /> Settings
          </NavLink>
        </div>

        <div className="mt-8">
          <NavLink to="/" className={({ isActive })=>
            isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
            }
            >
            <MdHome className="text-xl" /> Home
          </NavLink>
          <NavLink to="/logout" className={({ isActive })=>
            isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
            }
            >
            <MdOutlineLogout className="text-xl" /> Log-out
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

export default DashboardLayout;