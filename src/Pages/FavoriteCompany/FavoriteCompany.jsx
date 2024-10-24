import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ButtonLoader from "../../Shared/ButtonLoader";
import Bookmark from "../Find Job/Bookmark";
import { Helmet } from "react-helmet";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { useQuery } from "@tanstack/react-query";
import DashboardLoader from "../../Shared/DashboardLoader";

const FavoriteCompany = () => {
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["lod favorite job"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/users/${currentUser?.email}/latest-jobs`
      );
      return data.jobs;
    },
  });

  if (isLoading) return <DashboardLoader />;

  return (
    <div className="container mx-auto">
       <Helmet>
        <title>Jobify - Favorite Company</title>
      </Helmet>
     
      <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-3 gap-8 mt-4">
        {jobs?.map(({ _id, jobInfo, companyInfo }) => (
          <div
            key={_id}
            className=" w-full relative group cursor-pointer overflow-hidden bg-white px-6  py-8 ring-1 ring-gray-900/5 transition-all duration-300  sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10 hover:scale-95"
          >
            <span className="absolute top-10 z-0 h-20 w-20 rounded-full  duration-300 "></span>
            <div className="relative z-10 mx-auto max-w-md">
              <span className="grid size-[60px] place-items-center rounded-full ">
                <img
                  src={companyInfo?.company_logo}
                  className="h-full w-full rounded-full transition-all"
                />
              </span>
              <div className="pt-5 text-base  text-gray-600 transition-all duration-300 ">
                <h2 className="text-2xl font-semibold tracking-wide flex gap-2">
                  {jobInfo?.title}
                  <div className="p-2 rounded-full text-xs bg-[#1d4fd83a] size-[28px] flex justify-center items-center">
                    {jobInfo?.vacancy}
                  </div>
                </h2>
                <p className="font-semibold">{companyInfo?.company_name}</p>
                <p className="text-sm tracking-wide mt-3">
                  <span className="font-semibold">Category: </span>
                  {jobInfo?.jobCategory}
                </p>
                <p className="text-sm tracking-wide mt-1">
                  <span className="font-semibold">Job Type: </span>
                  {jobInfo?.jobType}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-semibold">Salary Range : </span>
                  {jobInfo?.salaryRange}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-semibold">Job Level : </span>
                  {jobInfo?.jobLevel}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-semibold">Deadline : </span>
                  {jobInfo?.deadline}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-semibold">Location : </span>
                  {jobInfo?.location}
                </p>

                <div className="absolute -top-4 -right-6">
                  <Bookmark jobId={_id} />
                </div>
              </div>
              <div className="pt-5 text-base font-semibold leading-7">
                <Link
                  to={`/job/${_id}`}
                  className="text-slate-500 transition-all duration-300  flex items-center"
                >
                  {t("view_details")}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteCompany;
