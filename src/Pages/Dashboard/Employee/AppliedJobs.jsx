import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import { FaDollarSign, FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import DashboardLoader from "../../../Shared/DashboardLoader";
import { useTranslation } from "react-i18next";
import useCurrentUser from "../../../Hooks/useCurrentUser";

const statusSteps = [
  { value: "Pending", label: "Pending" },
  { value: "Under Review", label: "Under Review" },
  { value: "Shortlisted", label: "Shortlisted" },
  { value: "Interview Scheduled", label: "Interview Scheduled" },
  { value: "Assessment Task", label: "Assessment Task" },
  { value: "Hired", label: "Hired" },
];

const AppliedJobs = () => {
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      if (currentUser) {
        try {
          const response = await axiosSecure.get(
            `/check-applied-jobs?email=${currentUser.email}`
          );
          setAppliedJobs(response.data);
        } catch (error) {
          setError(t("error_fetching_applied_jobs"));
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAppliedJobs();
  }, [currentUser, t]);

  if (loading) return <DashboardLoader />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex flex-col gap-2 pt-2">
        {appliedJobs.length > 0 ? (
          appliedJobs.map((job) => (
            <div
              key={job._id}
              className="h-fit p-6 bg-base-100 shadow-xl rounded-xl"
            >
              <div className="flex lg:flex-row md:flex-row flex-col justify-between items-center">
                <div className="flex flex-col">
                  <h2 className="card-title text-2xl mb-2">{job.title}</h2>
                  <h3 className="text-lg text-gray-500 mb-4">{job.company}</h3>

                  <div className="flex lg:flex-row flex-col gap-4 text-xs">
                    <div className="flex items-center">
                      <FaDollarSign className="mr-1" />
                      <p className="text-base-400">
                        {t("salary")}: {job.salaryRange}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-1" />
                      <p className="text-base-400">
                        {t("location")}: {job.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="card-actions mt-6 flex items-center"
                  data-testid="job-status"
                >
                  <div className="flex items-center">
                    <FaCheckCircle
                      className={`mr-2 ${job.status === "Pending"
                          ? "text-yellow-500"
                          : "text-green-500"
                        }`}
                    />
                    <p
                      className={
                        job.status === "Pending"
                          ? "text-yellow-400"
                          : "text-green-400"
                      }
                    >
                      {job.status}
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex">
                <ul className="steps mt-4">
                  {statusSteps.map((step, index) => {
                    const currentIndex = statusSteps.findIndex(
                      (s) => s.value === job.status
                    );
                    let stepClass = "";

                    if (job.status === "Rejected") {
                      stepClass = "step-error";
                    } else if (index <= currentIndex) {
                      stepClass = "step-highlight step-info";
                    }

                    return (
                      <li key={step.value} className={`step ${stepClass}`}>
                        {t(step.label)}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>{t("no_applied_jobs_found")}</p>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
