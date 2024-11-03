import React from 'react';
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Bookmark from '../Find Job/Bookmark';




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

                <div className="mt-[50px]">
    {jobs?.slice(0, 5)?.map(({ _id, jobInfo, companyInfo }) => (
        <div 
            key={_id} 
            className="flex flex-col md:flex-row justify-between items-start md:items-center border p-4 md:p-8 hover:border-[#0a65cc] shadow-sm rounded-lg mb-6"
        >
            {/* Job and Company Info */}
            <div className="flex items-start md:items-center gap-4 md:gap-5 w-full md:w-auto">
                {/* Company Logo */}
                <div className="flex-shrink-0">
                    <img 
                        className="w-[48px] h-[48px] object-cover rounded-full" 
                        src={companyInfo?.company_logo} 
                        alt="" 
                    />
                </div>

                {/* Job Details */}
                <div className="flex-1">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                        <h2 className="text-lg md:text-[20px] font-semibold hover:text-[#0a65cc] cursor-pointer">
                            <Link>{jobInfo?.title}</Link>
                        </h2>
                        <span className="text-[#0a65cc] bg-[#e8f1ff] px-2 md:px-4 py-1 rounded-full text-xs">
                            {jobInfo?.jobType}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 md:gap-8 text-gray-500 mt-2 md:mt-4">
                        <p className="flex items-center gap-1 text-sm">
                            <IoLocationOutline className="text-lg" /> 
                            <span>{jobInfo?.location}</span>
                        </p>
                        <p className="flex items-center gap-1 text-sm">
                            <MdOutlineAttachMoney className="text-lg" />
                            {jobInfo?.salaryRange}
                        </p>
                        <p className="flex items-center gap-1 text-sm">
                            <FaRegCalendarAlt className="text-lg" /> 
                            <span>{jobInfo?.posted}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex mt-4 md:mt-0 items-center gap-2 md:gap-3 self-stretch md:self-auto">
                <button 
                    className="btn bg-transparent border-none outline-none shadow-none hover:bg-[#e8f1ff] hover:text-[#0a65cc] p-2 md:p-3"
                >
<Bookmark jobId={_id} />                </button>

<Link to={`/job/${_id}`}><button 
                    className="btn rounded-md md:rounded-none bg-[#e7f0fa] text-[#0a65cc] hover:bg-[#0a65cc] hover:text-white px-4 py-2 md:px-6 md:py-3 flex items-center gap-1 text-sm md:text-base"
                >
                    Apply Now 
                    <FaArrowRight />
                </button></Link>
            </div>
        </div>
    ))}
</div>


            </div>
        </>
    );
};

export default SuggestedJobs;



