import { useEffect, useState } from "react";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import ApplyJobModal from "../../components/Modal/ApplyJobModal";
import socialLogo from "../../assets/image/CompanyDetails/instagram_logo.png";
import { FaLink, FaArrowRight } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { FiCalendar } from "react-icons/fi";
import { BiStopwatch } from "react-icons/bi";
import { PiBriefcase, PiWallet } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import useCurrentUser from "../../Hooks/useCurrentUser";
import RelatedJobs from "../../components/RelatedJobs/RelatedJobs";

const SingleJob = () => {
  const [job, setJob] = useState(null);
  const [company, setCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { id } = useParams();
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axiosSecure.get(`/single-job/${id}`);
        setJob(response.data);
        setCompany(response.data.company); // Assuming the company data is part of the job response

        // Check if user has already applied after fetching job data
        await checkIfApplied(response.data._id, currentUser.email);

        // Check if user has already bookmarked this job
        await checkIfBookmarked(response.data._id, currentUser.email);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };
    fetchJobData();
  }, [id, currentUser?.email]);

  const checkIfApplied = async (jobId, userEmail) => {
    try {
      const response = await axiosSecure.get("/check_application", {
        params: {
          job_id: jobId,
          user_email: userEmail,
        },
      });

      if (response.data.applied) {
        setHasApplied(true);
      } else {
        setHasApplied(false);
      }
    } catch (error) {
      console.error("Error checking application status:", error);
    }
  };

  const checkIfBookmarked = async (jobId, userEmail) => {
    try {
      const response = await axiosSecure.get("/check_bookmark", {
        params: {
          job_id: jobId,
          user_email: userEmail,
        },
      });

      setIsBookmarked(response.data.bookmarked);
    } catch (error) {
      console.error("Error checking bookmark status:", error);
    }
  };

  const toggleBookmark = async () => {
    try {
      if (isBookmarked) {
        // Remove bookmark
        await axiosSecure.delete(`/remove-bookmark`, {
          data: {
            userEmail: currentUser.email,
            jobId: job._id,
          },
        });
        setIsBookmarked(false);
      } else {
        // Add bookmark
        await axiosSecure.post(`/add-bookmark`, {
          userEmail: currentUser.email,
          jobId: job._id,
        });
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  const handleApplicationSuccess = () => {
    setHasApplied(true); // Update the hasApplied state when the application is successful
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!job) {
    return <div>Loading Job Details...</div>;
  }

  return (
    <div className="container mx-auto mt-0 md:mt-16 pt-5 mb-9 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-4">
          <div>
            <img
              className="rounded-full h-16 w-16"
              src={socialLogo}
              alt="Company Logo"
            />
          </div>
          <div className="flex flex-col my-auto">
            <div className="flex items-center">
              <h2 className="font-bold text-lg md:text-xl">{job.title}</h2>
              <p className="text-xs text-red-400 bg-red-100 font-semibold my-auto py-1 px-3 rounded-full ml-2">
                Featured
              </p>
              <p className="text-xs text-blue-400 bg-blue-100 font-semibold my-auto py-1 px-3 rounded-full ml-2">
                {job.jobType}
              </p>
            </div>
            <div className="flex">
              <p className="flex items-center gap-2 my-1">
                <FaLink className="text-blue-400" />
                {company?.company_website}
              </p>
              <p className="flex items-center gap-2 mx-3 my-1">
                <FiPhone className="text-blue-400" />
                {company?.phone_number}
              </p>
              <p className="flex items-center gap-2 mx-2 my-1">
                <TfiEmail className="text-blue-400" />
                {company?.email}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="px-2 py-1 bg-blue-100 rounded-md cursor-pointer"
              onClick={toggleBookmark}
            >
              {isBookmarked ? (
                <span className="text-blue-600">Bookmarked</span>
              ) : (
                <span className="text-blue-600">Bookmark</span>
              )}
            </div>

            <div className="items-center">
              <button
                onClick={openModal}
                className={`flex items-center gap-3 px-4 py-2 rounded-md ${
                  hasApplied || new Date() > new Date(job.deadline)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-700"
                } text-white`}
                disabled={hasApplied || new Date() > new Date(job.deadline)}
              >
                {hasApplied ? "Already Applied" : "Apply now"} <FaArrowRight />
              </button>

              {/* Modal */}
              <ApplyJobModal
                isOpen={isModalOpen}
                onClose={closeModal}
                job={job}
                user={currentUser}
                onApplicationSuccess={handleApplicationSuccess} // Pass the callback function
              />
            </div>
          </div>
          <div className="text-sm md:text-right">
            Job expires in: <span className="text-red-500">{job.deadline}</span>
          </div>
        </div>
      </div>

      <section className="flex flex-col md:flex-row mt-5 gap-4">
        <section className="md:w-1/2 mb-5 md:mb-0">
          <div className="my-4">
            <h3 className="font-bold mb-4">Job Description</h3>
            <p className="text-gray-500">{job.jobDescription}</p>
          </div>

          <div className="my-4">
            <h3 className="font-bold mb-4">Responsibilities</h3>
            <ul className="list-disc list-inside pl-5 space-y-2">
              {job.responsibilities?.map((item, index) => (
                <li key={index} className="text-gray-500">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="md:ml-10 md:w-1/2">
          <div className="md:p-8 border-2 rounded-lg">
            <h2 className="mb-6 font-bold text-xl md:text-2xl">Job Overview</h2>
            <div className="grid grid-cols-3 md:grid-cols-2 grid-col-1 gap-5 md:gap-10">
              <div>
                <FiCalendar className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">JOB POSTED:</p>
                <p className="font-bold text-sm">{job.posted}</p>
              </div>
              <div>
                <BiStopwatch className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">JOB EXPIRES IN:</p>
                <p className="font-bold text-sm">{job.deadline}</p>
              </div>
              <div>
                <PiBriefcase className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">EDUCATION:</p>
                <p className="font-bold text-sm">{job.education}</p>
              </div>
              <div>
                <PiWallet className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">SALARY:</p>
                <p className="font-bold text-sm">{job.salaryRange}</p>
              </div>
              <div>
                <IoLocationOutline className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">LOCATION:</p>
                <p className="font-bold text-sm">{job.location}</p>
              </div>
              <div>
                <PiBriefcase className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">JOB TYPE:</p>
                <p className="font-bold text-sm">{job.jobType}</p>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Related Jobs */}
      <RelatedJobs title={"Related Jobs"} job={job} />
    </div>
  );
};

export default SingleJob;
