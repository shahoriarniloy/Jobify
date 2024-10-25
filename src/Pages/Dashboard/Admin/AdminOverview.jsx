import React from "react";
import { useEffect, useState } from "react";
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import {
  FaUsers,
  FaBriefcase,
  FaClipboardList,
  FaUserPlus,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const AdminOverview = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalJobSeekers: 0,
    totalEmployers: 0,
    totalJobsPosted: 0,
    totalApplications: 0,
  });

  const [recentJobSeekers, setRecentJobSeekers] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const jobSeekerResponse = await axiosSecure.get(
          "/admin/job-seekers/stats"
        );
        const employerResponse = await axiosSecure.get(
          "/admin/employers/stats"
        );
        const jobsResponse = await axiosSecure.get("/admin/jobs/stats");
        const applicationsResponse = await axiosSecure.get(
          "/admin/applications/stats"
        );

        const recentJobSeekersResponse = await axiosSecure.get(
          "/admin/job-seekers/recent"
        );
        const recentJobsResponse = await axiosSecure.get("/admin/jobs/recent");

        setStats({
          totalJobSeekers: jobSeekerResponse.data.total,
          totalEmployers: employerResponse.data.total,
          totalJobsPosted: jobsResponse.data.total,
          totalApplications: applicationsResponse.data.total,
        });

        setRecentJobSeekers(recentJobSeekersResponse.data);
        setRecentJobs(recentJobsResponse.data);
      } catch (error) {
        // console.error("Error fetching overview data", error);
      }
    };

    fetchOverviewData();
  }, []);

  return (
    <div className="admin-overview-container">
      <Helmet>
        <title>Jobify - Admin Overview</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card p-4 bg-blue-100 text-blue-900 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">{stats.totalJobSeekers}</h3>
              <p className="text-sm">{t("total_job_seekers")}</p>
            </div>
            <FaUsers className="text-4xl text-blue-500" />
          </div>
        </div>

        <div className="stat-card p-4 bg-green-100 text-green-900 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">{stats.totalEmployers}</h3>
              <p className="text-sm">{t("total_employers")}</p>
            </div>
            <FaBriefcase className="text-4xl text-green-500" />
          </div>
        </div>

        <div className="stat-card p-4 bg-yellow-100 text-yellow-900 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">{stats.totalJobsPosted}</h3>
              <p className="text-sm">{t("total_jobs_posted")}</p>
            </div>
            <FaClipboardList className="text-4xl text-yellow-500" />
          </div>
        </div>

        <div className="stat-card p-4 bg-red-100 text-red-900 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">{stats.totalApplications}</h3>
              <p className="text-sm">{t("total_applications")}</p>
            </div>
            <FaUserPlus className="text-4xl text-red-500" />
          </div>
        </div>
      </div>

      <div className="recent-job-seekers mt-8 p-6">
        <h2 className="text-xl font-bold mb-4">{t("recent_job_seekers")}</h2>
        <table className="min-w-full text-xs sm:text-sm">
          <thead className="dark:bg-gray-300">
            <tr className="text-left">
              <th className="p-3">{t("name")}</th>
              <th className="p-3 hidden md:table-cell">{t("email")}</th>
            </tr>
          </thead>
          <tbody>
            {recentJobSeekers.map((jobSeeker) => (
              <tr
                key={jobSeeker._id}
                className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
              >
                <td className="p-3">{jobSeeker.name}</td>
                <td className="p-3 hidden md:table-cell">{jobSeeker.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="recent-jobs mt-8 p-6">
        <h2 className="text-xl font-bold mb-4">{t("recent_jobs_posted")}</h2>
        <table className="min-w-full text-xs sm:text-sm">
          <thead className="dark:bg-gray-300">
            <tr className="text-left">
              <th className="p-3">{t("job_title")}</th>
              <th className="p-3 hidden md:table-cell">{t("company")}</th>
            </tr>
          </thead>
          <tbody>
            {recentJobs.map((job) => (
              <tr
                key={job._id}
                className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
              >
                <td className="p-3">{job.jobInfo.title}</td>
                <td className="p-3 hidden md:table-cell">
                  {job.companyInfo.company_name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOverview;
