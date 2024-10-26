import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import Bookmark from "../../Find Job/Bookmark";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import DashboardLoader from "../../../Shared/DashboardLoader";
import { MdDeleteForever } from "react-icons/md";

const AllJobs = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pages, setPages] = useState([]);



  const { data: jobs, isLoading, refetch } = useQuery({
    queryKey: ["load-all-jobs"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/jobs", { params: { page: currentPage, size: itemsPerPage, }, });
      return data;
    }

  })


  useEffect(() => {
    refetch();
  }, [currentPage, itemsPerPage]);

  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(0);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  if (isLoading) return <DashboardLoader />
  return (
    <div className="jobs-container">
       <Helmet>
        <title>Jobify - All Jobs</title>
      </Helmet>
      <div className="flex items-center justify-center lg:gap-4 md:gap-4 gap-2 mt-4">
        <label
          htmlFor="itemsPerPage"
          className="text-sm font-medium text-blue-900"
        >
          {t("number_of_jobs_per_page")}:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPage}
          className="lg:px-4 md:px-4 px-2 py-1 rounded-lg bg-white text-blue-900 border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>

      <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800 mt-4">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm">
            <thead className="dark:bg-gray-300">

              <tr className="text-left">
                <th className="p-3">{t("job_title")}</th>
                <th className="p-3">Vacancy</th>
                <th className="p-3 hidden md:table-cell">
                  Job Type
                </th>
                <th className="p-3 hidden md:table-cell">
                  {t("salary")}
                </th>
                <th className="p-3">{t("details")}</th>
                <th className="p-3 lg:table-cell">{t("bookmark")}</th>

              </tr>
            </thead>
            <tbody>
              {jobs?.allJobs?.map(
                ({ _id, jobInfo, companyInfo }) => (
                  <tr
                    key={_id}
                    className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={companyInfo?.company_logo}
                              alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{jobInfo?.title}</div>
                          <div className="text-sm opacity-50">{companyInfo?.company_name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="block text-sm font-semibold ">
                        {jobInfo?.vacancy}
                      </span>
                      <span className="block text-xs text-gray-500 md:hidden">

                      </span>
                    </td>
                    <td className="p-3 hidden md:table-cell">
                      {jobInfo?.jobType}
                    </td>
                    <td className="p-3 hidden md:table-cell">
                      {jobInfo?.salaryRange}
                    </td>
                    <td className="p-3">
                      <Link to={`/job/${_id}`}>
                        <button className="btn btn-outline btn-info btn-sm">
                          View Details
                        </button>
                      </Link>
                    </td>
                    <td className="p-3  lg:table-cell">
                      <button className="btn btn-outline btn-error hover:text-white btn-sm">
                        <MdDeleteForever className="text-xl " />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 flex justify-center items-center">
        <button
          className="px-4 py-2 mr-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          aria-label={t("previous_page")}
        >
          <FaArrowLeft />
        </button>
        <div className="flex gap-2">
          {pages.map((page) => (
            <button
              key={page}
              className={`px-4 py-2 rounded-lg ${page === currentPage ? "bg-blue-200" : "bg-white"
                } border border-blue-300`}
              onClick={() => setCurrentPage(page)}
              aria-label={`${t("page")} ${page + 1}`}
            >
              {page + 1}
            </button>
          ))}
        </div>
        <button
          className="px-4 py-2 ml-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          onClick={handleNextPage}
          disabled={currentPage === pages.length - 1}
          aria-label={t("next_page")}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default AllJobs;
