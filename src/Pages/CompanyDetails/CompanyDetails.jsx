import { useState } from "react";
import bannerBg from "../../assets/image/CompanyDetails/bannerBg.png";
import instagram_logo from "../../assets/image/CompanyDetails/instagram_logo.png";
import { useEffect } from "react";
import { FaFacebookF, FaInstagram, FaPinterest, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiCalendar, FiGlobe } from "react-icons/fi";
import { BiStopwatch } from "react-icons/bi";
import { PiBriefcase, PiWallet } from "react-icons/pi";
import { LuPhoneCall } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";

const CompanyDetails = () => {
  const [company, setCompany] = useState([]);

  useEffect(() => {
    fetch("companies.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData) => {
        setCompany(jsonData);
        console.log(company);
      })
      .catch((error) => {
        console.error("Error fetching the JSON data:", error);
      });
  }, []);

  return (
    <div className="">
      <div className="relative">
        {/* Banner Image */}
        <div>
          <img className="w-full" src={bannerBg} alt="Banner" />
        </div>

        {/* Company Details Section (half over the banner) */}
        <div className="container absolute left-1/2 transform -translate-x-1/2 md:-bottom-16 bg-white rounded-lg shadow-lg p-6 w-3/4">
          <div className="flex md:p-4 items-center">
            {/* Company Logo */}
            <img
              src={instagram_logo}
              className="w-16 h-16 object-cover rounded-full"
              alt="Company Logo"
            />

            {/* Company Information */}
            <div className="pl-4">
              <h3 className="font-bold text-xl md:pb-2">Twitter</h3>

              <p className="text-gray-500">Information Technology (IT)</p>
            </div>

            {/* CTA Button */}
            <div className="ml-auto">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                View Open Position →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex md:mt-36 container mx-auto ">
        <div className="md:w-1/2">
          <h2 className="font-bold my-5 ">Description</h2>
          <p className="text-gray-500">
            Fusce et erat at nibh maximus fermentum. Mauris ac justo nibh.
            Praesent nec lorem lorem. Donec ullamcorper lacus mollis tortor
            pretium malesuada. In quis porta nisi, quis fringilla orci. Donec
            porttitor, odio a efficitur blandit, orci nisl porta elit, eget
            vulputate quam nibh ut tellus. Sed ut posuere risus, vitae commodo
            velit.
          </p>

          <h2 className="font-bold my-5 ">Company Benefits</h2>
          <p className="text-gray-500 mb-4">
            Donec dignissim nunc eu tellus malesuada fermentum. Sed blandit in
            magna at accumsan. Etiam imperdiet massa aliquam, consectetur leo
            in, auctor neque.
          </p>
          <ul className=" list-disc text-gray-500 ml-5">
            <li>In hac habitasse platea dictumst.</li>
            <li>
              Sed aliquet, arcu eget pretium bibendum, odio enim rutrum arcu.
            </li>
            <li>Vestibulum id vestibulum odio. </li>
          </ul>

          <div className="flex items-center gap-5 my-5">
            <p>Share profile:</p>
            <div className="flex items-center border-2 rounded p-3">
              <FaFacebookF className="text-blue-600 mr-3" />
              <p>Facebook</p>
            </div>
            <div className="flex items-center border-2 rounded p-3">
              <FaTwitter className="text-sky-500 mr-3" />
              <p>Facebook</p>
            </div>
            <div className="flex items-center border-2 rounded p-3">
              <FaPinterest className="text-red-600 mr-3" />
              <p>Facebook</p>
            </div>
          </div>
        </div>
        <div className=" md:ml-10  w-1/2">
          <div className="md:p-8 border-2 rounded-lg grid grid-cols-2 gap-10 ">
            <div>
              <FiCalendar className="text-2xl text-blue-500 " />
              <p className="text-gray-500 mt-4">Founded in:</p>
              <p className="font-bold text-sm">14 June, 2021</p>
            </div>
            <div>
              <BiStopwatch className="text-3xl text-blue-500 " />
              <p className="text-gray-500 mt-4">Organization type</p>
              <p className="font-bold text-sm">Private Company</p>
            </div>
            <div>
              <PiWallet className="text-3xl text-blue-500 " />
              <p className="text-gray-500 mt-4">Team size</p>
              <p className="font-bold text-sm">120-300 Candidates</p>
            </div>
            <div>
              <PiBriefcase className="text-3xl text-blue-500 " />
              <p className="text-gray-500 mt-4">Industry types</p>
              <p className="font-bold text-sm">Technology</p>
            </div>
          </div>
          <div className="md:p-8 border-2 rounded-lg md:my-6 ">
            <h2 className="font-bold text-xl ">Contact Information</h2>
            <div className="flex my-5">
              <FiGlobe className="text-3xl text-blue-500 " />
              <div className="ml-4">
                <p className="text-gray-500 ">Website</p>
                <p className="text-black font-bold">www.estherhoward.com</p>
              </div>
            </div>
            <hr />
            <div className="flex my-5">
              <LuPhoneCall className="text-3xl text-blue-500 " />
              <div className="ml-4">
                <p className="text-gray-500 ">Phone</p>
                <p className="text-black font-bold">+1-202-555-0141</p>
              </div>
            </div>
            <hr />
            <div className="flex my-5">
              <TfiEmail className="text-3xl text-blue-500 " />
              <div className="ml-4">
                <p className="text-gray-500 ">Email address</p>
                <p className="text-black font-bold">esther.howard@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="md:p-8 border-2 rounded-lg md:my-6 ">
            <h2 className="font-bold text-xl ">Follow us on:</h2>
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
    </div>
  );
};

export default CompanyDetails;
