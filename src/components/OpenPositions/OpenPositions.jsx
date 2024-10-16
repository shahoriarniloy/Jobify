import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import JobCardGrid from "../JobCardGrid/JobCardGrid";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook

const OpenPosition = ({ email, title }) => {
  const { t } = useTranslation(); // Initialize the translation function
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(6);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchJobDataPagination = async () => {
      if (!email) return; // Return early if no email

      setLoading(true); // Set loading state before fetching
      setError(null); // Reset error state

      try {
        const response = await axiosSecure.get(
          `/OpenPosition?page=${page}&limit=${limit}&email=${email}`
        );
        setJobs(response.data.jobs);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError(t("error_fetching_job_data_please_try_again")); // Use translation for error message
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchJobDataPagination();
  }, [email, page, limit, t]);

  useEffect(() => {
    const handleResize = () => {
      setLimit(window.innerWidth < 640 ? 3 : 6);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
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
              disabled={page === 1}
              className="btn bg-blue-100 h-12 w-12"
            >
              <FaArrowLeft className="text-blue-400" />
            </button>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="btn bg-blue-100 ml-4 h-12 w-12"
            >
              <FaArrowRight className="text-blue-400" />
            </button>
          </div>
        </div>

        {loading ? ( // Show loading message or spinner
          <p>{t("loading_jobs")}</p> // Use translation for loading message
        ) : error ? ( // Show error message if there is an error
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {jobs.length > 0 ? (
              jobs.map((job) => <JobCardGrid key={job._id} job={job} />)
            ) : (
              <p>{t("no_jobs_available")}</p> // Use translation for no jobs message
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default OpenPosition;
