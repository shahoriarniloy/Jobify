import { useEffect, useState } from "react";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import JobCardGrid from "../JobCardGrid/JobCardGrid";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook

const RelatedJobs = ({ job, title }) => {
  const { t } = useTranslation(); // Initialize the translation function
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(6);
  const [loading, setLoading] = useState(true); // Loader state

  const jobTitle = job?.title || ""; // Corrected to use 'title'

  useEffect(() => {
    if (jobTitle) {
      const fetchJobDataPagination = async () => {
        setLoading(true); // Start loading
        try {
          const response = await axiosSecure.get(
            `/RelatedJobs?page=${page}&limit=${limit}&title=${jobTitle}`
          );
          setJobs(response.data.jobs);
          setTotalPages(response.data.totalPages);
        } catch (error) {
          console.error("Error fetching job data:", error);
        } finally {
          setLoading(false); // Stop loading after fetching
        }
      };
      fetchJobDataPagination();
    }
  }, [jobTitle, page, limit]);

  // Handle window resizing
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
      <section className="flex flex-col-reverse lg:flex-col container mx-auto mt-5 md:mt-20">
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

        {/* Show loader when loading */}
        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-bars loading-lg"></span>
          </div>
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

export default RelatedJobs;
