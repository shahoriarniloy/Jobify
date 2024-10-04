import { useEffect, useState } from "react";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import JobCardGrid from "../JobCardGrid/JobCardGrid";
import { Link } from "react-router-dom";

const RelatedJobs = ({ job, title }) => {
    const [jobs, setJobs] = useState([]); 
    const [page, setPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1); 
    const [limit, setLimit] = useState(6); 
  
    const jobTitle = job?.title || ''; // Corrected to use 'title'
   
  
    useEffect(() => {
        if (jobTitle) {
          // console.log('Job Title being sent:', jobTitle); // Log job title before API call
          const fetchJobDataPagination = async () => {
            try {
              const response = await axiosSecure.get(
                `/RelatedJobs?page=${page}&limit=${limit}&title=${jobTitle}`
              );
              setJobs(response.data.jobs); 
              setTotalPages(response.data.totalPages); 
            } catch (error) {
              // console.error("Error fetching job data:", error); 
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
  
          <div className="grid md:grid-cols-3 gap-6">
            {jobs.length > 0 ? (
              jobs.map((job) => <JobCardGrid key={job._id} job={job} />) 
            ) : (
              <p>No jobs available</p> 
            )}
          </div>
        </section>
      </div>
    );
  };
  
  export default RelatedJobs;
  

