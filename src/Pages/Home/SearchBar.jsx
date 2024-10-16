import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaBriefcase, FaBuilding } from "react-icons/fa";
import { useState, useEffect } from "react";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { Link } from "react-router-dom";
import homeBg from "../../assets/homebg.png";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(0);

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const jobsResponse = await axiosSecure.get("/jobs-count");
        setTotalJobs(jobsResponse?.data?.totalJobs);

        const companiesResponse = await axiosSecure.get("/companies/count");
        setTotalCompanies(companiesResponse.data.totalCompanies);
      } catch (error) {
        // console.error('Error fetching totals:', error);
      }
    };

    fetchTotals();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm && !location) {
      setError("Please enter something first");
      return;
    }
    setError("");
    try {
      const response = await axiosSecure.get("/jobs/search", {
        params: { searchTerm, location },
      });
      setJobs(response.data);
    } catch (error) {
      // console.error('Error fetching jobs:', error);
    }
  };

  return (
    <div className="container rounded-xl pt-16 lg:mb-4 mb-16">
      <div className="flex flex-col lg:flex-row justify-center items-center">
        <div className="flex lg:flex-row flex-col justify-center items-center md:gap-[50px] lg:gap-[100px]">
          <div>
            <div className="lg:text-left md:text-left text-center ">
              <h1 className="text-[#18191c] lg:text-5xl md:text-6xl text-4xl font-bold leading-tight mb-2">
                Find a job that suits your interest & skills.
              </h1>
              <p className="text-[#5e6670] text-lg font-normal mb-4">
                Quickly find job opportunities that match your skills and
                interests by searching for specific job titles, keywords, or
                locations.
              </p>
            </div>
            <div className="w-full bg-white rounded-lg shadow-md border border-[#e4e5e8] p-6 flex-1">
              <form
                className="flex flex-col sm:flex-row gap-4 sm:gap-2 border rounded-lg"
                onSubmit={handleSearch}
              >
                <div className="relative flex-1 ">
                  <AiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0a65cc] w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Job title, Company Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-3 py-3 sm:py-4 bg-white rounded-md focus:outline-none
                            focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
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
                    className="w-full pl-12 pr-3 py-3 sm:py-4 bg-white rounded-md focus:outline-none
                            focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  />
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
          </div>

          {/* Job results section moved here */}

          <div className="justify-center items-center hidden lg:block md:block">
            <img src={homeBg} alt="" />
          </div>
        </div>
      </div>
      <div
        className={`mt-6 ${
          jobs.length > 0 ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        {jobs.length > 0 ? (
          <>
            <h2 className="text-lg font-medium">Job Results:</h2>
            <div className="max-h-60 overflow-y-auto">
              {" "}
              <ul>
                {jobs.map((job) => (
                  <li key={job._id} className="p-4 border-b">
                    <a
                      href={job.company_website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Link to={`/job/${job._id}`}>
                        <h3 className="font-semibold">
                          {job.position} at {job.company}
                        </h3>
                      </Link>
                      <p>{job.location}</p>
                      <p>Salary: {job.salaryRange}</p>
                      <p>{job.title}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="mt-6 text-gray-500">
            <h2 className="text-lg font-medium">No matching jobs found.</h2>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-start space-y-4 md:space-y-0 md:space-x-8 ">
        <div className="bg-white bg-opacity-80 text-black p-4 rounded-lg shadow-md flex items-center space-x-4 w-64">
          <FaBriefcase className="text-4xl text-[#0a65cc]" />
          <div>
            <h2 className="text-lg font-bold">Total Jobs</h2>
            <p className="text-lg">{totalJobs}</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-80 text-black p-4 rounded-lg shadow-md flex items-center space-x-4 w-64">
          <FaBuilding className="text-4xl text-[#0a65cc]" />
          <div>
            <h2 className="text-lg font-bold">Total Companies</h2>
            <p className="text-lg">{totalCompanies}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
