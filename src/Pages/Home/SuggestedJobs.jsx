import React from 'react';
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';




const SuggestedJobs = ({ jobs, isLoading }) => {
    const { t } = useTranslation();
    const theme = useSelector((state) => state.theme.theme);
    if (isLoading) return
    return (
        <>
            <div className='container mx-auto my-[100px]'>
                <h1
                    className={
                        theme === "dark"
                            ? "text-3xl font-semibold mb-2 tracking-wider text-white text-center "
                            : "text-3xl font-semibold mb-2 tracking-wider text-black text-center "
                    }
                >
                    {t("Most Popular Job")}
                </h1>

                <div className='mt-[50px]'>
                    {jobs?.slice(0,5)?.map(({ _id, jobInfo, companyInfo }) =>
                        <div key={_id} className='flex justify-between items-center border p-8 hover:border-[#0a65cc]  shadow-sm rounded-lg mb-6'>
                            <div className='flex items-center gap-5'>
                                <div>
                                    <img className='size-[48px]' src={companyInfo?.company_logo} alt="" />
                                </div>

                                <div>
                                    <div className='flex items-start gap-4'>
                                        <h2 className='text-[20px] font-semibold hover:text-[#0a65cc] cursor-pointer'><Link>{jobInfo?.title}</Link></h2> <span className='text-[#0a65cc] bg-[#e8f1ff] px-4 py-1 rounded-full text-xs'>{jobInfo?.jobType}</span>
                                    </div>

                                    <div className='flex items-center gap-8 *:flex *:items-center *:gap-2 *:text-gray-500 mt-4'>
                                        <p><IoLocationOutline className='text-xl' /> <span>{jobInfo?.location}</span></p>
                                        <p><MdOutlineAttachMoney className='text-xl' />{jobInfo?.salaryRange}</p>
                                        <p><FaRegCalendarAlt className='text-xl' /> <span>{jobInfo?.posted}</span></p>
                                    </div>
                                </div>
                            </div>


                            {/* button */}
                            <div className='flex items-center gap-3'>
                                <button className='btn bg-transparent border-none outline-none shadow-none hover:bg-[#e8f1ff] hover:text-[#0a65cc]'>
                                    <MdOutlineBookmarkBorder className='text-2xl'/>
                                </button>

                                <button className='btn rounded-none bg-[#e7f0fa] text-[#0a65cc] hover:bg-[#0a65cc] hover:text-white'>
                                    Apply Now <FaArrowRight/>
                                </button>
                            </div>

                        </div>

                    )}

                </div>

            </div>
        </>
    );
};

export default SuggestedJobs;



