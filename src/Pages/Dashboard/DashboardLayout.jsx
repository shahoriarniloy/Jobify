import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FiLayers } from "react-icons/fi";
import { BsBagCheck } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { LuBellRing } from "react-icons/lu";
import { MdHome } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout, MdMenu, MdClose } from "react-icons/md"; // Import menu icons
import useUserRole from '../../Hooks/useUserRole';
import useCurrentUser from '../../Hooks/useCurrentUser';


const DashboardLayout = () => {
    const { currentUser } = useCurrentUser();
    const { role, loading: roleLoading, error: roleError } = useUserRole(currentUser?.email);
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
    };

    if (roleLoading) return <div>Loading role...</div>;
    if (roleError) return <div>Error fetching role: {roleError}</div>;

    return (
        <div className="relative">
            {/* Menu button for small screens */}
            <div className="lg:hidden p-4 fixed top-0 left-0 z-50"> {/* Fixed position and higher z-index */}
                <button onClick={toggleSidebar} className="text-2xl">
                    {isSidebarOpen ? <MdClose /> : <MdMenu />} {/* Toggle between Menu and Close icons */}
                </button>
            </div>

            <div className="mb-3 border-y-2">
                <div className="container mx-auto flex flex-col lg:flex-row"> 
                    {/* Sidebar */}
                    <div 
                        className={`${
                            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        } lg:translate-x-0 lg:block lg:static fixed top-0 left-0 w-[75%] max-w-[290px] bg-white z-40 min-h-screen p-6 lg:min-h-[60vh] transition-transform duration-300 ease-in-out lg:relative`}
                    >
                        <div className="space-y-2">
                            <NavLink
                                to="/dashboard/overview"
                                className={({ isActive }) =>
                                    isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
                                }
                            >
                                <FiLayers className="text-xl" /> Overview
                            </NavLink>

                            {role === "Job Seeker" && (
                                <>
                                    <NavLink
                                        to="/dashboard/applied-jobs"
                                        className={({ isActive }) =>
                                            isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
                                        }
                                    >
                                        <BsBagCheck className="text-xl" /> Applied Jobs
                                    </NavLink>

                                    <NavLink
                                        to="/dashboard/favorite-jobs"
                                        className={({ isActive }) =>
                                            isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
                                        }
                                    >
                                        <CiBookmark className="text-xl" /> Favorite Jobs
                                    </NavLink>

                                    <NavLink
                                        to="/job-alert"
                                        className={({ isActive }) =>
                                            isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
                                        }
                                    >
                                        <LuBellRing className="text-xl" /> Job Alert
                                    </NavLink>
                                    
                                    <NavLink
                                        to="/dashboard/messages"
                                        className={({ isActive }) =>
                                            isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
                                        }
                                    >
                                        <CiBookmark className="text-xl" /> Messages
                                    </NavLink>
                                </>
                            )}

                            {role === "Employer" && (
                                <>
                                    <NavLink
                                        to="/dashboard/postJob"
                                        className={({ isActive }) =>
                                            isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
                                        }
                                    >
                                        <BsBagCheck className="text-xl" /> Post a Job
                                    </NavLink>

                                    <NavLink
                                        to="/dashboard/myJob"
                                        className={({ isActive }) =>
                                            isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
                                        }
                                    >
                                        <CiBookmark className="text-xl" /> My Jobs
                                    </NavLink>

                                    <NavLink
                                        to="/dashboard/candidates"
                                        className={({ isActive }) =>
                                            isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
                                        }
                                    >
                                        <CiBookmark className="text-xl" /> Candidates
                                    </NavLink>

                                    <NavLink
                                        to="/dashboard/messages"
                                        className={({ isActive }) =>
                                            isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
                                        }
                                    >
                                        <CiBookmark className="text-xl" /> Messages
                                    </NavLink>
                                </>
                            )}

                            <NavLink
                                to="/settings"
                                className={({ isActive }) =>
                                    isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
                                }
                            >
                                <IoSettingsOutline className="text-xl" /> Settings
                            </NavLink>
                        </div>

                        <div className="mt-8">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
                                }
                            >
                                <MdHome className="text-xl" /> Home
                            </NavLink> 
                            <NavLink
                                to="/logout"
                                className={({ isActive }) =>
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
