import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import { BiStopwatch } from "react-icons/bi";
import { PiBriefcase } from "react-icons/pi";
import { FiGlobe } from "react-icons/fi";
import { LuPhoneCall } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";
import { FaArrowRight } from "react-icons/fa";

import ApplyJobModal from "../../../components/Modal/ApplyJobModal";
import UseCheckJobAlreadyApply from "../../../Hooks/UseCheckJobAlreadyApply";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const CompanyJobs = () => {
  const { t } = useTranslation();
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState(null);
  const { email } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { verification } = UseCheckJobAlreadyApply(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobsAndCompany = async () => {
      setLoading(true);
      setError(null);
      try {
        const jobsResponse = await axiosSecure.get(`/jobs/company/${email}`);
        setJobs(jobsResponse.data);

        const companyResponse = await axiosSecure.get(`/companies/${email}`);
        setCompany(companyResponse.data);
      } catch (error) {
        setError(t("failed_to_load_data"));
      } finally {
        setLoading(false);
      }
    };

    fetchJobsAndCompany();
  }, [email, t]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <div>{t("loading")}</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto ">
       <Helmet>
        <title>Jobify - Company Jobs</title>
      </Helmet>
      {company && (
        <>
          <h1 className="font-bold text-3xl mb-2 pt-8 text-center animate-fadeIn">
            {company.company_name}
          </h1>
          <div className="border-2 rounded-lg p-6 flex gap-5 justify-center text-center animate-fadeIn">
            <div className="flex justify-center items-center">
              <BiStopwatch className="text-2xl text-blue-500" />
              <p className="text-gray-500">{t("company_type")}:</p>
              <p className="font-bold">{company.company_type}</p>
            </div>
            <div className="flex justify-center items-center">
              <PiBriefcase className="text-2xl text-blue-500" />
              <p className="text-gray-500">{t("industry")}:</p>
              <p className="font-bold">{company.industry}</p>
            </div>
          </div>
        </>
      )}

      <div className="flex justify-center lg:flex-row flex-col mt-6">
        <div className="container mx-auto">
          <h2 className="font-bold text-2xl mb-6 animate-fadeIn">
            {t("open_positions")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-12">
            {jobs.map((job, index) => (
              <div
                key={job._id}
                className={`border rounded-lg p-4 shadow-lg bg-white transition-transform duration-300
          hover:scale-105 animate-fadeIn delay-${index * 100}`}
              >
                <h3 className="font-bold text-xl mb-4">{job.title}</h3>
                <p className="text-gray-500">
                  <strong>{t("location")}:</strong> {job.location}
                </p>
                <p className="text-gray-500">
                  <strong>{t("education")}:</strong> {job.education}
                </p>
                <p className="text-gray-500">
                  <strong>{t("experience")}:</strong> {job.experience}
                </p>
                <p className="text-gray-500">
                  <strong>{t("job_level")}:</strong> {job.jobLevel}
                </p>
                <p className="text-gray-500">
                  <strong>{t("job_type")}:</strong> {job.jobType}
                </p>
                <p className="text-gray-500">
                  <strong>{t("salary_range")}:</strong> {job.salaryRange}
                </p>
                <p className="text-gray-500 mb-4">
                  <strong>{t("vacancy")}:</strong> {job.vacancy}
                </p>
                <ApplyJobModal
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  job={job}
                />
                <div className="flex gap-3">
                  <button
                    onClick={openModal}
                    className={`flex items-center justify-center gap-3 w-40 px-4 py-2 rounded-md
              font-semibold text-white ${
                new Date() > new Date(job.deadline)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
              }`}
                    disabled={new Date() > new Date(job.deadline)}
                  >
                    {t("apply_now")}
                    <FaArrowRight />
                  </button>

                  <Link
                    to={`/job/${job._id}`}
                    className="flex items-center justify-center gap-3 w-36 px-4 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                  >
                    {t("details")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Uncomment if you want to show the contact information */}
        {/* {company && (
          <div className="">
            <div className="border-2 rounded-lg p-4 mr-4 animate-fadeIn">
              <h2 className="font-bold text-xl">{t("contact_information")}</h2>
              <div className="flex items-center my-5">
                <FiGlobe className="text-3xl text-blue-500" />
                <div className="ml-4">
                  <p className="text-gray-500">{t("website")}</p>
                  <p className="font-bold">{company.company_website}</p>
                </div>
              </div>
              <hr />
              <div className="flex items-center my-5">
                <LuPhoneCall className="text-3xl text-blue-500" />
                <div className="ml-4">
                  <p className="text-gray-500">{t("phone")}</p>
                  <p className="font-bold">{company.phone_number}</p>
                </div>
              </div>
              <hr />
              <div className="flex items-center mt-5">
                <TfiEmail className="text-3xl text-blue-500" />
                <div className="ml-4">
                  <p className="text-gray-500">{t("email")}</p>
                  <p className="font-bold">{company.email}</p>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default CompanyJobs;
