import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';


// icons
import { FiLayers } from "react-icons/fi";
import { BsBagCheck } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { LuBellRing } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
const DashboardLayout = () => {
    return (
        <div className='mb-3 mt-28 border-y-2'>

            <div className='container mx-auto flex'>

                {/* Dashboard Nav*/}

                <div className='flex flex-col justify-between min-h-[60vh] w-[290px] max-w-sm pt-6'>
                    <div className='space-y-2'>
                        <NavLink
                            to="/dashboard/overview"
                            className={({ isActive }) =>
                                isActive ? 'isActiveRoute' : 'flex items-center pl-5 py-2 text-[#767F8C] gap-2'
                            }>
                            <FiLayers className='text-xl' /> Overview
                        </NavLink>

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


                <div className='border-l-2 pl-12 w-full py-14'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;