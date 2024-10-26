import { useState, useEffect } from "react";

import { MdBookmark, MdBookmarkBorder, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FiCalendar, FiGlobe } from "react-icons/fi";
import { BiStopwatch } from "react-icons/bi";
import { PiBriefcase, PiWallet } from "react-icons/pi";
import { LuPhoneCall } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import OpenPosition from "../../../components/OpenPositions/OpenPositions";
import { useTranslation } from "react-i18next";
import axiosSecure from "../../../Hooks/UseAxiosSecure.jsx";
import { toast } from "react-toastify";
import useCurrentUser from "../../../Hooks/useCurrentUser.jsx";
import { useQuery } from "@tanstack/react-query";
import DashboardLoader from "../../../Shared/DashboardLoader.jsx";
import useUserRole from "../../../Hooks/useUserRole.jsx";
import { LuMessageCircle } from "react-icons/lu";
import Modal from "react-responsive-modal";
import { BsFillSendFill } from "react-icons/bs";
const CompanyDetails = () => {
  const role = useUserRole();
  const { currentUser } = useCurrentUser();
  const { companyEmail } = useParams();
  const { t } = useTranslation(); // Initialize the translation function
  const [isFavorite, setIsFavorite] = useState(false);
  const [isMassageModalOpen, setIsMassageModalOpen] = useState(false);
  const [massage, setMassage] = useState("");

  const { data: company, isLoading, refetch } = useQuery({
    queryKey: ["load company details"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/companies/${companyEmail}`);
      return data;
    }

  })
  // load favorite 
  const { data } = useQuery({
    queryKey: ["load favorite"],
    queryFn: async () => {
      const { data: response } = await axiosSecure.get(`/users/${currentUser.email}/favorite-company`);
      setIsFavorite(response?.favoriteCompanies?.includes(companyEmail))

    }
  })

  const addToFavorite = async () => {
    const res = await axiosSecure.post(`/users/${currentUser?.email}/favorite-company`, { companyEmail: company?.email })
    if (res.status == 200) {
      refetch();
      toast.success("Company added to favorites");
    }
    else {

      toast.error("Something went wrong while updating favorites.");
    }

  };
  // send massage
  const handelSendMassage = async () => {
    const { data } = await axiosSecure.post(`/send-massage?senderId=${currentUser?.email}&receiverId=${company?.email}`, { massage });
    if (data?.acknowledged) {
      toast.success("Message send successfully");
      setIsMassageModalOpen(false);
    }

  }



  if (isLoading) return <DashboardLoader />
  return (
    <div className="bg-secondary pb-20">
      <div className="relative container mx-auto">
        <div className="relative">
          <div>
            <img
              className="w-full h-56 object-cover md:h-72 lg:h-96"
              src={company?.company_banner}
              alt={t("company_banner_alt")}
            />         </div>
          <div className="container absolute left-1/2 transform -translate-x-1/2 md:-bottom-16 bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 w-11/12 md:w-3/4 lg:w-1/2">
            <div className="flex flex-col md:flex-row items-center">
              {/* Logo */}
              <img
                src={company?.company_logo}
                className="w-16 h-16 object-cover rounded-full"
                alt={t("company_logo_alt")}
              />
              <div className="md:pl-4">
                <h3 className="font-bold text-xl md:text-2xl lg:text-3xl">
                  {company?.company_name}
                </h3>
                <p className="text-gray-500">{company?.industry}</p>
              </div>
              <div className="mt-4 md:mt-0 md:ml-auto">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  <Link to={`/company/${company?.email}/jobs`}>
                    {t("view_open_position")}
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden flex justify-center mt-56 md:mt-28  mb-2">


          <button
            onClick={() => setIsMassageModalOpen(true)}
            className="bg-blue-500 text-white hover:bg-blue-400 btn">
            <LuMessageCircle />
            {t("message")}
          </button>


          {role?.role == "Job Seeker" && <button
            disabled={isFavorite}
            className={`btn 
                ${isFavorite ? "bg-red-500" : "bg-blue-500"} 
                text-white hover:bg-blue-400 `}
            type="button"
            onClick={addToFavorite}
          >
            {isFavorite ? (
              <MdBookmark className="text-xl" />
            ) : (
              <MdBookmarkBorder className="text-xl" />
            )}
            <span className="">
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </span>
          </button>}
        </div>

        <div className="flex flex-col lg:flex-row  md:mb-16 gap-12 justify-between md:mt-20">
          <div className="lg:w-1/2 mt-12">
            <h2 className="font-bold lg:mt-2 text-xl md:text-2xl lg:text-3xl">
              {t("description")}
            </h2>
            <p className="text-gray-500 my-4 text-justify">{company?.company_description}</p>

            <h2 className="font-bold my-5 text-xl md:text-2xl lg:text-3xl">
              Company Vision
            </h2>
            <div dangerouslySetInnerHTML={{ __html: company?.company_vision }} />
          </div>

          <div className="lg:w-1/2">

            <div className="lg:flex lg:justify-end items-center hidden gap-4 mb-4">

              <button
                onClick={() => setIsMassageModalOpen(true)}
                className="bg-blue-500 text-white hover:bg-blue-400 btn">
                <LuMessageCircle />
                {t("message")}
              </button>


              {role?.role == "Job Seeker" && <button
                disabled={isFavorite}
                className={`btn 
                ${isFavorite ? "bg-red-500" : "bg-blue-500"} 
                text-white hover:bg-blue-400 `}
                type="button"
                onClick={addToFavorite}
              >
                {isFavorite ? (
                  <MdBookmark className="text-xl" />
                ) : (
                  <MdBookmarkBorder className="text-xl" />
                )}
                <span className="">
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </span>
              </button>}
            </div>
            <div className="p-4 md:p-8 border-2 rounded-lg grid grid-cols-2 gap-5 md:gap-10">
              <div>
                <FiCalendar className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">{t("founded_in")}</p>
                <p className="font-bold text-sm">{company?.founded_date}</p>
              </div>
            </div>
            <div className="p-4 md:p-8 border-2 rounded-lg grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 md:gap-10 mt-8">
              <div className="flex items-center gap-2">
                <FiCalendar className="text-2xl text-blue-500" />
                <div>
                  <p className="text-gray-500 ">
                    {t("founded_in")} {company?.founded_date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BiStopwatch className="text-2xl text-blue-500" />

                <p className="font-bold text-sm text-gray-500">
                  {company?.company_type} {t("company")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <PiWallet className="text-2xl text-blue-500" />
                <p className="text-gray-500 ">{t("team_size")}:</p>
                <p className="font-bold text-sm text-gray-500">
                  {company?.company_size} {t("candidates")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <PiBriefcase className="text-2xl text-blue-500" />
                <p className="text-gray-500 ">{t("industry_types")}</p>
                <p className="font-bold text-sm text-gray-500">
                  {company?.industry}
                </p>
              </div>
            </div>

            <div className="p-4 md:p-8 border-2 rounded-lg md:my-6">
              <h2 className="font-bold text-xl md:text-2xl">
                {t("contact_information")}
              </h2>
              <div className="flex items-center my-5">
                <FiGlobe className="text-2xl text-blue-500" />
                <div className="ml-4">
                  <p className="text-gray-500">
                    {t("website")}:{company?.company_website}
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex items-center my-5">
                <LuPhoneCall className="text-2xl text-blue-500" />
                <div className="ml-4">
                  <p className="text-gray-500">{t("phone")}</p>
                  <p className="text-black font-bold">
                    {company?.phone_number}
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex items-center mt-5">
                <TfiEmail className="text-2xl text-blue-500" />
                <div className="ml-4">
                  <p className="text-gray-500">
                    {t("email")}: {company?.email}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <OpenPosition companyEmail={companyEmail} />


      <Modal
        open={isMassageModalOpen}
        onClose={() => setIsMassageModalOpen(false)}
        center
      >
        <div className="p-4">
          <div className="flex items-center gap-4">
            <div>
              <img src={company?.company_logo} className="size-[46px]" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{company?.company_name}</h1>
              <p className="text-gray-800">{company?.industry}</p>
            </div>
          </div>
          <div className='flex items-center gap-4 mt-8'>
            <input
              onChange={(e) => setMassage(e.target.value)}
              type="text"
              placeholder="Type your massage"
              className="input input-bordered input-md w-full max-w-xs" />

            <button
              onClick={handelSendMassage}
              className='btn bg-blue-700 text-white hover:bg-blue-600'>
              send <BsFillSendFill />
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CompanyDetails;
