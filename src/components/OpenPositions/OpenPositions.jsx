import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import JobCardGrid from "../JobCardGrid/JobCardGrid";
import axiosSecure from "../../Hooks/UseAxiosSecure";

const OpenPosition = ({ companyId, title }) => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(6);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDataPagination = async () => {
      try {
        const response = await axiosSecure.get(
          `/OpenPosition?page=${page}&limit=6&companyId=${companyId}`
        );
        setJobs(response.data.jobs);
        setTotalPages(response.data.totalPages);
        setError(null);
      } catch (error) {
        // console.error("Error fetching job data:", error);
        setError("Error fetching job data. Please try again.");
      }
    };
    fetchJobDataPagination();
  }, [companyId, page, limit]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setLimit(3);
      } else {
        setLimit(6);
      }
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
        <div className="grid md:grid-cols-3 gap-6">
          {jobs?.length > 0 ? (
            jobs.map((job) => <JobCardGrid key={job._id} job={job} />)
          ) : (
            <p>No jobs available</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default OpenPosition;
