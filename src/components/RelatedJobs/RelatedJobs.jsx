import { useEffect, useState } from "react";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import JobCardGrid from "../JobCardGrid/JobCardGrid";

const RelatedJobs = ({ job, title }) => {
  const [jobs, setJobs] = useState([]); // Store fetched jobs
  const [page, setPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Total pages available

  const { jobType } = job; // Get jobType from props
  console.log(jobs);

  // Fetch job data for pagination
  useEffect(() => {
    const fetchJobDataPagination = async () => {
      try {
        const response = await axiosSecure.get(
          `/jobs_pagination?page=${page}&limit=6&type=${jobType}` // Fetch jobs by jobType, page, and limit
        );
        setJobs(response.data.jobs); // Set jobs to the response data
        setTotalPages(response.data.totalPages); // Set total pages based on response
      } catch (error) {
        console.error("Error fetching job data:", error); // Log error if fetching fails
      }
    };
    fetchJobDataPagination(); // Call the function to fetch data
  }, [jobType, page]); // Dependency on jobType and page

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
      <section className="container mx-auto md:mt-20">
        <div>
          {/* Header */}
          <div className="flex justify-between mb-12">
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
        </div>
      </section>
    </div>
  );
};

export default RelatedJobs;
