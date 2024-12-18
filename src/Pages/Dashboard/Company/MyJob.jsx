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
import { Helmet } from "react-helmet";

const JobTable = () => {
  const { t } = useTranslation(); // Destructure t from useTranslation
  const { currentUser } = useCurrentUser();
  const theme = useSelector((state) => state.theme.theme);

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
  // console.log(jobs);

  if (isLoading) {
    return <DashboardLoader />;
  }

  return (
    <div className="overflow-x-auto">
       <Helmet>
        <title>Jobify - My Jobs</title>
      </Helmet>
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
          {jobs?.map(({ _id, jobInfo, companyInfo, applicationsCount }) => (
            <tr key={_id} className="border-b">
              <td className="px-4 py-2">{jobInfo.title}</td>
              <td className="px-4 py-2 text-green-500">
                <button>{t("open")}</button>
              </td>
              <td className="px-4 py-2">{applicationsCount}</td>

              <td className="px-4 py-2">
                <Link
                  to={`/dashboard/job-candidates`}
                  state={{ jobId: _id, jobTitle: jobInfo.title }}
                  className={ theme === "dark"? "btn bg-slate-900  border-slate-700 px-3 py-1 text-blue-700 rounded flex items-center" : "btn bg-blue-100 px-3 py-1 text-blue-700 rounded flex items-center"}
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
