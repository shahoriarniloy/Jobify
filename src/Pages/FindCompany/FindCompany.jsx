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

const AdvancedSearch = () => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  const [totalCompanies, setTotalCompanies] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // console.log("Total Companies:", totalCompanies);
  // console.log("item per page:", itemsPerPage);
  const noOfPages = Math.ceil(totalCompanies / itemsPerPage);
  // console.log("no of page:", noOfPages);
  const pages = [...Array(noOfPages).keys()];
  // console.log("Total Companies:", totalCompanies);

  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axiosSecure.get(
          `/companies?page=${currentPage}&size=${itemsPerPage}`
        );
        // console.log(response.data);
        setCompanies(response.data.Companies);
        setTotalCompanies(response.data.totalCompanies);
        // console.log(totalCompanies);
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

    // console.log("Search Term:", searchTerm);

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

      // console.log("Companies", response.data);
      // console.log("try:", response.data.Companies);
      setTotalCompanies(response.data.totalCompanies);
      if (!response.data.totalCompanies) {
        toast.info("No matching data found");
      }

      // console.log(response.data);
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
    <div className=" pt-24 ">
      <div className="w-full bg-[#f6f8f8]  rounded-lg  p-6 flex-1">
        <form
          className="flex flex-col sm:flex-row gap-4 sm:gap-2"
          onSubmit={handleSearch}
        >
          <div className="relative flex-1">
            <AiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0a65cc] w-5 h-5" />
            <input
              type="text"
              placeholder="Job title, Keyword..."
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
              className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-700 rounded-md text-white font-semibold text-base transition duration-300 ease-in-out hover:from-blue-700 hover:to-blue-900"
            >
              Find Company
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {/* <h2 className="mb-4 text-2xl font-semibold leading-tight text-center mt-8">
    Companies
  </h2> */}

      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center lg:gap-4 md:gap-4 gap-2 mt-4">
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
                      key={company._id}
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
                        <Link to={`/company-details/${company._id}`}>
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
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4  mt-4 gap-6">
          {(filteredCompanies.length > 0 ? filteredCompanies : companies).map(
            (company) => (
              <div
                key={company._id}
                className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800"
              >
                <div className="flex flex-col justify-between p-6 space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-semibold h-24">
                      {company.company_name}
                    </h2>
                    <p className="text-blue-500 h-6">{company.industry}</p>

                    <p className="h-24"> {company.company_description}</p>
                    {/*
          <Bookmark companyId={company._id} /> */}
                  </div>
                  <Link to={`/company-details/${company.email}`}>
                    {" "}
                    <button className="bg-blue-500 text-white px-3 py-1 rounded">
                      <EyeIcon className="h-5 w-5 inline-block mr-1" />
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
          Prev
        </button>
        <div className="flex gap-2">
          {pages.map((page) => (
            <button
              key={page}
              className={`px-4 py-2 rounded-lg ${
                page === currentPage ? "bg-blue-200" : "bg-white"
              } border
        border-blue-300`}
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
          Next
        </button>
      </div>

      <TopCompanies></TopCompanies>
    </div>
  );
};

export default AdvancedSearch;
