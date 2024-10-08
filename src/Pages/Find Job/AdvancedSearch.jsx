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

const AdvancedSearch = () => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [jobs, setJobs] = useState([]);

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

  const [filters, setFilters] = useState({
    experience: [],
    jobType: [],
    education: [],
    jobLevel: [],
    salaryRange: [],
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosSecure.get(
          `/jobs?page=${currentPage}&size=${itemsPerPage}`
        );
        // console.log(response.data);
        setJobs(response.data.jobs);
        setTotalJobs(response.data.totalJobs);
        // console.log(totalJobs);
      } catch (err) {
        // console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, [currentPage, itemsPerPage, totalJobs]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setJobs([]);

    setShowAdvancedFilters(false);

    // console.log("Search Term:", searchTerm);
    // console.log("Location:", location);
    // console.log("Filters:", filters);

    try {
      const response = await axiosSecure.get(
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
      setFilteredJobs(response.data.jobs);

      // console.log("jobs", response.data);
      // console.log("try:", response.data.jobs);
      setTotalJobs(response.data.totalJobs);
      if (!response.data.totalJobs) {
        toast.info("No matching data found");
      }

      // console.log(response.data);
    } catch (err) {
      // console.error("Error fetching jobs:", err);
      setError("Failed to fetch jobs. Please try again later.");
    }
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

  return (
    <div className="  pt-24 ">
      <div className="w-full bg-[#f6f8f8] rounded-lg  p-6 flex-1">
        <form
          className="flex flex-col sm:flex-row gap-4 sm:gap-2"
          onSubmit={handleSearch}
        >
          <div className="relative flex-1">
            <AiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0a65cc] w-5 h-5" />
            <input
              type="text"
              placeholder="Job title, Company Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-3 py-3 sm:py-4 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
          </div>

          <div className="hidden sm:block w-px h-full bg-gray-300"></div>

          <div className="relative flex-1">
            <HiOutlineLocationMarker className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0a65cc] w-5 h-5" />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-12 pr-3 py-3 sm:py-4 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
          </div>
          <div className=" bg-white text-gray-400 rounded-md">
            <button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="pl-8 py-3"
            >
              {showAdvancedFilters
                ? "Hide Advanced Filters"
                : "Show Advanced Filters"}
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
              Find Job
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
      {showAdvancedFilters && (
        <div className="grid lg:grid-cols-5 md:grid-cols-5 grid-cols-1 px-24 py-8 rounded-lg mt-4 bg-white shadow-xl">
          <div className="mb-4">
            <h3 className="font-medium">Experience</h3>
            {[
              "Freshers",
              "1-2 Years",
              "2-4 Years",
              "4-6 Years",
              "6-8 Years",
              "8-10 Years",
              "10-15 Years",
              "15+ Years",
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

          <div className="mb-4">
            <h3 className="font-medium">Job Type</h3>
            {[
              "All",
              "Full Time",
              "Part Time",
              "Internship",
              "Remote",
              "Temporary",
              "Contract Based",
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

          <div className="mb-4">
            <h3 className="font-medium">Education</h3>
            {[
              "High School",
              "Intermediate",
              "Graduation",
              "Bachelor Degree",
              "Master Degree",
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

          <div className="mb-4">
            <h3 className="font-medium">Job Level</h3>
            {["Entry Level", "Mid Level", "Expert Level"].map((level) => (
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
            ))}
          </div>

          <div className="mb-4">
            <h3 className="font-medium">Salary</h3>
            {[
              "$500-$1000",
              "$1000-$2000",
              "$3000-$4000",
              "$4000-$6000",
              "$6000-$8000",
              "$8000-$10000",
              "$10000-$15000",
              "$15000+",
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
      {/* <h2 className="mb-4 text-2xl font-semibold leading-tight text-center mt-8">
        Jobs
      </h2> */}
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center lg:gap-4 md:gap-4 gap-2 mt-4">
          <label
            htmlFor="itemsPerPage"
            className="text-sm font-medium text-blue-900 "
          >
            Number of Jobs Per Page:
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

        <div className="view-toggle flex justify-end mt-2 gap-4">
          <button
            onClick={() => setViewMode("list")}
            className="flex items-center"
          >
            <FaList className="mr-2" />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className="flex items-center"
          >
            <FaTh className="mr-2" />
          </button>
        </div>
      </div>
      {viewMode === "list" ? (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800 mt-4">
          <div className="overflow-x-auto">
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs sm:text-sm">
                <thead className="dark:bg-gray-300">
                  <tr className="text-left">
                    <th className="p-3">Job Title</th>
                    <th className="p-3 hidden md:table-cell">Company</th>
                    <th className="p-3 hidden md:table-cell">Salary</th>
                    <th className="p-3">Details</th>
                    <th className="p-3 hidden lg:table-cell">Bookmark</th>
                  </tr>
                </thead>
                <tbody>
                  {(filteredJobs.length > 0 ? filteredJobs : jobs).map(
                    (job) => (
                      <tr
                        key={job._id}
                        className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                      >
                        <td className="p-3">
                          <span className="block text-sm font-semibold">
                            {job.title}
                          </span>
                          <span className="block text-xs text-gray-500 md:hidden">
                            {job.company}
                          </span>
                        </td>
                        <td className="p-3 hidden md:table-cell">
                          {job.company}
                        </td>
                        <td className="p-3 hidden md:table-cell">
                          {job.salaryRange}
                        </td>
                        <td className="p-3">
                          <Link to={`/job/${job._id}`}>
                            <button className=" hover:underline">
                              <EyeIcon className="h-5 w-5 inline-block mr-1" />
                            </button>
                          </Link>
                        </td>
                        <td className="p-3 hidden lg:table-cell">
                          <Bookmark jobId={job._id} />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {(filteredJobs.length > 0 ? filteredJobs : jobs).map((job) => (
            <div
              key={job._id}
              className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800"
            >
              <div className="flex flex-col justify-between p-6 space-y-8">
                <div className="space-y-2 flex flex-col">
                  <div className="h-24 ">
                    <h2 className="text-3xl font-semibold tracking-wide">
                      {job.title}
                    </h2>
                  </div>
                  <div className="h-6">
                    <p className="text-blue-500">{job.company}</p>
                  </div>
                  <div className="h-6">
                    <p>Salary: {job.salaryRange}</p>
                  </div>
                </div>
                <Bookmark jobId={job._id} />

                <Link
                  to={`/job/${job._id}`}
                  className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-gradient-to-r from-blue-500 to-blue-700 dark:text-gray-50"
                >
                  <EyeIcon className="h-5 w-5 inline-block mr-1" />
                  Details
                </Link>
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
        <div className="flex gap-2">
          {pages.map((page) => (
            <button
              key={page}
              className={`px-4 py-2 rounded-lg ${
                page === currentPage ? "bg-blue-200" : "bg-white"
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
  );
};

export default AdvancedSearch;
