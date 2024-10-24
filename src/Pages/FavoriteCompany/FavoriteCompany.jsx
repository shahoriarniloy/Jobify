import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ButtonLoader from "../../Shared/ButtonLoader";
import Bookmark from "../Find Job/Bookmark";
import useCurrentUser from "../../Hooks/useCurrentUser";

const FavoriteCompany = () => {
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();
  const userEmail = currentUser?.email;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyLogos, setCompanyLogos] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      if (!userEmail) {
        setLoading(false);
        return;
      }

      console.log(t("fetching_jobs_for_user_email"), userEmail);

      try {
        const response = await axiosSecure.get(
          `/users/${userEmail}/latest-jobs`
        );
        setJobs(response.data.jobs);
      } catch (error) {
        console.error(t("error_fetching_jobs"), error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [userEmail]);

  const fetchCompanyInfo = async (email) => {
    try {
      const response = await axiosSecure.get(`/companies/${email}`);
      return response.data.company_logo;
    } catch (error) {
      console.error(t("error_fetching_company_info"), error);
      return null;
    }
  };

  useEffect(() => {
    const fetchLogos = async () => {
      const logos = {};
      for (const job of jobs) {
        const logo = await fetchCompanyInfo(job?.hrEmail);
        logos[job._id] = logo;
      }
      setCompanyLogos(logos);
    };
    fetchLogos();
  }, [jobs]);

  if (loading) return <p>{t("loading")}</p>;
  if (error) return <p>{t("error_dynamic", { error })}</p>;

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className=" w-full relative group cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10"
          >
            <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-gradient-to-r from-blue-300 to-blue-500 transition-all duration-300 group-hover:scale-[10]"></span>
            <div className="relative z-10 mx-auto max-w-md">
              <span>
                <span className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-r from-blue-300 to-blue-700 transition-all duration-300 group-hover:bg-sky-400">
                  {companyLogos[job._id] ? (
                    <img
                      src={companyLogos[job._id]}
                      alt={`${job.title} ${t("logo")}`}
                      className="h-full w-full rounded-full transition-all"
                    />
                  ) : (
                    <ButtonLoader />
                  )}
                </span>
              </span>

              <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                <h2 className="text-2xl font-semibold tracking-wide">
                  {job.title}
                </h2>
                <div className="absolute -top-12 -right-6">
                  <Bookmark jobId={job._id} />
                </div>

                <p className="font-semibold">
                  {t("company_advanced_search", { company: job.company })}
                </p>
                <p className="text-sm tracking-wide">
                  {t("job_type_advanced_search", { jobType: job.jobType })}
                </p>
                <p className="text-sm">
                  {t("salary_advanced_search", {
                    salaryRange: job.salaryRange,
                  })}
                </p>
              </div>
              <div className="pt-5 text-base font-semibold leading-7">
                <Link
                  to={`/job/${job._id}`}
                  className="text-slate-500 transition-all duration-300 group-hover:text-white flex items-center"
                >
                  {t("view_details")}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteCompany;
