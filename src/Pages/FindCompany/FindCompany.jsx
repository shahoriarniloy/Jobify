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
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import DashboardLoader from "../../Shared/DashboardLoader";

const FindCompany = () => {
  const { t } = useTranslation(); // Destructure useTranslation
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useSelector((state) => state.theme.theme);

  const [totalCompanies, setTotalCompanies] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const noOfPages = Math.ceil(totalCompanies / itemsPerPage);
  const pages = [...Array(noOfPages).keys()];

  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    refetch();
  }, [currentPage, itemsPerPage, totalCompanies]);

  // load all company
  const {
    data: companies = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["load all company"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/companies?page=${currentPage}&size=${itemsPerPage}`,
        { params: { searchTerm } }
      );
      setTotalCompanies(data?.totalCompanies);
      return data?.Companies;
    },
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    refetch();
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
  return (
    <div className={theme === "dark" ? "" : "bg-secondary"}>
      <Helmet>
        <title>Jobify - Companies</title>
      </Helmet>
      <div className="container mx-auto">
        <div className="flex justify-between items-center pt-12">
          <div className=" md:w-1/2">
            <form className="flex items-center gap-4" onSubmit={handleSearch}>
              <div className="relative flex-1">
                <AiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0a65cc] w-5 h-5" />
                <input
                  type="text"
                  placeholder={t("company_name")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={
                    theme === "dark"
                      ? "w-full pl-12 pr-3 py-3 sm:py-4 bg-slate-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                      : "w-full pl-12 pr-3 py-3 sm:py-4 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  }
                />
              </div>

              <div className="hidden sm:block w-px h-full bg-gray-300"></div>

              <button
                type="submit"
                className="btn bg-gradient-to-r from-blue-500 to-blue-700 rounded-md text-white  hover:from-blue-700 hover:to-blue-900"
              >
                {t("find_company")}
              </button>
            </form>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex  items-center lg:gap-4 md:gap-4 gap-2 mt-4">
              <label
                htmlFor="itemsPerPage"
                className="text-sm font-medium text-blue-900 "
              >
                {t("per_page")}
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPage}
                className="lg:px-4 md:px-4 px-2 py-1 rounded-lg bg-white text-blue-900 border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value="5">{t("option_5")}</option>
                <option value="10">{t("option_10")}</option>
                <option value="15">{t("option_15")}</option>
              </select>
            </div>
            <div className="view-toggle flex justify-end mt-2 gap-4 ">
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
        </div>

        {viewMode === "list" ? (
          <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800 mt-4">
            <div className="overflow-x-auto">
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs sm:text-sm">
                  <thead className="dark:bg-gray-300">
                    <tr className="text-left">
                      <th className="p-3">{t("company_name")}</th>
                      <th className="p-3 hidden md:table-cell">
                        {t("industry")}
                      </th>
                      <th className="p-3">{t("size")}</th>
                      <th className="p-3">{t("details")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies?.map((company) => (
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
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4  gap-8 mt-16 place-items-center md:place-items-stretch">
            {companies?.map((company) => (
              <div
                key={company.email}
                className={
                  theme === "dark"
                    ? "relative max-w-sm rounded-md    shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out bg-slate-700 bg-opacity-50 "
                    : "relative max-w-sm rounded-md   border-2 border-gray-300 shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out bg-white "
                }
              >
                <div className="flex flex-col justify-between p-6 space-y-8 ">
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
                    <p className=" text-sm">
                      {company.company_description?.slice(0, 250)} ...
                    </p>
                  </div>
                  <Link to={`/company-details/${company.email}`}>
                    <button className=" text-blue-500 px-3 py-2 rounded w-full underline">
                    {t("details")}
                    </button>
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
            {pages?.map((page) => (
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
