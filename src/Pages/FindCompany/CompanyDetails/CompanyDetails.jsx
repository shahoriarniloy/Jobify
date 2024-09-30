import { useState, useEffect } from "react";
import instagram_logo from "../../../assets/image/CompanyDetails/instagram_logo.png";
import {
  FaFacebookF,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import { FiCalendar, FiGlobe } from "react-icons/fi";
import { PiBriefcase, PiWallet } from "react-icons/pi";
import { LuPhoneCall } from "react-icons/lu";
import { FaComment } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import { useParams, Link } from "react-router-dom";
import OpenPosition from "../../../components/OpenPositions/OpenPositions";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import MessageModal from "../../Message/MessageModal";

const CompanyDetails = () => {
  const [company, setCompany] = useState({});
  const { companyId } = useParams();
  const { currentUser, loading: userLoading } = useCurrentUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  console.log(companyId);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axiosSecure.get(`/companies/${companyId}`);
        setCompany(response.data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, [companyId]);

  // const fetchMessages = async () => {
  //   if (!currentUser) return; 
  //   try {
  //     const response = await axiosSecure.get(`/messages/${company.email}/${currentUser.email}`);
  //     setMessages(response.data);
  //   } catch (error) {
  //     console.error("Error fetching messages:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (company.email && currentUser) {
  //     fetchMessages();
  //   }
  // }, [company.email, currentUser]);

  const sendMessage = async () => {
    if (!newMessage) return; 

    const messageData = {
        senderEmail: currentUser.email,
        receiverEmail: company.email,
        message: newMessage,
        senderName: currentUser.name, 
        senderPhoto: currentUser.photoURL, 
        receiverName: company.company_name, 
        receiverPhoto: company.company_logo, 
    };

    try {
        await axiosSecure.post(`/sendMessage`, messageData);
        console.log("Message sent successfully:", messageData);
        
        setMessages(prevMessages => [
            ...prevMessages,
            {
                senderEmail: currentUser.email,
                message: newMessage,
                createdAt: new Date().toISOString(), 
                senderName: currentUser.name,
                senderPhoto: currentUser.photoURL,
            }
        ]);

        setNewMessage(""); ; 
    } catch (error) {
        console.error("Error sending message:", error);
    }
};


  const handleOpenModal = () => {
    setModalOpen(true);
    setNewMessage(""); 
  };

  if (userLoading) {
    return <div>Loading...</div>; 
  }

  if (!currentUser) {
    return <div>Error: User not found.</div>; 
  }

  return (
    <div className="relative">
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
              <div className="flex justify-start">
              <button
                  onClick={handleOpenModal}
                  className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                  title="Message"
                >
                  <FaComment className="text-xl" />
                </button>
          <MessageModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            messages={messages} 
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
            recipient={{
              receiverName: company.company_name, 
              receiverPhoto: company.company_logo, 
              receiverEmail: company.email, 
              senderEmail: currentUser.email, 
              senderPhoto: currentUser.photoURL,
              senderName: currentUser.name,
            }}
          />
        </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-auto">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                <Link to={`/company/${companyId}/jobs`}>
                  View Open Position →
                </Link>
              </button>

              
            </div>
          </div>
        </div>

        

        

        
      </div>

      

      <div className="flex flex-col md:flex-row md:mt-36 md:mb-48 container mx-auto px-4 gap-6">
        <div className="md:w-1/2">

        
          

          <h2 className="font-bold md:mt-24 mt-64 lg:mt-4 sm:mt-56 text-xl md:text-2xl lg:text-3xl">
            Description
          </h2>
          <p className="text-gray-500 mb-4">{company?.company_description}</p>

          <h2 className="font-bold my-5 text-xl md:text-2xl lg:text-3xl">
            Company Benefits
          </h2>
          <p className="text-gray-500 mb-4">
            {company?.company_benefits}
          </p>

          <div className="flex flex-wrap items-center gap-5 my-5">
            <p>Share profile:</p>
            {company?.social_media_links?.facebook && (
              <a
                href={company.social_media_links.facebook}
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
                href={company.social_media_links.twitter}
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
                href={company.social_media_links.linkedin}
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
                href={company.social_media_links.pinterest}
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
          <div className="p-4 md:p-8 border-2 rounded-lg grid grid-cols-2 gap-5 md:gap-10">
            <div>
              <FiCalendar className="text-2xl text-blue-500" />
              <p className="text-gray-500 mt-2">Founded Year:</p>
              <p className="font-bold text-sm">{company?.founded_date}</p>
            </div>
            <div>
              <PiWallet className="text-2xl text-blue-500" />
              <p className="text-gray-500 mt-2">Company Type:</p>
              <p className="font-bold text-sm">{company?.company_type} Company</p>
            </div>
            <div>
              <PiWallet className="text-2xl text-blue-500" />
              <p className="text-gray-500 mt-2">Team Size:</p>
              <p className="font-bold text-sm">{company?.company_size} Candidates</p>
            </div>
            <div>
              <PiBriefcase className="text-2xl text-blue-500" />
              <p className="text-gray-500 mt-2">Industry Types:</p>
              <p className="font-bold text-sm">{company?.industry}</p>
            </div>
          </div>
          <div className="my-6">
            <h3 className="font-bold text-xl mb-4">Contact Info</h3>
            <p className="flex items-center gap-2 text-gray-500">
              <LuPhoneCall />
              <span>{company?.phone_number}</span>
            </p>
            <p className="flex items-center gap-2 text-gray-500">
              <TfiEmail />
              <span>{company?.email}</span>
            </p>
            <p className="flex items-center gap-2 text-gray-500">
              <FiGlobe />
              <span>{company?.company_website}</span>
            </p>

            
          </div>
        </div>
      </div>


      <OpenPosition companyId={companyId} title="Open Positions" />
    </div>
  );
};

export default CompanyDetails;
