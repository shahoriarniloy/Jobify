import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { BiStopwatch } from "react-icons/bi";
import { PiBriefcase } from "react-icons/pi";
import { FiGlobe } from "react-icons/fi";
import { LuPhoneCall } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";

const CompanyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState(null);
  const { companyId } = useParams();

  useEffect(() => {
    const fetchJobsAndCompany = async () => {
      try {
        const jobsResponse = await axiosSecure.get(`/jobs/company/${companyId}`);
        setJobs(jobsResponse.data);

        const companyResponse = await axiosSecure.get(`/companies/${companyId}`);
        setCompany(companyResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchJobsAndCompany();
  }, [companyId]);

  return (
    <div className="container mx-auto px-4">
      {company && (
        <>
          <h1 className="font-bold text-3xl mb-2 pt-32 text-center animate-fadeIn">{company.company_name}</h1>
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

      <div className="flex justify-center lg:flex-row flex-col mt-10">
        <div className="container mx-auto">
          <h2 className="font-bold text-2xl mb-6 animate-fadeIn">Open Positions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-6">
            {jobs.map((job, index) => (
              <div 
                key={job._id} 
                className={`border rounded-lg p-4 shadow-lg bg-white transition-transform duration-300 hover:scale-105 animate-fadeIn delay-${index * 100}`}
              >
                <h3 className="font-bold text-xl">{job.title}</h3>
                <p className="text-gray-700"><strong>Location:</strong> {job.location}</p>
                <p className="text-gray-500"><strong>Education:</strong> {job.education}</p>
                <p className="text-gray-500"><strong>Experience:</strong> {job.experience}</p>
                <p className="text-gray-500"><strong>Job Level:</strong> {job.jobLevel}</p>
                <p className="text-gray-500"><strong>Job Type:</strong> {job.jobType}</p>
                <p className="font-bold"><strong>Salary Range:</strong> {job.salaryRange}</p>
                <p className="text-gray-500"><strong>Vacancy:</strong> {job.vacancy}</p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {company && (
          <div className="pt-24">
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
        )}
      </div>
    </div>
  );
};

export default CompanyJobs;
