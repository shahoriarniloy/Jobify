import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaBriefcase, FaBuilding } from "react-icons/fa";
import { useState, useEffect } from "react";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { Link } from "react-router-dom";
import homeBg from '../../assets/homebg.png'
import { IoPeopleSharp } from "react-icons/io5";
import { RiPoliceBadgeFill } from "react-icons/ri";

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
    <div className="bg-secondary py-20">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-center items-center">
          <div className="flex lg:flex-row flex-col justify-center items-center md:gap-[50px] lg:gap-[100px]">

            <div>
              <div className="lg:text-left md:text-left text-center">
                <h1 className="text-[#18191c] lg:text-5xl md:text-6xl text-4xl font-bold leading-tight mb-6">
                  Find a job that suits your interest & skills.
                </h1>
                <p className="text-[#5e6670] text-lg font-normal mb-4">
                  Quickly find job opportunities that match your skills and
                  interests by searching for specific job titles, keywords, or
                  locations.
                </p>
              </div>
              <div className="w-full bg-white rounded-lg shadow-sm border border-[#e4e5e8] p-6 flex-1">
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

              </div>
              <p className="mt-2"><span className="text-[#9199A3]">Suggestion: </span>
                <span className="text-[#474C54]">
                  Designer,
                  Programing,
                  Digital Marketing,
                  Video,
                  Animation.
                </span>
              </p>
              <div
                className={`mt-3 ${jobs.length > 0 ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-300`}
              >
                {jobs.length > 0 ? (
                  <div className="flex items-center gap-2">
                    <h2 className="text-[#9199A3]">Job Results:</h2>
                    <div className="max-h-60 overflow-y-auto flex flex-wrap items-center gap-4">
                      {jobs.map((job) => (
                        <Link key={job._id} to={`/job/${job._id}`}>
                          <h3 className="font-semibold link-color">
                            {job?.title}
                          </h3>
                        </Link>
                      ))}

                    </div>
                  </div>
                ) : (
                  <div className="mt-6 text-gray-500">
                    <h2 className="text-lg font-medium">No matching jobs found.</h2>
                  </div>
                )}
              </div>
            </div>


            {/* home banner */}

            <div className="justify-center items-center hidden lg:block md:block">
              <img src={homeBg} alt="" />
            </div>
          </div>
        </div>


        <div className=" mt-8 md:mt-28 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white bg-opacity-80 text-black p-4 rounded-lg shadow-sm flex items-center space-x-4  ">
            <div className="rounded-md bg-[#e7f0fa] p-4">
              <FaBriefcase className="text-4xl text-[#0a65cc]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{totalJobs}</h2>
              <p className="text-[#767F8C]">Live Jobs</p>
            </div>
          </div>

          <div className="bg-white bg-opacity-80 text-black p-4 rounded-lg shadow-sm flex items-center space-x-4 ">
            <div className="rounded-md bg-[#e7f0fa] p-4">
              <FaBuilding className="text-4xl text-[#0a65cc]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{totalCompanies}</h2>
              <p className="text-[#767F8C]">Companies</p>
            </div>

          </div>

          <div className="bg-white bg-opacity-80 text-black p-4 rounded-lg shadow-sm flex items-center space-x-4 ">
            <div className="rounded-md bg-[#e7f0fa] p-4">
              <IoPeopleSharp className="text-4xl text-[#0a65cc]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{totalCompanies}</h2>
              <p className="text-[#767F8C]">Candidates</p>
            </div>

          </div>

          <div className="bg-white bg-opacity-80 text-black p-4 rounded-lg shadow-sm flex items-center space-x-4 ">
            <div className="rounded-md bg-[#e7f0fa] p-4">
              <RiPoliceBadgeFill className="text-4xl text-[#0a65cc]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{totalCompanies}</h2>
              <p className="text-[#767F8C]">Successful</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SearchBar;
