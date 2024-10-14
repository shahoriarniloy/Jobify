import { useState, useEffect } from "react";
import axios from "axios";
import JobCardGrid from "../JobCardGrid/JobCardGrid";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const OpenPosition = ({ email, title }) => {
  const { t } = useTranslation(); // Initialize translation hook
  const [jobs, setJobs] = useState([]); // Store fetched jobs
  const [page, setPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Total pages available
  const [limit, setLimit] = useState(6); // Limit for fetching jobs
  const [error, setError] = useState(null); // State to handle errors

  // Fetch job data for pagination
  useEffect(() => {
    const fetchJobDataPagination = async () => {
      try {
        const response = await axios.get(
          `/OpenPosition?page=${page}&limit=${limit}&email=${email}` // Use email in the request
        );
        setJobs(response.data.jobs); // Update the jobs state
        setTotalPages(response.data.totalPages); // Update the total pages
        setError(null); // Clear any errors
      } catch (error) {
        setError(t("Error fetching job data. Please try again.")); // Use translation for error message
      }
    };
    if (email) {
      fetchJobDataPagination(); // Fetch jobs only if email is available
    }
  }, [email, page, limit, t]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setLimit(3); // Change limit based on screen size
      } else {
        setLimit(6); // Default limit
      }
    };

    handleResize(); // Call resize handler once initially
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1); // Go to next page
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1); // Go to previous page
    }
  };

  return (
    <div>
      <section className="flex flex-col-reverse lg:flex-col container mx-auto md:mt-20">
        <div className="flex justify-between mt-5 mb-5 md:mb-12">
          <h3 className="font-bold text-xl">{title}</h3>
          <div>
            <button
              onClick={handlePrev}
              disabled={page === 1} // Disable if on the first page
              className="btn bg-blue-100 h-12 w-12"
            >
              <FaArrowLeft className="text-blue-400" />
            </button>

            <button
              onClick={handleNext}
              disabled={page === totalPages} // Disable if on the last page
              className="btn bg-blue-100 ml-4 h-12 w-12"
            >
              <FaArrowRight className="text-blue-400" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {jobs?.length > 0 ? (
            jobs.map((job) => <JobCardGrid key={job._id} job={job} />)
          ) : error ? (
            <p>{error}</p> // Display error message if any
          ) : (
            <p>{t("No jobs available")}</p> // Display translated "No jobs available"
          )}
        </div>
      </section>
    </div>
  );
};

export default OpenPosition;
