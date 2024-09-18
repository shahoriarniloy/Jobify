import { useState, useEffect } from "react";
import bannerBg from "../../assets/image/CompanyDetails/bannerBg.png";
import instagram_logo from "../../assets/image/CompanyDetails/instagram_logo.png";
import {
  FaFacebookF,
  FaInstagram,
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
      try {
        const response = await fetch("http://localhost:5000/companies");
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
    <div className="relative">
      <div className="relative">
        {/* Banner Image */}
        <div>
          <img
            className="w-full h-56 object-cover md:h-72 lg:h-96"
            src={bannerBg}
            alt="Banner"
          />
        </div>

        {/* Company Details Section */}
        <div className="container absolute left-1/2 transform -translate-x-1/2 md:-bottom-16 bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 w-11/12 md:w-3/4 lg:w-1/2">
          <div className="flex flex-col md:flex-row items-center">
            {/* Company Logo */}
            <img
              src={instagram_logo}
              className="w-16 h-16 object-cover rounded-full"
              alt="Company Logo"
            />

            {/* Company Information */}
            <div className="md:pl-4">
              <h3 className="font-bold text-xl md:text-2xl lg:text-3xl">
                Twitter
              </h3>
              <p className="text-gray-500">Information Technology (IT)</p>
            </div>

            {/* CTA Button */}
            <div className="mt-4 md:mt-0 md:ml-auto">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                View Open Position →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:mt-36 container mx-auto px-4">
        <div className="md:w-1/2">
          <h2 className="font-bold my-5 text-xl md:text-2xl lg:text-3xl">
            Description
          </h2>
          <p className="text-gray-500 mb-4">
            Fusce et erat at nibh maximus fermentum. Mauris ac justo nibh.
            Praesent nec lorem lorem. Donec ullamcorper lacus mollis tortor
            pretium malesuada. In quis porta nisi, quis fringilla orci. Donec
            porttitor, odio a efficitur blandit, orci nisl porta elit, eget
            vulputate quam nibh ut tellus. Sed ut posuere risus, vitae commodo
            velit.
          </p>

          <h2 className="font-bold my-5 text-xl md:text-2xl lg:text-3xl">
            Company Benefits
          </h2>
          <p className="text-gray-500 mb-4">
            Donec dignissim nunc eu tellus malesuada fermentum. Sed blandit in
            magna at accumsan. Etiam imperdiet massa aliquam, consectetur leo
            in, auctor neque.
          </p>
          <ul className="list-disc text-gray-500 ml-5">
            <li>In hac habitasse platea dictumst.</li>
            <li>
              Sed aliquet, arcu eget pretium bibendum, odio enim rutrum arcu.
            </li>
            <li>Vestibulum id vestibulum odio.</li>
          </ul>

          <div className="flex flex-wrap items-center gap-5 my-5">
            <p>Share profile:</p>
            <div className="flex items-center border-2 rounded p-3">
              <FaFacebookF className="text-blue-600 mr-3" />
              <p>Facebook</p>
            </div>
            <div className="flex items-center border-2 rounded p-3">
              <FaTwitter className="text-sky-500 mr-3" />
              <p>Twitter</p>
            </div>
            <div className="flex items-center border-2 rounded p-3">
              <FaPinterest className="text-red-600 mr-3" />
              <p>Pinterest</p>
            </div>
          </div>
        </div>
        <div className="md:ml-10 md:w-1/2">
          <div className="md:p-8 border-2 rounded-lg grid grid-cols-2 gap-5 md:gap-10">
            <div>
              <FiCalendar className="text-2xl text-blue-500" />
              <p className="text-gray-500 mt-2">Founded in:</p>
              <p className="font-bold text-sm">14 June, 2021</p>
            </div>
            <div>
              <BiStopwatch className="text-2xl text-blue-500" />
              <p className="text-gray-500 mt-2">Organization type</p>
              <p className="font-bold text-sm">Private Company</p>
            </div>
            <div>
              <PiWallet className="text-2xl text-blue-500" />
              <p className="text-gray-500 mt-2">Team size</p>
              <p className="font-bold text-sm">120-300 Candidates</p>
            </div>
            <div>
              <PiBriefcase className="text-2xl text-blue-500" />
              <p className="text-gray-500 mt-2">Industry types</p>
              <p className="font-bold text-sm">Technology</p>
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
                <p className="text-black font-bold">www.estherhoward.com</p>
              </div>
            </div>
            <hr />
            <div className="flex items-center my-5">
              <LuPhoneCall className="text-3xl text-blue-500" />
              <div className="ml-4">
                <p className="text-gray-500">Phone</p>
                <p className="text-black font-bold">+1-202-555-0141</p>
              </div>
            </div>
            <hr />
            <div className="flex items-center my-5">
              <TfiEmail className="text-3xl text-blue-500" />
              <div className="ml-4">
                <p className="text-gray-500">Email address</p>
                <p className="text-black font-bold">esther.howard@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="md:p-8 border-2 rounded-lg md:my-6">
            <h2 className="font-bold text-xl md:text-2xl">Follow us on:</h2>
            <div className="flex gap-3 my-4">
              <div className="p-4 bg-blue-100 rounded text-blue-600 hover:bg-blue-600 hover:text-white">
                <FaFacebookF />
              </div>
              <div className="p-4 bg-blue-100 rounded text-blue-600 hover:bg-blue-600 hover:text-white">
                <FaTwitter />
              </div>
              <div className="p-4 bg-blue-100 rounded text-blue-600 hover:bg-blue-600 hover:text-white">
                <FaInstagram />
              </div>
              <div className="p-4 bg-blue-100 rounded text-blue-600 hover:bg-blue-600 hover:text-white">
                <FaYoutube />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Jobs section */}
      <section className="container mx-auto px-4 mt-10">
        <h2 className="font-bold text-xl md:text-2xl lg:text-3xl">
          Related Jobs
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
