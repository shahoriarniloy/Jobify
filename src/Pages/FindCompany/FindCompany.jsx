import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { FaTh, FaList } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import TopCompanies from "./TopCompanies";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FindCompany = () => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const theme = useSelector((state) => state.theme.theme);

  const [totalCompanies, setTotalCompanies] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const noOfPages = Math.ceil(totalCompanies / itemsPerPage);
  const pages = [...Array(noOfPages).keys()];

  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axiosSecure.get(
          `/companies?page=${currentPage}&size=${itemsPerPage}`
        );
        setCompanies(response.data.Companies);
        setTotalCompanies(response.data.totalCompanies);
      } catch (err) {
        // console.error("Error fetching Companies:", err);
      }
    };

    fetchCompanies();
  }, [currentPage, itemsPerPage, totalCompanies]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setCompanies([]);

    setShowAdvancedFilters(false);

    try {
      const response = await axiosSecure.get(
        `/Companies?page=${currentPage}&size=${itemsPerPage}`,
        {
          params: {
            searchTerm,
          },
        }
      );
      setFilteredCompanies(response.data.Companies);

      setTotalCompanies(response.data.totalCompanies);
      if (!response.data.totalCompanies) {
        toast.info("No matching data found");
      }
    } catch (err) {
      // console.error("Error fetching Companies:", err);
      setError("Failed to fetch Companies. Please try again later.");
    }
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
    <div className={theme === "dark" ? "" : "bg-secondary"}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center pt-12">
          <div className="flex items-center lg:gap-4 md:gap-4 gap-2 mt-4 w-1/3">
            <label
              htmlFor="itemsPerPage"
              className="text-sm font-medium text-blue-900 "
            >
              Number of Companies Per Page:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPage}
              className="lg:px-4 md:px-4 px-2 py-1 rounded-lg bg-white text-blue-900 border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>

          <div className="w-1/3">
            <form
              className="flex flex-col sm:flex-row gap-4 sm:gap-2"
              onSubmit={handleSearch}
            >
              <div className="relative flex-1">
                <AiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0a65cc] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-3 py-3 sm:py-4 bg-white rounded-md focus:outline-none focus:ring-2
        focus:ring-blue-500 transition duration-300 ease-in-out"
                />
              </div>

              <div className="hidden sm:block w-px h-full bg-gray-300"></div>

              <div className="flex justify-center mt-4 sm:mt-0 sm:ml-2">
                <button
                  type="submit"
                  className="btn bg-gradient-to-r from-blue-500 to-blue-700 rounded-md text-white  hover:from-blue-700 hover:to-blue-900"
                >
                  Find Company
                </button>
              </div>
            </form>
          </div>

          <div className="view-toggle flex justify-end mt-2 gap-4 w-1/3">
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
                      <th className="p-3">Company Name</th>
                      <th className="p-3 hidden md:table-cell">Industry</th>
                      <th className="p-3">Size</th>
                      <th className="p-3">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(filteredCompanies.length > 0
                      ? filteredCompanies
                      : companies
                    ).map((company) => (
                      <tr
                        key={company.email}
                        className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                      >
                        <td className="p-3">
                          <span className="block text-sm font-semibold ">
                            {company.company_name}
                          </span>
                          <span className="block text-xs text-gray-500 md:hidden">
                            {company.industry}
                          </span>
                        </td>
                        <td className="p-3 hidden md:table-cell">
                          {company.industry}
                        </td>
                        <td className="p-3">{company.company_size}</td>
                        <td className="p-3">
                          <Link to={`/company-details/${company.email}`}>
                            {" "}
                            <button className=" px-3 py-1 rounded">
                              <EyeIcon className="h-5 w-5 inline-block mr-1" />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4  gap-8 mt-16 ">
            {(filteredCompanies.length > 0 ? filteredCompanies : companies).map(
              (company) => (
                <div
                  key={company.email}
                  className="relative max-w-sm rounded-md   border-2 border-gray-300 shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out "
                >
                  <div className="flex flex-col justify-between p-6 space-y-8">
                    <div className="flex items-center gap-3">
                      <img
                        src={company.company_logo}
                        alt={`${company.company_name} logo`}
                        className="w-16 h-16 rounded-full border-4 border-blue-500"
                      />
                      <div>
                        <h2 className="text-2xl font-semibold">
                          {company.company_name}
                        </h2>
                        <p className="text-blue-500 h-6">{company.industry}</p>
                      </div>
                    </div>
                    <div className="mt-14 space-y-2 text-justify">
                      <p className=" text-sm">{company.company_description.slice(0,250)} ...</p>
                    </div>
                    <Link to={`/company-details/${company.email}`}>
                      <button className=" text-blue-500 px-3 py-2 rounded w-full underline">
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              )
            )}
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
            aria-label="next"
            disabled={currentPage === pages.length - 1}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindCompany;
