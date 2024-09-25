import React from 'react';
import { CiLocationOn } from "react-icons/ci";
import { MdAttachMoney } from "react-icons/md";
import { IoCheckmarkSharp } from "react-icons/io5";
import ButtonCommon from '../../../Shared/ButtonCommon';

const RecentAppliedJobTable = () => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Job</th>
                        <th>Date applied</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    <tr>

                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div className='space-y-2'>
                                    <div className='flex items-center gap-2'>
                                        <h2 className="font-bold">Networking Engineer</h2>
                                        <span className='bg-[#e7f0fa] px-3 py-1 rounded-full text-[#0a65cc]'>Remote</span>
                                    </div>
                                    <div className="text-sm opacity-50 flex items-center gap-4">
                                        <p className='flex items-center gap-2'><CiLocationOn /> Washington</p>
                                        <p className='flex items-center gap-2'><MdAttachMoney /> 50k-80k/month</p>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>Feb 2, 2019 19:28</td>
                        <td>
                            <p className='flex items-center gap-2 text-[#0BA02C]'>
                                <IoCheckmarkSharp />
                                Active
                            </p>
                        </td>
                        <th>
                            <button>
                                <ButtonCommon btnName={"View Details"} customStyle={"text-sm bg-[#f1f2f4] text-[#0a65cc] hover:bg-[#0a65cc] hover:text-white"} />
                            </button>
                        </th>
                    </tr>
                    <tr>

                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div className='space-y-2'>
                                    <div className='flex items-center gap-2'>
                                        <h2 className="font-bold">Networking Engineer</h2>
                                        <span className='bg-[#e7f0fa] px-3 py-1 rounded-full text-[#0a65cc]'>Remote</span>
                                    </div>
                                    <div className="text-sm opacity-50 flex items-center gap-4">
                                        <p className='flex items-center gap-2'><CiLocationOn /> Washington</p>
                                        <p className='flex items-center gap-2'><MdAttachMoney /> 50k-80k/month</p>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>Feb 2, 2019 19:28</td>
                        <td>
                            <p className='flex items-center gap-2 text-[#0BA02C]'>
                                <IoCheckmarkSharp />
                                Active
                            </p>
                        </td>
                        <th>
                            <button>
                                <ButtonCommon btnName={"View Details"} customStyle={"text-sm bg-[#f1f2f4] text-[#0a65cc] hover:bg-[#0a65cc] hover:text-white"} />
                            </button>
                        </th>
                    </tr>
                    <tr>

                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div className='space-y-2'>
                                    <div className='flex items-center gap-2'>
                                        <h2 className="font-bold">Networking Engineer</h2>
                                        <span className='bg-[#e7f0fa] px-3 py-1 rounded-full text-[#0a65cc]'>Remote</span>
                                    </div>
                                    <div className="text-sm opacity-50 flex items-center gap-4">
                                        <p className='flex items-center gap-2'><CiLocationOn /> Washington</p>
                                        <p className='flex items-center gap-2'><MdAttachMoney /> 50k-80k/month</p>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>Feb 2, 2019 19:28</td>
                        <td>
                            <p className='flex items-center gap-2 text-[#0BA02C]'>
                                <IoCheckmarkSharp />
                                Active
                            </p>
                        </td>
                        <th>
                            <button>
                                <ButtonCommon btnName={"View Details"} customStyle={"text-sm bg-[#f1f2f4] text-[#0a65cc] hover:bg-[#0a65cc] hover:text-white"} />
                            </button>
                        </th>
                    </tr>
                    <tr>

                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div className='space-y-2'>
                                    <div className='flex items-center gap-2'>
                                        <h2 className="font-bold">Networking Engineer</h2>
                                        <span className='bg-[#e7f0fa] px-3 py-1 rounded-full text-[#0a65cc]'>Remote</span>
                                    </div>
                                    <div className="text-sm opacity-50 flex items-center gap-4">
                                        <p className='flex items-center gap-2'><CiLocationOn /> Washington</p>
                                        <p className='flex items-center gap-2'><MdAttachMoney /> 50k-80k/month</p>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>Feb 2, 2019 19:28</td>
                        <td>
                            <p className='flex items-center gap-2 text-[#0BA02C]'>
                                <IoCheckmarkSharp />
                                Active
                            </p>
                        </td>
                        <th>
                            <button>
                                <ButtonCommon btnName={"View Details"} customStyle={"text-sm bg-[#f1f2f4] text-[#0a65cc] hover:bg-[#0a65cc] hover:text-white"} />
                            </button>
                        </th>
                    </tr>
                    <tr>

                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div className='space-y-2'>
                                    <div className='flex items-center gap-2'>
                                        <h2 className="font-bold">Networking Engineer</h2>
                                        <span className='bg-[#e7f0fa] px-3 py-1 rounded-full text-[#0a65cc]'>Remote</span>
                                    </div>
                                    <div className="text-sm opacity-50 flex items-center gap-4">
                                        <p className='flex items-center gap-2'><CiLocationOn /> Washington</p>
                                        <p className='flex items-center gap-2'><MdAttachMoney /> 50k-80k/month</p>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>Feb 2, 2019 19:28</td>
                        <td>
                            <p className='flex items-center gap-2 text-[#0BA02C]'>
                                <IoCheckmarkSharp />
                                Active
                            </p>
                        </td>
                        <th>
                            <button>
                                <ButtonCommon btnName={"View Details"} customStyle={"text-sm bg-[#f1f2f4] text-[#0a65cc] hover:bg-[#0a65cc] hover:text-white"} />
                            </button>
                        </th>
                    </tr>

                </tbody>


            </table>
        </div>
    );
};

export default RecentAppliedJobTable;