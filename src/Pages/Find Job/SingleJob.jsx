import { useEffect, useState } from "react";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import ApplyJobModal from "../../components/Modal/ApplyJobModal";
import { FaLink, FaArrowRight } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { FiCalendar } from "react-icons/fi";
import { BiStopwatch } from "react-icons/bi";
import { PiBriefcase, PiWallet } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import RelatedJobs from "../../components/RelatedJobs/RelatedJobs";
import Bookmark from "./Bookmark";
import DashboardLoader from "../../Shared/DashboardLoader";
import { useTranslation } from "react-i18next";

const SingleJob = () => {
  const { t } = useTranslation();
  const [job, setJob] = useState(null);
  const [company, setCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [companyLogos, setCompanyLogos] = useState({});

  useEffect(() => {
    const fetchCompanyInfo = async (email) => {
      try {
        const response = await axiosSecure.get(`/companies/${email}`);
        return response.data.company_logo;
      } catch (error) {
        console.error("Error fetching company info:", error);
        return null;
      }
    };

    const fetchLogos = async () => {
      if (job?.hrEmail) {
        const logo = await fetchCompanyInfo(job.hrEmail);
        setCompanyLogos(logo);
      }
    };

    fetchLogos();
  }, [job]);

  const { id } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axiosSecure.get(`/single-job/${id}`);
        setJob(response.data);
        setCompany(response.data.company);

        await checkIfApplied(response.data._id, currentUser.email);

        await checkIfBookmarked(response.data._id, currentUser.email);
      } catch (error) {
        // console.error("Error fetching job data:", error);
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
      // console.error("Error checking application status:", error);
    }
  };

  // const checkIfBookmarked = async (jobId, userEmail) => {
  //   try {
  //     const response = await axiosSecure.get("/check_bookmarks", {
  //       params: {
  //         job_id: jobId,
  //         userEmail: userEmail,
  //       },
  //     });

  //     setIsBookmarked(response.data.bookmarked);
  //     console.log(isBookmarked);
  //   } catch (error) {
  //     console.error("Error checking bookmark status:", error);
  //   }
  // };

  // const toggleBookmark = async () => {
  //   try {
  //     if (isBookmarked) {
  //       await axiosSecure.delete(`/remove-bookmark`, {
  //         data: {
  //           userEmail: currentUser.email,
  //           jobId: job._id,
  //         },
  //       });
  //       setIsBookmarked(false);
  //     } else {
  //       await axiosSecure.post(`/add-bookmark`, {
  //         userEmail: currentUser.email,
  //         jobId: job._id,
  //       });
  //       setIsBookmarked(true);
  //     }
  //   } catch (error) {
  //     console.error("Error toggling bookmark:", error);
  //   }
  // };

  const handleApplicationSuccess = () => {
    setHasApplied(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!job) {
    return <DashboardLoader />;
  }

  return (
    <div className="container mx-auto mt-0 md:mt-16 mb-9 px-4 sm:px-8 md:px-16 ">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-4">
          <div>
            <img
              className="rounded-full h-16 w-16"
              src={companyLogos}
              alt={t("company_logo_alt")}
            />
          </div>
          <div className="flex flex-col my-auto">
            <div className="flex items-center">
              <h2 className="font-bold text-lg md:text-xl">{t(job.title)}</h2>
              <p className="text-xs text-red-400 bg-red-100 font-semibold my-auto py-1 px-3 rounded-full ml-2">
                {t("featured")}
              </p>
              <p className="text-xs text-blue-400 bg-blue-100 font-semibold my-auto py-1 px-3 rounded-full ml-2">
                {t(job.jobType)}
              </p>
            </div>
            <div className="flex">
              <p className="flex items-center gap-2 my-1">
                <FaLink className="text-blue-400" />
                {t(company?.company_website)}
              </p>
              <p className="flex items-center gap-2 mx-3 my-1">
                <FiPhone className="text-blue-400" />
                {t(company?.phone_number)}
              </p>
              <p className="flex items-center gap-2 mx-2 my-1">
                <TfiEmail className="text-blue-400" />
                {t(company?.email)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <div className="px-2 py-1 bg-blue-100 rounded-md cursor-pointer">
              <Bookmark jobId={job._id} />
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
                {hasApplied ? t("already_applied") : t("apply_now")}{" "}
                <FaArrowRight />
              </button>

              <ApplyJobModal
                isOpen={isModalOpen}
                onClose={closeModal}
                job={job}
                user={currentUser}
                onApplicationSuccess={handleApplicationSuccess}
              />
            </div>
          </div>
          <div className="text-sm md:text-right">
            {t("job_expires_in")}:{" "}
            <span className="text-red-500">{job.deadline}</span>
          </div>
        </div>
      </div>

      <section className="flex flex-col md:flex-row mt-5 gap-4">
        <section className="md:w-1/2 mb-5 md:mb-0">
          <div className="my-4">
            <h3 className="font-bold mb-4">{t("job_description")}</h3>
            <p className="text-gray-500">{t(job.jobDescription)}</p>
          </div>

          <div className="my-4">
            <h3 className="font-bold mb-4">{t("responsibilities")}</h3>
            <ul className="list-disc list-inside pl-5 space-y-2">
              {job.responsibilities?.map((item, index) => (
                <li key={index} className="text-gray-500">
                  {t(item)}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="md:ml-10 md:w-1/2">
          <div className="md:p-8 border-2 rounded-lg">
            <h2 className="mb-6 font-bold text-xl md:text-2xl">
              {t("job_overview")}
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-2 grid-col-1 gap-5 md:gap-10">
              <div>
                <FiCalendar className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">{t("job_posted")}:</p>
                <p className="font-bold text-sm">{job.posted}</p>
              </div>
              <div>
                <BiStopwatch className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">{t("job_expires_in")}:</p>
                <p className="font-bold text-sm">{job.deadline}</p>
              </div>
              <div>
                <PiBriefcase className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">{t("education")}:</p>
                <p className="font-bold text-sm">{job.education}</p>
              </div>
              <div>
                <PiWallet className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">{t("salary")}:</p>
                <p className="font-bold text-sm">{job.salaryRange}</p>
              </div>
              <div>
                <IoLocationOutline className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">{t("location_Alphabet")}:</p>
                <p className="font-bold text-sm">{job.location}</p>
              </div>
              <div>
                <PiBriefcase className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">{t("job_type")}:</p>
                <p className="font-bold text-sm">{job.jobType}</p>
              </div>
            </div>
          </div>
        </section>
      </section>

      <RelatedJobs title={t("related_jobs")} job={job} />
    </div>
  );
};

export default SingleJob;
