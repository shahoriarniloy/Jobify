import { useState, useEffect } from "react";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import JobSeekerCard from "./JobSeekerCard";
import { AiOutlineSearch } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";

const FindJobSeeker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobSeekers, setJobSeekers] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      setError("Please enter a valid search term.");
      return;
    }
    setError(null);
  };

  useEffect(() => {
    const fetchJobSeekers = async () => {
      try {
        const response = await axiosSecure.get(`/job-seekers`, {
          params: { searchTerm },
        });
        setJobSeekers(response.data);
      } catch (error) {
        // console.error("Error fetching job seekers:", error);
      }
    };

    fetchJobSeekers();
  }, [searchTerm]);

  return (
    <div>
      <div className="flex items-center mb-4">
        <h1 className="text-lg text-blue-500 font-semibold flex items-center">
          Find People to Follow
          <span className="ml-2">
            <HiOutlineUserGroup className="text-blue-500 text-2xl" />
          </span>
        </h1>
      </div>
      <div className="w-full bg-[#f6f8f8] rounded-lg flex-1 ">
        <form
          className="flex flex-col sm:flex-row gap-4 sm:gap-2"
          onSubmit={handleSearch}
        >
          <div className="relative flex-1">
            <AiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0a65cc] w-5 h-5" />
            <input
              type="text"
              placeholder="Name"
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
              Find
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-4 gap-6">
        {jobSeekers.map((jobSeeker) => (
          <JobSeekerCard key={jobSeeker.email} jobSeeker={jobSeeker} />
        ))}
      </div>
    </div>
  );
};

export default FindJobSeeker;
