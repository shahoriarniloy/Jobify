import { useEffect, useState } from "react";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import JobCardGrid from "../JobCardGrid/JobCardGrid";

const RelatedJobs = ({ job, title }) => {
  const [jobs, setJobs] = useState([]); // Store fetched jobs
  const [page, setPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Total pages available
  const [limit, setLimit] = useState(6); // Limit for fetching jobs

  const { jobType } = job; // Get jobType from props

  // Fetch job data for pagination
  useEffect(() => {
    const fetchJobDataPagination = async () => {
      try {
        const response = await axiosSecure.get(
          `/RelatedJobs?page=${page}&limit=${limit}&type=${jobType}` // Fetch jobs by jobType, page, and limit
        );
        setJobs(response.data.jobs); // Set jobs to the response data
        setTotalPages(response.data.totalPages); // Set total pages based on response
      } catch (error) {
        console.error("Error fetching job data:", error); // Log error if fetching fails
      }
    };
    fetchJobDataPagination(); // Call the function to fetch data
  }, [jobType, page, limit]); // Dependency on jobType, page, and limit

  // Function to handle screen size change
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setLimit(3); // Fetch 3 jobs for small screens
      } else {
        setLimit(6); // Fetch 6 jobs for larger screens
      }
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize); // Listen for window resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup event listener on component unmount
    };
  }, []);

  // Function to handle Next button click
  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1); // Increment page number
    }
  };

  // Function to handle Previous button click
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1); // Decrement page number
    }
  };

  return (
    <div>
      {/* Related jobs pagination */}
      <section className="flex flex-col-reverse lg:flex-col container mx-auto mt-5 md:mt-20">
        {/* Header */}
        <div className="flex justify-between mt-5 mb-5 md:mb-12">
          <h3 className="font-bold text-xl">{title}</h3>
          <div>
            {/* Previous button */}
            <button
              onClick={handlePrev}
              disabled={page === 1} // Disable if on first page
              className="btn bg-blue-100 h-12 w-12"
            >
              <FaArrowLeft className="text-blue-400" />
            </button>

            {/* Next button */}
            <button
              onClick={handleNext}
              disabled={page === totalPages} // Disable if on last page
              className="btn bg-blue-100 ml-4 h-12 w-12"
            >
              <FaArrowRight className="text-blue-400" />
            </button>
          </div>
        </div>

        {/* Job Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => <JobCardGrid key={job._id} job={job} />) // Map jobs to JobCardGrid
          ) : (
            <p>No jobs available</p> // Show message if no jobs are available
          )}
        </div>
      </section>
    </div>
  );
};

export default RelatedJobs;
