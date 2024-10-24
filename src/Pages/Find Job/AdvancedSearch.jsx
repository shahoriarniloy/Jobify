import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { FaTh, FaList } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bookmark from "./Bookmark";
import { Link } from "react-router-dom";
import { EyeIcon } from "@heroicons/react/24/outline";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import ButtonLoader from "../../Shared/ButtonLoader";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import DashboardLoader from "../../Shared/DashboardLoader";
import useUserRole from "../../Hooks/useUserRole";

const AdvancedSearch = () => {
  const theme = useSelector((state) => state.theme.theme);
  const { role } = useUserRole();

  const { t } = useTranslation();
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const [filteredJobs, setFilteredJobs] = useState([]);

  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // console.log("Total jobs:", totalJobs);
  // console.log("item per page:", itemsPerPage);
  const noOfPages = Math.ceil(totalJobs / itemsPerPage);
  // console.log("no of page:", noOfPages);
  const pages = [...Array(noOfPages).keys()];
  // console.log("Total Jobs:", totalJobs);

  const [viewMode, setViewMode] = useState("grid");

  const [companyLogos, setCompanyLogos] = useState({});

  const [filters, setFilters] = useState({
    experience: [],
    jobType: [],
    education: [],
    jobLevel: [],
    salaryRange: [],
  });

  const {
    data: jobs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["load"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/jobs/advanced-search?page=${currentPage}&size=${itemsPerPage}`,
        {
          params: {
            searchTerm,
            location,
            experience: filters.experience.join(","),
            jobType: filters.jobType.join(","),
            education: filters.education.join(","),
            jobLevel: filters.jobLevel.join(","),
            salaryRange: filters.salaryRange.join(","),
          },
        }
      );
      if (!data.totalJobs) {
        toast.info("No matching data found");
      }
      return data.jobs;
    },
  });
  useEffect(() => {
    refetch();
  }, [currentPage, itemsPerPage]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setShowAdvancedFilters(false);
    refetch();
  };

  const handleCheckboxChange = (category, value) => {
    setFilters((prevFilters) => {
      if (prevFilters[category].includes(value)) {
        return {
          ...prevFilters,
          [category]: [],
        };
      }

      return {
        ...prevFilters,
        [category]: [value],
      };
    });
  };

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

  if (isLoading) return <DashboardLoader />;
  // console.log(jobs[0])

  return (
    <div className={theme === "dark" ? "" : "bg-secondary"}>
      <div className="container mx-auto">
        <div className="w-full  rounded-lg  p-6 flex-1">
          <form
            className="flex flex-col sm:flex-row gap-4 sm:gap-2"
            onSubmit={handleSearch}
          >
            <div className="relative flex-1">
              <AiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0a65cc] w-5 h-5" />
              <input
                type="text"
                placeholder={t("job_title_company_name_placeholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={
                  theme === "dark"
                    ? "w-full pl-12 pr-3 py-3 sm:py-4 bg-slate-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                    : "w-full pl-12 pr-3 py-3 sm:py-4 bg-white  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                }
               
              />
            </div>

            <div className="hidden sm:block w-px h-full bg-gray-300"></div>

            <div className="relative flex-1">
              <HiOutlineLocationMarker className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0a65cc] w-5 h-5" />
              <input
                type="text"
                placeholder={t("location_placeholder")}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={
                  theme === "dark"
                    ? "w-full pl-12 pr-3 py-3 sm:py-4 bg-slate-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                    : "w-full pl-12 pr-3 py-3 sm:py-4 bg-white  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                }
              />
            </div>
            <div
              className={
                theme === "dark"
                  ? "bg-slate-900 text-white rounded-md"
                  : "bg-white text-gray-400 rounded-md"
              }
            >
              <button
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="pl-8 py-3"
              >
                {showAdvancedFilters
                  ? t("hide_advanced_filters")
                  : t("show_advanced_filters")}
              </button>
              <button
                type="button"
                title="Toggle dropdown"
                className="p-3 "
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="flex justify-center mt-4 sm:mt-0 sm:ml-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-700 rounded-md text-white font-semibold text-base transition duration-300 ease-in-out hover:from-blue-700 hover:to-blue-900"
              >
                {t("find_job_button")}
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        {showAdvancedFilters && (
          <div className="grid lg:grid-cols-5 md:grid-cols-5 grid-cols-1 px-24 py-8 rounded-lg mt-4 bg-white shadow-xl">
            <div
              className={
                theme === "dark"
                  ? "bg-white text-slate-900 mb-4"
                  : "bg-white mb-4"
              }
            >
              <h3 className="font-medium">{t("experience_heading")}</h3>

              {[
                t("freshers"),
                t("one_to_two_years"),
                t("two_to_four_years"),
                t("four_to_six_years"),
                t("six_to_eight_years"),
                t("eight_to_ten_years"),
                t("ten_to_fifteen_years"),
                t("fifteen_plus_years"),
              ].map((exp) => (
                <label key={exp} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value={exp}
                    checked={filters.experience.includes(exp)}
                    onChange={() => handleCheckboxChange("experience", exp)}
                    className="w-5 h-5 relative bg-white rounded-[3px] border border-[#9dc1eb] focus:outline-none cursor-pointer"
                  />
                  <span className="ml-2">{exp}</span>
                </label>
              ))}
            </div>

            <div
              className={
                theme === "dark"
                  ? "bg-white text-slate-900 mb-4"
                  : "bg-white mb-4"
              }
            >
              <h3 className="font-medium">{t("job_type_heading")}</h3>
              {[
                t("all"),
                t("full_time"),
                t("part_time"),
                t("internship"),
                t("remote"),
                t("temporary"),
                t("contract_based"),
              ].map((type) => (
                <label key={type} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value={type}
                    checked={filters.jobType.includes(type)}
                    onChange={() => handleCheckboxChange("jobType", type)}
                    className="w-5 h-5 relative bg-white rounded-[3px] border border-[#9dc1eb] focus:outline-none cursor-pointer"
                  />
                  <span className="ml-2">{type}</span>
                </label>
              ))}
            </div>

            <div
              className={
                theme === "dark"
                  ? "bg-white text-slate-900 mb-4"
                  : "bg-white mb-4"
              }
            >
              <h3 className="font-medium">{t("education")}</h3>
              {[
                t("high_school"),
                t("intermediate"),
                t("graduation"),
                t("bachelor_degree"),
                t("master_degree"),
              ].map((edu) => (
                <label key={edu} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value={edu}
                    checked={filters.education.includes(edu)}
                    onChange={() => handleCheckboxChange("education", edu)}
                    className="w-5 h-5 relative bg-white rounded-[3px] border border-[#9dc1eb] focus:outline-none cursor-pointer"
                  />
                  <span className="ml-2">{edu}</span>
                </label>
              ))}
            </div>

            <div
              className={
                theme === "dark"
                  ? "bg-white text-slate-900 mb-4"
                  : "bg-white mb-4"
              }
            >
              <h3 className="font-medium">{t("job_level")}</h3>
              {[t("entry_level"), t("mid_level"), t("expert_level")].map(
                (level) => (
                  <label key={level} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      value={level}
                      checked={filters.jobLevel.includes(level)}
                      onChange={() => handleCheckboxChange("jobLevel", level)}
                      className="w-5 h-5 relative bg-white rounded-[3px] border border-[#9dc1eb] focus:outline-none cursor-pointer"
                    />
                    <span className="ml-2">{level}</span>
                  </label>
                )
              )}
            </div>

            <div
              className={
                theme === "dark"
                  ? "bg-white text-slate-900 mb-4"
                  : "bg-white mb-4"
              }
            >
              <h3 className="font-medium">{t("salary_heading")}</h3>
              {[
                t("salary_500_1000"),
                t("salary_1000_2000"),
                t("salary_3000_4000"),
                t("salary_4000_6000"),
                t("salary_6000_8000"),
                t("salary_8000_10000"),
                t("salary_10000_15000"),
                t("salary_15000_plus"),
              ].map((salary) => (
                <label key={salary} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value={salary}
                    checked={filters.salaryRange.includes(salary)}
                    onChange={() => handleCheckboxChange("salaryRange", salary)}
                    className="w-5 h-5 relative bg-white rounded-[3px] border border-[#9dc1eb] focus:outline-none cursor-pointer"
                  />
                  <span className="ml-2">{salary}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center lg:gap-4 md:gap-4 gap-2 mt-4">
            <label
              htmlFor="itemsPerPage"
              className={theme === "dark" ? "text-sm font-medium text-gray-300" : "text-sm font-medium text-blue-900"}
            >
              {t("number_of_jobs_per_page")}
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPage}
              className={
                theme === "dark"
                  ? "lg:px-4 md:px-4 px-2 py-1 rounded-lg bg-gray-400 text-slate-800 border border-slate-800 focus:border-slate-900 focus:ring focus:ring-blue-200"
                  : "lg:px-4 md:px-4 px-2 py-1 rounded-lg bg-white text-blue-900 border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              }
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>

          <div className="view-toggle flex justify-end mt-2 gap-4">
            <button
              onClick={() => setViewMode("list")}
              className="flex items-center"
            >
              <FaList className="mr-2" />
              {t("view_list")}
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className="flex items-center"
            >
              <FaTh className="mr-2" />
              {t("view_grid")}
            </button>
          </div>
        </div>

        {viewMode === "list" ? (
          <div className=" p-2 sm:p-4 dark:text-gray-800 mt-4">
            <div className="overflow-x-auto">
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs sm:text-sm">
                  <thead className="dark:bg-gray-300">
                    <tr className="text-left">
                      <th className="p-3">{t("job_title")}</th>
                      <th className="p-3">Vacancy</th>
                      <th className="p-3 hidden md:table-cell">Job Type</th>
                      <th className="p-3 hidden md:table-cell">
                        {t("salary")}
                      </th>
                      <th className="p-3">{t("details")}</th>
                      <th className="p-3 lg:table-cell">{t("bookmark")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs?.map(({ _id, jobInfo, companyInfo }) => (
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
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{jobInfo?.title}</div>
                              <div className="text-sm opacity-50">
                                {companyInfo?.company_name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="block text-sm font-semibold ">
                            {jobInfo?.vacancy}
                          </span>
                          <span className="block text-xs text-gray-500 md:hidden"></span>
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
                          <p className="btn btn-outline btn-accent btn-sm">
                            <Bookmark jobId={_id} />
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
            {jobs?.map(({ _id, jobInfo, companyInfo }) => (
              <div
                key={_id}
                className={ theme === "dark" ? " w-full relative group cursor-pointer overflow-hidden bg-slate-700 bg-opacity-50 px-6  py-8 ring-1 ring-gray-900/5 transition-all duration-300  sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10 hover:scale-95" : " w-full relative group cursor-pointer overflow-hidden bg-white px-6  py-8 ring-1 ring-gray-900/5 transition-all duration-300  sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10 hover:scale-95"}
              >
                <span className="absolute top-10 z-0 h-20 w-20 rounded-full  duration-300 "></span>
                <div className="relative z-10 mx-auto max-w-md">
                  <span className="grid size-[60px] place-items-center rounded-full ">
                    <img
                      src={companyInfo?.company_logo}
                      className="h-full w-full rounded-full transition-all"
                    />
                  </span>
                  <div className={ theme === "dark" ? "pt-5 text-base  text-gray-300 transition-all duration-300 " : "pt-5 text-base  text-gray-600 transition-all duration-300 "}>
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

                    {role === "Job Seeker" && (
                      <div className="absolute -top-4 -right-6">
                        <Bookmark jobId={_id} />
                      </div>
                    )}
                  </div>
                  <div className="pt-5 text-base font-semibold leading-7">
                    <Link
                      to={`/job/${_id}`}
                      className= { theme === "dark" ? "text-gray-200 transition-all duration-300  flex items-center" :"text-slate-500 transition-all duration-300  flex items-center"}
                    >
                      {t("view_details")}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="p-4 flex justify-center items-center">
          <button
            className="px-4 py-2 mr-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
          >
            <FaArrowLeft />
          </button>
          <div className="flex gap-2 text-slate-800">
            {pages.map((page) => (
              <button
                key={page}
                className={`px-4 py-2 rounded-lg ${
                  page === currentPage ? "bg-blue-200" : "bg-gray-300"
                } border border-blue-300`}
                onClick={() => setCurrentPage(page)}
              >
                {page + 1}
              </button>
            ))}
          </div>
          <button
            className="px-4 py-2 ml-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            onClick={handleNextPage}
            disabled={currentPage === pages.length - 1}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
