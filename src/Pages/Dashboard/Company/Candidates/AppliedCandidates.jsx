import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  TagIcon,
  DocumentTextIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import axiosSecure from "../../../../Hooks/UseAxiosSecure";
import DashboardLoader from "../../../../Shared/DashboardLoader";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const AppliedCandidates = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { jobId } = location.state;
  const [candidates, setCandidates] = useState([]);
  const [company, setCompany] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [filterStatus, setFilterStatus] = useState("All");
  const { currentUser } = useCurrentUser();
  const [interviewDetails, setInterviewDetails] = useState({
    date: "",
    time: "",
    roomId: "",
  });
  const [schedulingCandidate, setSchedulingCandidate] = useState(null);

  const statusOptions = [
    //     { value: "All", label: t("all_statuses") },
    //     { value: "Pending", label: t("pending") },
    //     { value: "Under Review", label: t("under_review") },
    //     { value: "Shortlisted", label: t("shortlisted") },
    //     { value: "Interview Scheduled", label: t("interview_scheduled") },
    //     { value: "Assessment Task", label: t("assessment_task") },
    //     { value: "Rejected", label: t("rejected") },
    //     { value: "Hired", label: t("hired") },
    // =======
    { value: "Pending", label: "Pending" },
    { value: "Under Review", label: "Under Review" },
    { value: "Shortlisted", label: "Shortlisted" },
    { value: "Interview Scheduled", label: "Interview Scheduled" },
    { value: "Assessment Task", label: "Assessment Task" },
    { value: "Rejected", label: "Rejected" },
    { value: "Hired", label: "Hired" },
  ];

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const response = await axiosSecure.get(
          `/appliedCandidates?job_id=${jobId}`
        );
        setCandidates(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [jobId]);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        if (!currentUser?.email) {
          throw new Error("User not found");
        }
        setLoading(true);

        const companyResponse = await axiosSecure.get(
          `/companies/${currentUser.email}`
        );
        setCompany(companyResponse.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.email) {
      fetchCompanyData();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const handleStatusChange = (email, newStatus, applicationId, name) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [email]: newStatus,
    }));

    const statusUpdate = {
      email,
      status: newStatus,
      applicationId,
      name,
      company: company?.company_name,
      jobId,
    };

    if (newStatus === "Interview Scheduled") {
      statusUpdate.interviewDate = interviewDetails.date;
      statusUpdate.interviewTime = interviewDetails.time;
      statusUpdate.roomId = interviewDetails.roomId;

      console.log("Status Update Payload:", statusUpdate);
    }

    axiosSecure

      .patch(`/updateCandidateStatus`, statusUpdate)
      .then((response) => {
        console.log("Candidate status updated successfully:", response.data);
        toast.success(`Status Updated to ${statusUpdate.status}`);
      })
      .catch((error) => {
        console.error("Error updating candidate status:", error);
        console.error("Response data:", error.response.data);
      });
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const filteredCandidates = candidates.filter((candidate) => {
    if (filterStatus === "All") return true;
    return candidate.application.status === filterStatus;
  });

  const openInterviewScheduler = (candidate) => {
    setSchedulingCandidate(candidate);
  };

  const scheduleInterview = (e) => {
    e.preventDefault();

    handleStatusChange(
      schedulingCandidate?.user?.email,
      "Interview Scheduled",
      schedulingCandidate?.application?._id,
      schedulingCandidate?.user?.name
    );

    console.log(
      `Scheduled interview for ${schedulingCandidate.user.name} on ${interviewDetails.date} at ${interviewDetails.time} in room ${interviewDetails.roomId}`
    );

    setSchedulingCandidate(null);
    setInterviewDetails({ date: "", time: "", roomId: "" });
  };

  if (loading) {
    return <DashboardLoader />;
  }

  if (error) {
    return (
      <div>
        {t("error")}: {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{t("applied_candidates")}</h1>
        </div>
        <div>
          <label htmlFor="filter-status" className="mr-2">
            {t("filter_by_status")}:
          </label>
          <select
            id="filter-status"
            value={filterStatus}
            onChange={handleFilterChange}
            className="select select-bordered"
          >
            <option value="All">All Statuses</option>
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate?.user?.email}
            className="card lg:card-side bg-base-100 shadow-xl"
          >
            <figure className="w-48 h-auto">
              <img
                src={candidate?.user?.photoURL || ""}
                alt={candidate?.user?.name}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{candidate?.user?.name}</h2>
              <p>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ marginRight: "8px" }}
                />
                {t("email")}: {candidate?.user?.email}
              </p>

              <div className="card-actions flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                {statusOptions.map((status) => (
                  <button
                    key={status.value}
                    className={`btn ${candidate.application.status === status.value
                        ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
                        : "bg-white text-black"
                      }`}
                    onClick={() =>
                      handleStatusChange(
                        candidate?.user?.email,
                        status.value,
                        candidate?.application?._id,
                        candidate?.user?.name
                      )
                    }
                  >
                    {status.label}
                  </button>
                ))}

                <button
                  className="btn bg-gradient-to-r from-green-500 to-green-700 flex items-center text-white"
                  onClick={() => openInterviewScheduler(candidate)}
                  disabled={
                    candidate.application.status === "Interview Scheduled"
                  }
                >
                  Schedule Interview
                </button>

                <Link
                  to={`/dashboard/candidate-resume/${candidate?.user?.email}`}
                >
                  <button className="btn bg-gradient-to-r from-blue-500 to-blue-700 flex items-center text-white">
                    <DocumentTextIcon className="h-5 w-5 mr-2" />{" "}
                    {t("view_resume")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {schedulingCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
              <h2 className="text-lg font-bold mb-4">
                Schedule Interview with{" "}
                <span className="text-blue-500">
                  {schedulingCandidate.user.name}
                </span>
              </h2>
              <form onSubmit={scheduleInterview}>
                <div className="mb-4">
                  <label htmlFor="date" className="block">
                    Date:
                  </label>
                  <input
                    type="date"
                    id="date"
                    required
                    value={interviewDetails.date}
                    onChange={(e) =>
                      setInterviewDetails({
                        ...interviewDetails,
                        date: e.target.value,
                      })
                    }
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="time" className="block">
                    Time:
                  </label>
                  <input
                    type="time"
                    id="time"
                    required
                    value={interviewDetails.time}
                    onChange={(e) =>
                      setInterviewDetails({
                        ...interviewDetails,
                        time: e.target.value,
                      })
                    }
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="roomId" className="block">
                    Room ID:
                  </label>
                  <input
                    type="text"
                    id="roomId"
                    required
                    value={interviewDetails.roomId}
                    onChange={(e) =>
                      setInterviewDetails({
                        ...interviewDetails,
                        roomId: e.target.value,
                      })
                    }
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="btn bg-gray-300 mr-2"
                    onClick={() => setSchedulingCandidate(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn bg-blue-500 text-white">
                    Schedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedCandidates;
