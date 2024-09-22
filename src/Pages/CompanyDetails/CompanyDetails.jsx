import { useState, useEffect } from "react";
import instagram_logo from "../../assets/image/CompanyDetails/instagram_logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FiCalendar, FiGlobe } from "react-icons/fi";
import { BiStopwatch } from "react-icons/bi";
import { PiBriefcase, PiWallet } from "react-icons/pi";
import { LuPhoneCall } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";
import JobCardGrid from "../../components/JobCardGrid/JobCardGrid";

const CompanyDetails = () => {
  const [company, setCompany] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const companyId = "66e9b2cdd3a959b9442eed96";
      try {
        const response = await fetch(
          `http://localhost:5000/companies/${companyId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setCompany(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching the JSON data:", error);
      }
    };

    fetchData();
    
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (

    <div className="relative noto">

      <div className="relative">
        <div>
          <img
            className="w-full h-56 object-cover md:h-72 lg:h-96"
            src={company.company_logo}
            alt="Banner"
          />
        </div>

        <div className="container absolute left-1/2 transform -translate-x-1/2 md:-bottom-16 bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 w-11/12 md:w-3/4 lg:w-1/2">
          <div className="flex flex-col md:flex-row items-center">
            <img
              src={instagram_logo}
              className="w-16 h-16 object-cover rounded-full"
              alt="Company Logo"
            />

            <div className="md:pl-4">
              <h3 className="font-bold text-xl md:text-2xl lg:text-3xl">
              {company?.company_name}
              </h3>
              <p className="text-gray-500">{company?.industry}</p>
            </div>

            <div className="mt-4 md:mt-0 md:ml-auto">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                View Open Position →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:mt-36  md:mb-48 container mx-auto px-4">
        <div className="md:w-1/2">
          <h2 className="font-bold my-5 text-xl md:text-2xl lg:text-3xl">
            Description
          </h2>
          <p className="text-gray-500 mb-4">{company?.company_description}</p>

          <h2 className="font-bold my-5 text-xl md:text-2xl lg:text-3xl">
  Company Benefits
</h2>
<p className="text-gray-500 mb-4">
  At TechWorld Solutions, we believe in creating a supportive and rewarding environment for our employees. We offer a range of benefits designed to support your personal and professional growth.
</p>
<ul className="list-disc text-gray-500 ml-5">
  <li>Comprehensive health, dental, and vision insurance coverage.</li>
  <li>Flexible work hours and remote work options.</li>
  <li>401(k) retirement plan with company match.</li>
  <li>Generous paid time off, including vacation, holidays, and sick leave.</li>
  <li>Professional development programs and opportunities for career growth.</li>
  <li>Employee wellness programs and gym membership discounts.</li>
</ul>

          <div className="flex flex-wrap items-center gap-5 my-5">
            <p>Share profile:</p>


            {company?.social_media_links?.facebook && (
              <a
                href={company?.social_media_links?.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center border-2 rounded p-3"
              >
                <FaFacebookF className="text-blue-600 mr-3" />
                <p>Facebook</p>
              </a>
            )}

            {company?.social_media_links?.twitter && (
              <a
                href={company?.social_media_links?.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center border-2 rounded p-3"
              >
                <FaTwitter className="text-sky-500 mr-3" />
                <p>Twitter</p>
              </a>
            )}

            {company?.social_media_links?.linkedin && (
              <a
                href={company?.social_media_links?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center border-2 rounded p-3"
              >
                <FaLinkedin className="text-blue-700 mr-3" />
                <p>LinkedIn</p>
              </a>
            )}

            {company?.social_media_links?.pinterest && (
              <a
                href={company?.social_media_links?.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center border-2 rounded p-3"
              >
                <FaPinterest className="text-red-600 mr-3" />
                <p>Pinterest</p>
              </a>
            )}

          </div>
        </div>


        <div className="md:ml-10 md:w-1/2">
          <div className="md:p-8 border-2 rounded-lg grid grid-cols-2 gap-5 md:gap-10">
            <div>
              <FiCalendar className="text-2xl text-blue-500" />
              <p className="text-gray-500 mt-2">Founded in:</p>
              <p className="font-bold text-sm">{company?.founded_date}</p>
            </div>
            <div>
              <BiStopwatch className="text-2xl text-blue-500" />
              <p className="text-gray-500 mt-2">Organization type</p>
              <p className="font-bold text-sm">
                {company?.company_type} Company
              </p>
            </div>
            <div>
              <PiWallet className="text-2xl text-blue-500" />
              <p className="text-gray-500 mt-2">Team size</p>
              <p className="font-bold text-sm">
                {company?.company_size} Candidates
              </p>
            </div>
            <div>
              <PiBriefcase className="text-2xl text-blue-500" />
              <p className="text-gray-500 mt-2">Industry types</p>
              <p className="font-bold text-sm">{company?.industry}</p>
            </div>
          </div>
          <div className="md:p-8 border-2 rounded-lg md:my-6">
            <h2 className="font-bold text-xl md:text-2xl">
              Contact Information
            </h2>
            <div className="flex items-center my-5">
              <FiGlobe className="text-3xl text-blue-500" />
              <div className="ml-4">
                <p className="text-gray-500">Website</p>
                <p className="text-black font-bold">
                  {company?.company_website}
                </p>
              </div>
            </div>
            <hr />
            <div className="flex items-center my-5">
              <LuPhoneCall className="text-3xl text-blue-500" />
              <div className="ml-4">
                <p className="text-gray-500">Phone</p>
                <p className="text-black font-bold">{company?.phone_number}</p>
              </div>
            </div>
            <hr />
            <div className="flex items-center my-5">
              <TfiEmail className="text-3xl text-blue-500" />
              <div className="ml-4">
                <p className="text-gray-500">Email address</p>
                <p className="text-black font-bold">{company?.email}</p>
              </div>
            </div>
          </div>

          <div className="md:p-8 border-2 rounded-lg md:my-6">
            <h2 className="font-bold text-xl md:text-2xl">Follow us on:</h2>
            <div className="flex gap-3 my-4">
              {company?.social_media_links?.facebook && (
                <a
                  href={company?.social_media_links?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-blue-100 rounded text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <FaFacebookF />
                </a>
              )}

              {company?.social_media_links?.twitter && (
                <a
                  href={company?.social_media_links?.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-blue-100 rounded text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <FaTwitter />
                </a>
              )}

              {company?.social_media_links?.instagram && (
                <a
                  href={company?.social_media_links?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-blue-100 rounded text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <FaInstagram />
                </a>
              )}

              {company?.social_media_links?.youtube && (
                <a
                  href={company?.social_media_links?.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-blue-100 rounded text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <FaYoutube />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 mt-10">
        <h2 className="font-bold text-xl md:text-2xl lg:text-3xl md:mt-24 md:mb-12">
        Open Position ({jobs?.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <JobCardGrid key={job._id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CompanyDetails;
