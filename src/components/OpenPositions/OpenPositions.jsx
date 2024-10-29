import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import JobCardGrid from "../JobCardGrid/JobCardGrid";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook
import { useQuery } from "@tanstack/react-query";
import DashboardLoader from "../../Shared/DashboardLoader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";



const OpenPosition = ({ companyEmail }) => {
  const { t } = useTranslation(); // Initialize the translation function
  const theme = useSelector((state) => state.theme.theme);

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["fetch open position"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/OpenPosition?email=${companyEmail}`
      );
      return data;
    }
  });
  
  if (isLoading) return <DashboardLoader />

  return (
    <section className="container mx-auto">
      <h1 className={ theme === "dark"? "text-3xl font-semibold mb-2 tracking-wider text-white text-center" : "text-3xl font-semibold mb-2 tracking-wider text-black text-center"}>
        {t("available_jobs")}

      </h1>

      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
        {jobs?.map(({ _id, jobInfo, companyInfo }) => (
          <div
            key={_id}
            className={ theme === "dark"? " w-full relative group cursor-pointer overflow-hidden  bg-slate-700 bg-opacity-50 px-6  py-8 ring-1 ring-gray-900/5 transition-all duration-300  sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10 hover:scale-95" : " w-full relative group cursor-pointer overflow-hidden bg-white px-6  py-8 ring-1 ring-gray-900/5 transition-all duration-300  sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10 hover:scale-95"}
          >
            <span className="absolute top-10 z-0 h-20 w-20 rounded-full  duration-300 "></span>
            <div className="relative z-10 mx-auto max-w-md">
              <span className="grid size-[60px] place-items-center rounded-full ">
                <img
                  src={companyInfo?.company_logo}
                  className="h-full w-full rounded-full transition-all"
                />
              </span>
              <div className={theme === "dark"? "pt-5 text-base  text-slate-300 transition-all duration-300 " : "pt-5 text-base  text-gray-600 transition-all duration-300 "}>
                <h2 className="text-2xl font-semibold tracking-wide flex gap-2">
                  {jobInfo?.title}
                  <div className="p-2 rounded-full text-xs bg-[#1d4fd83a] size-[28px] flex justify-center items-center">
                    {jobInfo?.vacancy}
                  </div>
                </h2>
                <p className="font-semibold">{companyInfo?.company_name}</p>
                <p className="text-sm tracking-wide mt-3">
                  <span className="font-semibold">{t("category")}: </span>
                  {jobInfo?.jobCategory}
                </p>
                <p className="text-sm tracking-wide mt-1">
                  <span className="font-semibold">{t("job_type")}: </span>
                  {jobInfo?.jobType}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-semibold">{t("salary_range")}: </span>
                  {jobInfo?.salaryRange}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-semibold">{t("job_level")}: </span>
                  {jobInfo?.jobLevel}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-semibold">{t("deadline")}: </span>
                  {jobInfo?.deadline}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-semibold">{t("location")}: </span>
                  {jobInfo?.location}
                </p>
              </div>
              <div className="pt-5 text-base font-semibold leading-7">
                <Link
                  to={`/job/${_id}`}
                  className={ theme === "dark"? "text-slate-300 transition-all duration-300  flex items-center" : "text-slate-500 transition-all duration-300  flex items-center"}
                >
                  {t("view_details")}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OpenPosition;
