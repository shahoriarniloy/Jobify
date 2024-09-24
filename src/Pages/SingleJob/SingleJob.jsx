import socialLogo from "../../assets/image/CompanyDetails/instagram_logo.png";
import {
  FaArrowLeft,
  FaArrowRight,
  FaFacebookF,
  FaLink,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa6";
import { FiCalendar, FiPhone } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { IoBookmarkOutline, IoLocationOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { BiStopwatch } from "react-icons/bi";
import { PiBriefcase, PiWallet } from "react-icons/pi";
import JobCardGrid from "../../components/JobCardGrid/JobCardGrid";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const SingleJob = () => {
  const [job, setJob] = useState([]);
  const [company, setCompany] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let [isOpen, setIsOpen] = useState(false);

  const jobId = "66f04efdd3a959b944c22130";

  const {
    company_id,
    title,
    jobType,
    deadline,
    jobDescription,
    responsibilities,
  } = job;

  // get job by id
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axiosSecure.get(`/job/${jobId}`);
        setJob(response.data);
        // console.log("Fetched job data:", response.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };
    fetchJobData();
  }, [jobId]); // Add jobId as a dependency in case it changes

  // get company by id
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axiosSecure.get(`/companies/${company_id}`);
        setCompany(response.data);
        // console.log("Fetched company data:", response.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };
    fetchCompanyData();
  }, [company_id]); // Add jobId as a dependency in case it changes

  // get job card for pagination
  useEffect(() => {
    const fetchJobDataPagination = async () => {
      try {
        const response = await axiosSecure.get(`/jobs?page=${page}&limit=6`); // Sending page and limit
        setJobs(response.data);
        setTotalPages(response.data.totalPages);
        // console.log("Fetched jobs data:", response.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };
    fetchJobDataPagination();
  }, [page]);

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Optionally handle the job data rendering
  if (!job) {
    return <div>Loading job details...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="container mx-auto mt-20 md:mt-24 pt-5 mb-9 md:flex justify-between">
        {/* left side */}
        <div className="flex gap-5">
          <div>
            <img className="rounded-full" src={socialLogo} alt="" />
          </div>
          <div className="items-center justify-center my-auto">
            <div className="flex ">
              <h2 className="font-bold">{title}</h2>
              <p className="text-xs text-red-400 bg-red-100 font-semibold my-auto py-1 px-3 rounded-full ml-2">
                Featured
              </p>
              <p className="text-xs text-blue-400 bg-blue-100 font-semibold my-auto py-1 px-3 rounded-full ml-2">
                {jobType}
              </p>
            </div>
            <div className="md:flex ">
              <p className="flex items-center gap-2 ">
                <FaLink className="text-blue-400" />
                {company?.company_website}
              </p>
              <p className="flex items-center gap-2 mx-3">
                <FiPhone className="text-blue-400" />
                {company?.phone_number}
              </p>
              <p className="flex items-center gap-2 mx-2">
                <TfiEmail className="text-blue-400" />
                {company?.email}
              </p>
            </div>
          </div>
        </div>

        {/* right side */}
        <div>
          <div className="flex items-center gap-3">
            <div className="p-5 bg-blue-100 rounded-md">
              <IoBookmarkOutline className="text-blue-600" />
            </div>
            <div className="items-center">
              <button
                className={`flex items-center gap-3 px-16 py-4 rounded-md ${
                  new Date() > new Date(deadline)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-700"
                } text-white`}
                disabled={new Date() > new Date(deadline)}
              >
                Apply now <FaArrowRight />
              </button>
            </div>
          </div>
          <div className="my-3 md:text-right ">
            Job expire in: <span className="text-red-500">{deadline}</span>
          </div>
        </div>
      </div>

      {/* body */}
      <section className="container mx-auto md:flex">
        {/* Left Section */}
        <section className="w-1/2 ">
          {/* description */}
          <div className="my-4">
            <h3 className="font-bold mb-4">Job Description</h3>
            <p className="text-gray-500">{jobDescription}</p>
          </div>

          {/* Responsibilities */}
          <div className="my-4">
            <h3 className="font-bold mb-4">Responsibilities</h3>
            <ul className="list-disc list-inside pl-5 space-y-2">
              {responsibilities?.map(
                (
                  item,
                  index // Use optional chaining
                ) => (
                  <li key={index} className="text-gray-500">
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-wrap items-center gap-5 my-5">
            <p>Share profile:</p>
            <a
              href={""}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center border-2 rounded p-3"
            >
              <FaFacebookF className="text-blue-600 mr-3" />
              <p>Facebook</p>
            </a>
            <a
              href={""}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center border-2 rounded p-3"
            >
              <FaTwitter className="text-sky-500 mr-3" />
              <p>Twitter</p>
            </a>

            <a
              href={""}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center border-2 rounded p-3"
            >
              <FaPinterest className="text-red-600 mr-3" />
              <p>Pinterest</p>
            </a>
          </div>
        </section>
        {/* right Section */}
        <section className="md:ml-10 md:w-1/2">
          {/* job overview */}

          <div className="md:p-8 border-2 rounded-lg">
            <h2 className=" mb-6 font-bold text-xl md:text-2xl">
              Job Overview
            </h2>
            <div className=" grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10">
              <div>
                <FiCalendar className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">JOB POSTED:</p>
                <p className="font-bold text-sm">{job?.posted}</p>
              </div>
              <div>
                <BiStopwatch className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">JOB EXPIRE IN:</p>
                <p className="font-bold text-sm">{job?.deadline}</p>
              </div>
              <div>
                <PiBriefcase className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">EDUCATION</p>
                <p className="font-bold text-sm">{job?.education}</p>
              </div>
              <div>
                <PiWallet className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">SALERY:</p>
                <p className="font-bold text-sm">{job?.salaryRange}</p>
              </div>
              <div>
                <IoLocationOutline className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">LOCATION:</p>
                <p className="font-bold text-sm">{job?.location}</p>
              </div>
              <div>
                <PiBriefcase className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">JOB TYPE:</p>
                <p className="font-bold text-sm">{job?.jobType}</p>
              </div>
              <div>
                <PiBriefcase className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">EXPERIENCE</p>
                <p className="font-bold text-sm">{job?.experience}</p>
              </div>
            </div>
          </div>

          {/* company details */}
          <div className="md:p-8 border-2 rounded-lg my-6">
            {/* header */}
            <div className="flex gap-4 mb-8">
              <img
                className="w-14 h-14 rounded-md"
                src={company?.company_logo}
                alt=""
              />
              <div className=" my-auto">
                <h3 className="font-bold mb-2">{company?.company_name}</h3>
                <p className="text-gray-500 text-xs">{company?.industry}</p>
              </div>
            </div>
            {/* details */}
            <div>
              <div className="justify-between flex mb-4">
                <p className="text-gray-500 text-sm">Founded in:</p>
                <p className="text-sm">{company?.founded_date}</p>
              </div>
              <div className="justify-between flex mb-4">
                <p className="text-gray-500 text-sm">Organization type:</p>
                <p className="text-sm">{company?.company_type} Company</p>
              </div>
              <div className="justify-between flex mb-4">
                <p className="text-gray-500 text-sm">Company size:</p>
                <p className="text-sm">{company?.company_size} Employers</p>
              </div>
              <div className="justify-between flex mb-4">
                <p className="text-gray-500 text-sm">Phone:</p>
                <p className="text-sm">{company?.phone_number}</p>
              </div>
              <div className="justify-between flex mb-4">
                <p className="text-gray-500 text-sm">Email:</p>
                <p className="text-sm">{company?.email}</p>
              </div>
              <div className="justify-between flex ">
                <p className="text-gray-500 text-sm">Email:</p>
                <p className="text-sm">{company?.company_website}</p>
              </div>
            </div>
          </div>
        </section>
      </section>
      <hr className="text-gray-500 md:mb-24" />

      {/* Related jobs pagination */}
      <section className="container mx-auto">
        <div>
          {/* header */}
          <div className="flex justify-between mb-12">
            <h3 className="font-bold text-xl">Related Jobs</h3>
            <div className="">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className="btn bg-blue-100 h-12 w-12"
              >
                <FaArrowLeft className="text-blue-400" />
              </button>
              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="btn bg-blue-100 ml-4 h-12 w-12"
              >
                <FaArrowRight className="text-blue-400" />
              </button>
            </div>
          </div>

          {/* cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {Array.isArray(jobs.jobs) && jobs.jobs.length > 0 ? (
              jobs.jobs.map((job) => <JobCardGrid key={job._id} job={job} />)
            ) : (
              <p>No jobs available</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleJob;
