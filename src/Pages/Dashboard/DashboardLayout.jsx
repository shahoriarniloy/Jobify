import { NavLink, Outlet } from 'react-router-dom';

import { FiLayers } from "react-icons/fi";
import { BsBagCheck } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { LuBellRing } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import useUserRole from '../../Hooks/useUserRole'; 
import useCurrentUser from '../../Hooks/useCurrentUser'; 

const DashboardLayout = () => {
    const { currentUser } = useCurrentUser(); 
    const { role, loading: roleLoading, error: roleError } = useUserRole(currentUser?.email); 
    // console.log(role);

    if (roleLoading) return <div>Loading role...</div>;
    if (roleError) return <div>Error fetching role: {roleError}</div>;

    return (
        <div >
          

            <div className='mb-3 border-y-2'>
                <div className='container mx-auto flex flex-col lg:flex-row'> 
                    <div className='flex flex-col justify-between min-h-[60vh] w-full lg:w-[290px] max-w-sm pt-6 lg:pt-0'>
                        <div className='space-y-2'>
                            
                            <NavLink
                                to="/dashboard/overview"
                                className={({ isActive }) =>
                                    isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
                                }>
                                <FiLayers className='text-xl' /> Overview
                            </NavLink>

                            {role === "Job Seeker" && (
                                <>
                                    <NavLink
                                        to="/dashboard/applied-jobs"
                                        className={({ isActive }) =>
                                            isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
                                        }>
                                        <BsBagCheck className='text-xl' /> Applied Jobs
                                    </NavLink>

                                    <NavLink
                                        to="/dashboard/favorite-jobs"
                                        className={({ isActive }) =>
                                            isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
                                        }>
                                        <CiBookmark className='text-xl' /> Favorite Jobs
                                    </NavLink>

                                    <NavLink
                                        to="/job-alert"
                                        className={({ isActive }) =>
                                            isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
                                        }>
                                        <LuBellRing className='text-xl' /> Job Alert
                                    </NavLink>
                                </>
                            )}

                            {role === "Employer" && (
                                <>
                                    <NavLink
                                        to="/dashboard/postJob"
                                        className={({ isActive }) =>
                                            isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
                                        }>
                                        <BsBagCheck className='text-xl' /> Post a Job
                                    </NavLink>

                                    <NavLink
                                        to="/dashboard/myJob"
                                        className={({ isActive }) =>
                                            isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
                                        }>
                                        <CiBookmark className='text-xl' /> My Jobs
                                    </NavLink>
                                    <NavLink
                                        to="/dashboard/candidates"
                                        className={({ isActive }) =>
                                            isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
                                        }>
                                        <CiBookmark className='text-xl' /> Candidates
                                    </NavLink>

                                </>
                            )}

                            <NavLink
                                to="/settings"
                                className={({ isActive }) =>
                                    isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
                                }>
                                <IoSettingsOutline className='text-xl' /> Settings
                            </NavLink>
                        </div>

                        <div>
                            <NavLink
                                to="/logout"
                                className={({ isActive }) =>
                                    isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
                                }>
                                <MdOutlineLogout className='text-xl' /> Log-out
                            </NavLink>
                        </div>
                    </div>

                    <div className='border-l-0 lg:border-l-2  w-full py-14 lg:py-14  lg:px-4'> 
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
