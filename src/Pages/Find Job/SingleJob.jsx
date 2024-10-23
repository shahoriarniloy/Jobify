import { useEffect, useState } from "react";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import ApplyJobModal from "../../components/Modal/ApplyJobModal";
import { FaArrowRight } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { PiBriefcase, PiWallet } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import RelatedJobs from "../../components/RelatedJobs/RelatedJobs";
import Bookmark from "./Bookmark";
import DashboardLoader from "../../Shared/DashboardLoader";
import { useTranslation } from "react-i18next";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { useQuery } from '@tanstack/react-query';
import { FaUserGraduate } from "react-icons/fa";

const SingleJob = () => {
  const { currentUser } = useCurrentUser();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { id } = useParams();



  const { data: job, isLoading } = useQuery({
    queryKey: ["fetch company"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/single-job/${id}`);
      checkIfApplied(data?._id, currentUser?.email);
      checkIfBookmarked(data?._id, currentUser?.email);
      return data;
    }
  })

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

  const checkIfBookmarked = async (jobId, userEmail) => {
    const response = await axiosSecure.get("/check_bookmarks", {
      params: {
        job_id: jobId,
        userEmail: userEmail,
      },
    });

    setIsBookmarked(response.data.bookmarked);
  }


  const toggleBookmark = async () => {
    try {
      if (isBookmarked) {
        await axiosSecure.delete(`/remove-bookmark`, {
          data: {
            userEmail: currentUser.email,
            jobId: job._id,
          },
        });
        setIsBookmarked(false);
      } else {
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
    setHasApplied(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <DashboardLoader />;
  }
  return (
    <div className="container mx-auto mt-0 md:mt-16 mb-9 px-4 sm:px-8 md:px-16 ">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-4">
          <div>
            <img
              className="rounded-full h-16 w-16"
              src={job?.companyInfo?.company_logo}
              alt={t("company_logo_alt")}
            />
          </div>
          <div className="flex flex-col my-auto">
            <div className="flex items-center">
              <h2 className="font-bold text-lg md:text-xl">{job?.companyInfo?.company_name}</h2>
              {/* <p className="text-xs text-red-400 bg-red-100 font-semibold my-auto py-1 px-3 rounded-full ml-2">
                {job?.jobInfo?.vacancy}
              </p> */}
              <p className="text-xs text-blue-400 bg-blue-100 font-semibold my-auto py-1 px-3 rounded-full ml-2">
                {job?.jobInfo?.jobCategory}
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
                className={`flex items-center gap-3 px-4 py-2 rounded-md ${hasApplied || new Date() > new Date(job?.jobInfo?.deadline)
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
            <span className="text-red-500">{job?.jobInfo?.deadline}</span>
          </div>
        </div>
      </div>

      <section className="flex flex-col md:flex-row mt-5 gap-4">
        <section className="md:w-1/2 mb-5 md:mb-0">
          <h1 className="text-3xl italic font-semibold tracking-wide flex gap-2">{job?.jobInfo?.title}</h1>
          <div className="my-4">
            <h3 className="font-bold text-gray-900 mb-4">{t("job_description")}</h3>
            <p className="text-gray-700 text-justify">{job?.jobInfo?.jobDescription}</p>
          </div>

          <div className="my-4">
            <h3 className="font-bold mb-4">Responsibilities</h3>
            <ul className="list-disc list-inside pl-5 space-y-2">
              {job?.jobInfo?.responsibilities?.split("\n").map((item, index) => (
                <li key={index} className="text-gray-700 text-justify">
                  {t(item)}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="md:ml-10 md:w-1/2">
          <div className="p-2 md:p-8 border-2 rounded-lg">
            <h2 className="mb-6 font-bold text-xl text-center md:text-2xl">
              {t("job_overview")}
            </h2>
            <div className="flex justify-between items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FiCalendar className="text-2xl text-blue-500" />
                  <div>
                    <p className="font-semibold mt-2">Posted Date</p>
                    <p className="text-sm text-gray-700">{job?.jobInfo?.posted}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FiCalendar className="text-2xl text-blue-500" />
                  <div>
                    <p className="font-semibold mt-2">Expire On</p>
                    <p className="text-sm text-gray-700">{job?.jobInfo?.deadline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaUserGraduate className="text-2xl text-blue-500" />
                  <div>
                    <p className="font-semibold mt-2">Educational Qualification</p>
                    <p className="text-sm text-gray-700">{job?.jobInfo?.education}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <PiWallet className="text-2xl text-blue-500" />
                  <div>
                    <p className="font-semibold mt-2">Starting Salary</p>
                    <p className="text-sm text-gray-700">{job?.jobInfo?.salaryRange}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <IoLocationOutline className="text-2xl text-blue-500" />
                  <div>
                    <p className="font-semibold mt-2">Job Location</p>
                    <p className="text-sm text-gray-700">{job?.jobInfo?.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <PiBriefcase className="text-2xl text-blue-500" />
                  <div>
                    <p className="font-semibold mt-2">Job Type</p>
                    <p className="text-sm text-gray-700">{job?.jobInfo?.jobType}</p>
                  </div>
                </div>
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
