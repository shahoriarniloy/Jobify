import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUserRole from "../../../Hooks/useUserRole";
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import { useSelector } from "react-redux";
import Loader from "../../../Shared/Loader";
import DashboardLoader from "../../../Shared/DashboardLoader";
import { useQuery } from "@tanstack/react-query";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next"; // Import useTranslation
import useCurrentUser from "../../../Hooks/useCurrentUser";

const JobTable = () => {
  const { t } = useTranslation(); // Destructure t from useTranslation
  const { currentUser } = useCurrentUser();

  const {
    data: jobs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchpostedjobs"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/jobs/dashboard/company/${currentUser?.email}`
      );
      return response.data;
    },
  });

  if (isLoading) {
    return <DashboardLoader />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2">{t("jobs")}</th>
            <th className="px-4 py-2">{t("status")}</th>
            <th className="px-4 py-2">{t("applications")}</th>
            <th className="px-4 py-2">{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {jobs?.map((job) => (
            <tr key={job?._id} className="border-b">
              <td className="px-4 py-2">{job?.title}</td>
              <td className="px-4 py-2 text-green-500">
                <button>{t("open")}</button>
              </td>
              <td className="px-4 py-2">{job?.applicationsCount || 0}</td>

              <td className="px-4 py-2">
                <Link
                  to={`/dashboard/job-candidates`}
                  state={{ jobId: job?._id }}
                  className="btn bg-blue-100 px-3 py-1 text-blue-700 rounded flex items-center"
                >
                  <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
                  {t("view_applications")}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
