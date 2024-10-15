import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaEdit, FaTrashAlt } from "react-icons/fa";
import axiosSecure from "../../../Hooks/UseAxiosSecure";

const AllCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [pages, setPages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCompanies = async () => {
    try {
      const response = await axiosSecure.get("/companies", {
        params: {
          page: currentPage,
          size: itemsPerPage,
          searchTerm,
        },
      });
      setCompanies(response.data.Companies);
      setTotalCompanies(response.data.totalCompanies);
      const totalPages = Math.ceil(response.data.totalCompanies / itemsPerPage);
      setPages([...Array(totalPages).keys()]);
    } catch (error) {
      // console.error("Failed to fetch companies", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [currentPage, itemsPerPage, searchTerm]);

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const handleEdit = (companyId) => {
    // console.log(`Edit company with ID: ${companyId}`);
  };

  const handleDelete = async (companyId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );
    if (confirmDelete) {
      try {
        await axiosSecure.delete(`/companies/${companyId}`);
        fetchCompanies();
        // console.log(`Deleted company with ID: ${companyId}`);
      } catch (error) {
        // console.error("Failed to delete company", error);
      }
    }
  };

  return (
    <div className="companies-container">
      <div className="flex items-center justify-center gap-4 mt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search Companies..."
          className="lg:px-4 md:px-4 px-2 py-1 rounded-lg bg-white text-blue-900 border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="flex items-center justify-center lg:gap-4 md:gap-4 gap-2 mt-4">
        <label
          htmlFor="itemsPerPage"
          className="text-sm font-medium text-blue-900"
        >
          Number of Companies Per Page:
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
                <th className="p-3">Company Name</th>
                <th className="p-3">Industry</th>
                <th className="p-3 hidden md:table-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr
                  key={company._id}
                  className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                >
                  <td className="p-3">{company.company_name}</td>
                  <td className="p-3">{company.industry}</td>
                  <td className="p-3 flex space-x-4 hidden md:table-cell">
                    <button
                      onClick={() => handleEdit(company._id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(company._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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

export default AllCompanies;
