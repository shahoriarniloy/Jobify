import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  TagIcon,
  DocumentTextIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import axiosSecure from "../../../../Hooks/UseAxiosSecure";
import DashboardLoader from "../../../../Shared/DashboardLoader";

const AppliedCandidates = () => {
  const location = useLocation();
  const { jobId } = location.state;
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [filterStatus, setFilterStatus] = useState("All");

  const statusOptions = [
    { value: "All", label: "All Statuses" },
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
        // console.log("Candidates fetched:", response.data);
      } catch (err) {
        // console.error(err);
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [jobId]);

  const handleStatusChange = (email, newStatus, applicationId) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [email]: newStatus,
    }));

    axiosSecure
      .patch(`/updateCandidateStatus`, {
        email,
        status: newStatus,
        applicationId,
      })
      .then((response) => {
        // console.log("Status updated:", response.data);
      })
      .catch((error) => {
        // console.error("Error updating status:", error);
      });
  };

  const toggleDropdown = (email) => {
    setDropdownOpen((prevDropdown) => ({
      ...prevDropdown,
      [email]: !prevDropdown[email],
    }));
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const filteredCandidates = candidates.filter((candidate) => {
    if (filterStatus === "All") return true;
    return candidate.application.status === filterStatus;
  });

  if (loading) {
    return <DashboardLoader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Applied Candidates</h1>
        </div>
        <div>
          <label htmlFor="filter-status" className="mr-2">
            Filter by Status:
          </label>
          <select
            id="filter-status"
            value={filterStatus}
            onChange={handleFilterChange}
            className="select select-bordered"
          >
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
            <figure className="w-24 h-24">
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
                Email: {candidate?.user?.email}
              </p>

              <div className="card-actions justify-end">
                <div className="relative inline-block">
                  <button
                    className="btn bg-gradient-to-r from-orange-400 to-orange-500 flex items-center text-white"
                    onClick={() => toggleDropdown(candidate?.user?.email)}
                  >
                    <TagIcon className="h-5 w-5 mr-2" />
                    {selectedStatus[candidate?.user?.email] ||
                      candidate.application.status}
                    <ChevronDownIcon className="h-5 w-5 ml-2" />
                  </button>

                  {dropdownOpen[candidate?.user?.email] && (
                    <div className="dropdown-content absolute left-0 mt-2 bg-white shadow-lg z-10 w-48 border rounded">
                      {statusOptions
                        .filter((option) => option.value !== "All")
                        .map((status) => (
                          <div
                            key={status.value}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() =>
                              handleStatusChange(
                                candidate?.user?.email,
                                status.value,
                                candidate?.application?._id
                              )
                            }
                          >
                            {status.label}
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <Link
                  to={`/dashboard/candidate-resume/${candidate?.user?.email}`}
                >
                  <button className="btn bg-gradient-to-r from-blue-500 to-blue-700 flex items-center text-white">
                    <DocumentTextIcon className="h-5 w-5 mr-2" /> View Resume
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // function viewCV(email) {
  // }
};

export default AppliedCandidates;
