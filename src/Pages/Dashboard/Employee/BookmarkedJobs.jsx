import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import {
  FaBriefcase,
  FaClock,
  FaDollarSign,
  FaTrash,
  FaCheckCircle,
  FaRegHeart,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApplyJobModal from "../../../components/Modal/ApplyJobModal";
import DashboardLoader from "../../../Shared/DashboardLoader";
import { useTranslation } from "react-i18next";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { Helmet } from "react-helmet";




const BookmarkedJobs = () => {
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    const fetchBookmarkedJobs = async () => {
      if (currentUser) {
        try {
          const { data: bookmarks } = await axiosSecure.get(
            `/bookmarks?email=${currentUser.email}`
          );
          const jobPromises = bookmarks.map(async (bm) => {
            const { data: job } = await axiosSecure.get(`/jobs/${bm.jobId}`);
            const appliedResponse = await axiosSecure.get(
              "/check_application",
              {
                params: {
                  job_id: job._id,
                  user_email: currentUser.email,
                },
              }
            );
            job.hasApplied = appliedResponse.data.applied;
            return job;
          });
          const jobResponses = await Promise.all(jobPromises);
          setBookmarkedJobs(jobResponses);
        } catch (error) {
          toast.error(t("error_fetching_jobs"));
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookmarkedJobs();
  }, [currentUser]);

  const handleDeleteBookmark = async (jobId) => {
    try {
      await axiosSecure.delete(`/bookmarks/${currentUser.email}/${jobId}`);
      setBookmarkedJobs((prevJobs) =>
        prevJobs.filter((job) => job._id !== jobId)
      );
      toast.success(t("bookmark_deleted"));
    } catch (error) {
      toast.error(t("error_deleting_bookmark"));
    }
  };

  const handleApplicationSuccess = (jobId) => {
    setBookmarkedJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, hasApplied: true } : job
      )
    );
  };

  const openModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  if (loading) return <DashboardLoader />;

  return (
    <div className="">
       <Helmet>
        <title>Jobify - Favorite Jobs</title>
      </Helmet>
      <div className="flex flex-col gap-2 pt-2">
        {bookmarkedJobs.map((job) => {
          const { _id, jobInfo, companyInfo, hasApplied } = job;
          const isDeadlineExpired = new Date(jobInfo?.deadline) < new Date();
          return (
            <div
              key={_id}
              className={ theme === "dark"? "h-fit p-6 bg-slate-800 shadow-xl rounded-xl " : "h-fit p-6 bg-base-100 shadow-xl rounded-xl "}
            >
              <div className="flex lg:flex-row md:flex-row flex-col justify-between items-center">
                <div className="flex flex-col">
                  <h2 className="card-title text-2xl mb-2">{jobInfo?.title}</h2>
                  <h2 className="text-lg mb-6 text-gray-500">
                    {companyInfo?.company_name}
                  </h2>
                  <div className="flex lg:flex-row flex-col gap-4 text-xs">
                    <div className="flex items-center">
                      <FaBriefcase className="mr-1" />
                      <p className="text-base-400">
                        {t("experience")}: {jobInfo?.experience}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaDollarSign className="mr-1" />
                      <p className="text-base-400">
                        {t("salary")}: {jobInfo?.salaryRange}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-1" />
                      <p className="text-base-400">
                        {t("deadline")}:{" "}
                        {new Date(jobInfo?.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card-actions justify-end mt-6 flex items-center">
                  {!hasApplied ? (
                    <button
                      title={t("tap_to_apply")}
                      onClick={() => openModal(job)} // Pass job to modal
                      className={`btn ${
                        isDeadlineExpired ? "btn-disabled" : "btn-primary"
                      }`}
                      disabled={isDeadlineExpired}
                    >
                      {isDeadlineExpired ? (
                        t("deadline_expired")
                      ) : (
                        <>
                          <span className="ml-2">{t("apply_now")} →</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <p className="text-green-400">{t("applied")}</p>
                    </div>
                  )}

                  <FaTrash
                    className="ml-4 text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => handleDeleteBookmark(_id)}
                    title={t("remove_bookmark")}
                  />
                </div>
              </div>
            </div>
          );
        })}
        {bookmarkedJobs.length === 0 && <p>{t("no_bookmarked_jobs")}</p>}
      </div>

      {selectedJob && (
        <ApplyJobModal
          isOpen={isModalOpen}
          onClose={closeModal}
          job={selectedJob}
          user={currentUser}
          onApplicationSuccess={() => handleApplicationSuccess(selectedJob._id)}
        />
      )}
    </div>
  );
};

export default BookmarkedJobs;
