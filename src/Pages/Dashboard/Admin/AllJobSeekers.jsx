import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaSearch,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import axiosSecure from "../../../Hooks/UseAxiosSecure";

const AllJobSeekers = () => {
  const [jobSeekers, setJobSeekers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalJobSeekers, setTotalJobSeekers] = useState(0);
  const [pages, setPages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchJobSeekers = async () => {
    try {
      const response = await axiosSecure.get("/job-seekers", {
        params: {
          page: currentPage,
          size: itemsPerPage,
          searchTerm,
        },
      });
      setJobSeekers(response.data);
      const totalSeekers = response.data.length;
      setTotalJobSeekers(totalSeekers);
      const totalPages = Math.ceil(totalSeekers / itemsPerPage);
      setPages([...Array(totalPages).keys()]);
    } catch (error) {
      console.error("Failed to fetch job seekers", error);
    }
  };

  useEffect(() => {
    fetchJobSeekers();
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

  const handleEdit = (id) => {
    window.location.href = `/edit-job-seeker/${id}`;
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job seeker?")) {
      try {
        await axiosSecure.delete(`/job-seekers/${id}`);
        fetchJobSeekers();
      } catch (error) {
        console.error("Failed to delete job seeker", error);
      }
    }
  };

  return (
    <div className="job-seekers-container">
      <div className="flex items-center justify-center gap-4 mt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search Job Seekers by Name..."
          className="lg:px-4 md:px-4 px-2 py-1 rounded-lg bg-white text-blue-900 border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        <FaSearch className="text-blue-500" />
      </div>

      <div className="flex items-center justify-center lg:gap-4 md:gap-4 gap-2 mt-4">
        <label
          htmlFor="itemsPerPage"
          className="text-sm font-medium text-blue-900"
        >
          Number of Job Seekers Per Page:
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
                <th className="p-3">Name</th>
                <th className="p-3 hidden md:table-cell">Email</th>
                <th className="p-3 hidden md:table-cell">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobSeekers.map((jobSeeker) => (
                <tr
                  key={jobSeeker._id}
                  className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                >
                  <td className="p-3">{jobSeeker.name}</td>
                  <td className="p-3 hidden md:table-cell">
                    {jobSeeker.email}
                  </td>
                  <td className="p-3 hidden md:table-cell">{jobSeeker.role}</td>
                  <td className="p-3 flex gap-4">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleEdit(jobSeeker._id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(jobSeeker._id)}
                    >
                      <FaTrash />
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

export default AllJobSeekers;
