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

const CompanyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState(null);
  const { email } = useParams();
  // console.log(email);
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
        // console.error("Error fetching data:", error);
        setError("Failed to load company or job data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobsAndCompany();
  }, [email]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto ">
      {company && (
        <>
          <h1 className="font-bold text-3xl mb-2 pt-8 text-center animate-fadeIn">
            {company.company_name}
          </h1>
          <div className="border-2 rounded-lg p-6 flex gap-5 justify-center text-center animate-fadeIn">
            <div className="flex justify-center items-center">
              <BiStopwatch className="text-2xl text-blue-500" />
              <p className="text-gray-500">Company Type:</p>
              <p className="font-bold">{company.company_type}</p>
            </div>
            <div className="flex justify-center items-center">
              <PiBriefcase className="text-2xl text-blue-500" />
              <p className="text-gray-500">Industry:</p>
              <p className="font-bold">{company.industry}</p>
            </div>
          </div>
        </>
      )}

      <div className="flex justify-center lg:flex-row flex-col mt-6">
        <div className="container mx-auto">
          <h2 className="font-bold text-2xl mb-6 animate-fadeIn">
            Open Positions
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
                  <strong>Location:</strong> {job.location}
                </p>
                <p className="text-gray-500">
                  <strong>Education:</strong> {job.education}
                </p>
                <p className="text-gray-500">
                  <strong>Experience:</strong> {job.experience}
                </p>
                <p className="text-gray-500">
                  <strong>Job Level:</strong> {job.jobLevel}
                </p>
                <p className="text-gray-500">
                  <strong>Job Type:</strong> {job.jobType}
                </p>
                <p className="text-gray-500">
                  <strong>Salary Range:</strong> {job.salaryRange}
                </p>
                <p className="text-gray-500 mb-4">
                  <strong>Vacancy:</strong> {job.vacancy}
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
                    Apply now
                    <FaArrowRight />
                  </button>

                  <Link
                    to={`/job/${job._id}`}
                    className="flex items-center justify-center gap-3 w-36 px-4 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* {company && (
    <div className="">
      <div className="border-2 rounded-lg p-4 mr-4 animate-fadeIn">
        <h2 className="font-bold text-xl">Contact Information</h2>
        <div className="flex items-center my-5">
          <FiGlobe className="text-3xl text-blue-500" />
          <div className="ml-4">
            <p className="text-gray-500">Website</p>
            <p className="font-bold">{company.company_website}</p>
          </div>
        </div>
        <hr />
        <div className="flex items-center my-5">
          <LuPhoneCall className="text-3xl text-blue-500" />
          <div className="ml-4">
            <p className="text-gray-500">Phone</p>
            <p className="font-bold">{company.phone_number}</p>
          </div>
        </div>
        <hr />
        <div className="flex items-center mt-5">
          <TfiEmail className="text-3xl text-blue-500" />
          <div className="ml-4">
            <p className="text-gray-500">Email</p>
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
