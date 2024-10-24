import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaSnapchatGhost,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import {
  MdBookmark,
  MdBookmarkBorder,
  MdFavorite,
  MdFavoriteBorder,
} from "react-icons/md";
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
import ButtonLoader from "../../../Shared/ButtonLoader.jsx";
import { toast } from "react-toastify";
import useCurrentUser from "../../../Hooks/useCurrentUser.jsx";

const CompanyDetails = () => {
  const { currentUser } = useCurrentUser();
  const [company, setCompany] = useState({});
  const { companyId } = useParams();
  const { t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false);

  const companyEmail = company?.email;
  const userEmail = currentUser?.email;

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axiosSecure.get(`/companies/${companyId}`);
        setCompany(response.data);

        // After fetching company data, check if it is a favorite
        if (userEmail && companyEmail) {
          const favoriteResponse = await axiosSecure.get(
            `/users/${userEmail}/favorite-company/${companyEmail}`
          );
          setIsFavorite(favoriteResponse.data.isFavorite);
        }
      } catch (error) {
        console.error(
          "Error fetching company data or checking favorite status:",
          error
        );
      }
    };

    fetchCompanyData();
  }, [companyId, userEmail, companyEmail]);

  useEffect(() => {
    if (userEmail && companyEmail) {
      const checkFavoriteStatus = async () => {
        try {
          const response = await axiosSecure.get(
            `/users/${userEmail}/favorite-company`
          );
          const data = response.data;

          setIsFavorite(data.favoriteCompany.includes(companyEmail));
        } catch (error) {
          console.error("Error fetching favorite status:", error);
        }
      };

      checkFavoriteStatus();
    }
  }, [companyEmail, userEmail]);

  const toggleFavorite = async () => {
    try {
      const method = isFavorite ? "DELETE" : "POST";
      const url = isFavorite
        ? `/users/${userEmail}/favorite-company/${company.email}`
        : `/users/${userEmail}/favorite-company`;

      await axiosSecure({
        method,
        url,
        data: isFavorite ? null : { companyEmail: company.email },
      });
      setIsFavorite(!isFavorite);

      toast.success(
        isFavorite
          ? t("company_removed_from_favorites")
          : t("company_added_to_favorites")
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Something went wrong while updating favorites.");
    }
  };

  return (
    <div className="bg-secondary">
      <div className="relative container mx-auto">
        <div className="relative">
          <div>
            <img
              className="w-full h-56 object-cover md:h-72 lg:h-96"
              src={company?.company_banner}
              alt={t("company_banner_alt")}
            />
          </div>
          <div className="container absolute left-1/2 transform -translate-x-1/2 md:-bottom-16 bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 w-11/12 md:w-3/4 lg:w-1/2">
            <div className="flex flex-col md:flex-row items-center">
              {company?.company_logo ? (
                <img
                  src={company?.company_logo}
                  className="w-16 h-16 object-cover rounded-full"
                  alt={t("company_logo_alt")}
                />
              ) : (
                <ButtonLoader />
              )}
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

        <div className="lg:hidden flex justify-end mt-48 md:mb-2 mb-2">
          <div className="flex space-x-4">
            <button
              className={`flex items-center justify-center 
                ${isFavorite ? "bg-red-500" : "bg-green-500"} 
                text-white hover:bg-blue-400 
                rounded-lg p-2 mt-8 
                transition duration-300 ease-in-out 
                shadow-md hover:shadow-lg`}
              type="button"
              onClick={toggleFavorite}
            >
              {isFavorite ? (
                <MdBookmark className="text-white md:text-2xl text-xl" />
              ) : (
                <MdBookmarkBorder className="text-white md:text-2xl text-xl" />
              )}
              <span className="ml-2">
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </span>
            </button>
            <Link to={`/messages/${company.email}`}>
              <button className="bg-green-500 text-white hover:bg-blue-600 rounded-lg px-12 py-2 mt-8">
                {t("message")}
              </button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:mb-48 gap-6 justify-between">
          <div className="md:w-1/2 mt-28">
            <h2 className="font-bold lg:mt-2 text-xl md:text-2xl lg:text-3xl">
              {t("description")}
            </h2>
            <p className="text-gray-500 mb-4">{company?.company_description}</p>

            <h2 className="font-bold my-5 text-xl md:text-2xl lg:text-3xl">
              {t("company_vision")}
            </h2>
            <p className="text-gray-500 mb-4">{t("benefits_intro")}</p>
            <ul className="list-disc text-gray-500 ml-5">
              <li>{t("benefit_1")}</li>
              <li>{t("benefit_2")}</li>
              <li>{t("benefit_3")}</li>
              <li>{t("benefit_4")}</li>
              <li>{t("benefit_5")}</li>
              <li>{t("benefit_6")}</li>
            </ul>
          </div>

          <div className="md:ml-10 md:w-1/2">
            <div className="lg:flex lg:justify-end hidden">
              <div className="flex space-x-4 mt-20 mb-5">
                <button
                  className={`flex items-center justify-center 
                ${isFavorite ? "bg-red-500" : "bg-green-500"} 
                text-white hover:bg-blue-400 
                rounded-lg p-2 mt-3 
                transition duration-300 ease-in-out 
                shadow-md hover:shadow-lg`}
                  type="button"
                  onClick={toggleFavorite}
                >
                  {isFavorite ? (
                    <MdBookmark className="text-white md:text-2xl text-xl" />
                  ) : (
                    <MdBookmarkBorder className="text-white md:text-2xl text-xl" />
                  )}
                  <span className="ml-2">
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </span>
                </button>
                <Link to={`/messages/${company.email}`}>
                  <button className="bg-green-500 text-white hover:bg-blue-600 rounded-lg px-12 py-2 mt-3">
                    {t("message")}
                  </button>
                </Link>
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

            {/* <div className="grid grid-cols-1 p-4 md:p-8 border-2 mt-5 rounded-lg">
              <h2 className="text-xl font-bold">{t("company_social_links")}</h2>
              <div className="flex space-x-6">
                <a href={company?.facebook} target="_blank" rel="noreferrer">
                  <FaFacebookF className="text-gray-500 hover:text-primary mt-4 text-xl" />
                </a>
                <a href={company?.linkedin} target="_blank" rel="noreferrer">
                  <FaLinkedin className="text-gray-500 hover:text-primary mt-4 text-xl" />
                </a>
                <a href={company?.twitter} target="_blank" rel="noreferrer">
                  <FaTwitter className="text-gray-500 hover:text-primary mt-4 text-xl" />
                </a>
                <a href={company?.instagram} target="_blank" rel="noreferrer">
                  <FaInstagram className="text-gray-500 hover:text-primary mt-4 text-xl" />
                </a>
                <a href={company?.youtube} target="_blank" rel="noreferrer">
                  <FaYoutube className="text-gray-500 hover:text-primary mt-4 text-xl" />
                </a>
                <a href={company?.tiktok} target="_blank" rel="noreferrer">
                  <FaTiktok className="text-gray-500 hover:text-primary mt-4 text-xl" />
                </a>
                <a href={company?.snapchat} target="_blank" rel="noreferrer">
                  <FaSnapchatGhost className="text-gray-500 hover:text-primary mt-4 text-xl" />
                </a>
                <a href={company?.pinterest} target="_blank" rel="noreferrer">
                  <FaPinterest className="text-gray-500 hover:text-primary mt-4 text-xl" />
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <OpenPosition />
    </div>
  );
};

export default CompanyDetails;
