import React from "react";
import { useEffect, useState } from "react";
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

const BookmarkedJobs = () => {
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          // console.error("Error fetching bookmarked jobs:", error);
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
      // console.error("Error deleting bookmark:", error);
    }
  };

  const handleApplicationSuccess = () => {
    setBookmarkedJobs((prevJobs) =>
      prevJobs.map((job) => ({
        ...job,
        hasApplied: true,
      }))
    );
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <DashboardLoader />;

  return (
    <div className="">
      <div className="flex flex-col gap-2 pt-2">
        {bookmarkedJobs.map((job) => {
          const isDeadlineExpired = new Date(job.deadline) < new Date();
          return (
            <div
              key={job._id}
              className="h-fit p-6 bg-base-100 shadow-xl rounded-xl "
            >
              <div className="flex lg:flex-row md:flex-row flex-col justify-between items-center">
                <div className="flex flex-col">
                  <h2 className="card-title text-2xl mb-6">{job.title}</h2>
                  <div className="flex lg:flex-row flex-col gap-4 text-xs">
                    <div className="flex items-center">
                      <FaBriefcase className="mr-1" />
                      <p className="text-base-400">
                        {t("experience")}: {job.experience}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaDollarSign className="mr-1" />
                      <p className="text-base-400">{t("salary")}: {job.salaryRange}</p>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-1" />
                      <p className="text-base-400">
                        {t("deadline")}: {new Date(job.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card-actions justify-end mt-6 flex items-center">
                  {!job.hasApplied ? (
                    <button
                      title={t("tap_to_apply")}
                      onClick={openModal}
                      className={`btn ${isDeadlineExpired ? "btn-disabled" : "btn-primary"
                        }`}
                      disabled={isDeadlineExpired}
                    >
                      {isDeadlineExpired ? (
                        t("deadline_expired")
                      ) : (
                        <>
                          <ApplyJobModal
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            job={job}
                            user={currentUser}
                            onApplicationSuccess={handleApplicationSuccess}
                          />
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
                    onClick={() => handleDeleteBookmark(job._id)}
                    title={t("remove_bookmark")}
                  />
                </div>
              </div>
            </div>
          );
        })}
        {bookmarkedJobs.length === 0 && <p>{t("no_bookmarked_jobs")}</p>}
      </div>
    </div>
  );
};

export default BookmarkedJobs;
