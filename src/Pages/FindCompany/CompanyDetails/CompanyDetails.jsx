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
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
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
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CompanyDetails = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [company, setCompany] = useState([]);
  const { companyId } = useParams();
  const { t } = useTranslation(); // Initialize the translation function
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
        console.error("Error fetching company data or checking favorite status:", error);
      }
    };
  
    fetchCompanyData();
  }, [companyId, userEmail, companyEmail]);

  // Function to fetch favorite status when the component mounts
  // useEffect(() => {
  //   if (userEmail && companyEmail) {
  //     const checkFavoriteStatus = async () => {
  //       try {
  //         const response = await axiosSecure.get(
  //           `/users/${userEmail}/favorite-company`
  //         );
  //         const data = response.data;

  //         // Check if the company is in the user's favorites
  //         setIsFavorite(data.favoriteCompany.includes(companyEmail));
  //       } catch (error) {
  //         console.error("Error fetching favorite status:", error);
  //       }
  //     };

  //     checkFavoriteStatus();
  //   }
  // }, [companyEmail, userEmail]);

  const toggleFavorite = async () => {
    try {
      // Determine the HTTP method and URL based on the current favorite status
      const method = isFavorite ? "DELETE" : "POST";
      const url = isFavorite
        ? `/users/${userEmail}/favorite-company/${company.email}`
        : `/users/${userEmail}/favorite-company`;

      // Make the API call
      await axiosSecure({
        method,
        url,
        data: isFavorite ? null : { companyEmail: company.email }, // Only send data when adding
      });
      // Toggle the state after the API call succeeds
      setIsFavorite(!isFavorite);

      // Show Toast for success
      toast.success(
        isFavorite
          ? "Company removed from favorites"
          : "Company added to favorites"
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
      // Show Toast for error
      toast.error("Something went wrong while updating favorites.");
    }
  };

  return (
    <div className="bg-secondary">
      <div className="relative container mx-auto">
        <div className="relative">
          {/* Banner */}
          <div>
            <img
              className="w-full h-56 object-cover md:h-72 lg:h-96"
              src={company?.company_logo}
              alt={t("company_banner_alt")}
            />

            {/* Favorite btn */}
            <div className="absolute top-4 right-4">
              <button type="button" onClick={toggleFavorite}>
                {isFavorite ? (
                  <MdFavorite className="text-red-500 md:text-6xl text-4xl" />
                ) : (
                  <MdFavoriteBorder className="md:text-6xl text-4xl text-red-500" />
                )}
              </button>
            </div>
          </div>
          <div className="container absolute left-1/2 transform -translate-x-1/2 md:-bottom-16 bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 w-11/12 md:w-3/4 lg:w-1/2">
            <div className="flex flex-col md:flex-row items-center">
              {/* Logo */}
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
          <Link to={`/messages/${company.email}`}>
            <button className="bg-green-500 text-white hover:bg-blue-600 rounded-lg px-12 py-2 mt-12 ">
              {t("message")}
            </button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:mb-48 gap-6 justify-between">
          <div className="md:w-1/2 mt-12">
            <h2 className="font-bold lg:mt-2 text-xl md:text-2xl lg:text-3xl">
              {t("description")}
            </h2>
            <p className="text-gray-500 mb-4">{company?.company_description}</p>

            <h2 className="font-bold my-5 text-xl md:text-2xl lg:text-3xl">
              {t("company_benefits")}
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

            <div className="flex flex-wrap items-center gap-5 my-5">
              <p>{t("share_profile")}</p>

              {company?.social_media_links?.facebook && (
                <a
                  href={company?.social_media_links?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center border-2 rounded p-3"
                >
                  <FaFacebookF className="text-blue-600 mr-3" />
                  <p>{t("facebook")}</p>
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
                  <p>{t("twitter")}</p>
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
                  <p>{t("linkedin")}</p>
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
                  <p>{t("pinterest")}</p>
                </a>
              )}

              {company?.social_media_links?.instagram && (
                <a
                  href={company?.social_media_links?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center border-2 rounded p-3"
                >
                  <FaInstagram className="text-pink-500 mr-3" />
                  <p>{t("instagram")}</p>
                </a>
              )}

              {company?.social_media_links?.youtube && (
                <a
                  href={company?.social_media_links?.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center border-2 rounded p-3"
                >
                  <FaYoutube className="text-red-600 mr-3" />
                  <p>{t("youtube")}</p>
                </a>
              )}

              {company?.social_media_links?.snapchat && (
                <a
                  href={company?.social_media_links?.snapchat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center border-2 rounded p-3"
                >
                  <FaSnapchatGhost className="text-yellow-500 mr-3" />
                  <p>{t("snapchat")}</p>
                </a>
              )}

              {company?.social_media_links?.tiktok && (
                <a
                  href={company?.social_media_links?.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center border-2 rounded p-3"
                >
                  <FaTiktok className="text-black mr-3" />
                  <p>{t("tiktok")}</p>
                </a>
              )}
            </div>
          </div>

          <div className="md:ml-10 md:w-1/2">
            <div className="lg:flex lg:justify-end hidden">
              <Link to={`/messages/${company.email}`}>
                <button className="bg-green-500 text-white hover:bg-blue-600 rounded-lg px-12 py-2 mt-12 mb-2 ">
                  {t("message")}
                </button>
              </Link>
            </div>
            <div className="p-4 md:p-8 border-2 rounded-lg grid grid-cols-2 gap-5 md:gap-10">
              <div>
                <FiCalendar className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">{t("founded_in")}</p>
                <p className="font-bold text-sm">{company?.founded_date}</p>
              </div>
              <div>
                <BiStopwatch className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">{t("organization_type")}</p>
                <p className="font-bold text-sm">
                  {company?.company_type} {t("company")}
                </p>
              </div>
              <div>
                <PiWallet className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">{t("team_size")}</p>
                <p className="font-bold text-sm">
                  {company?.company_size} {t("candidates")}
                </p>
              </div>
              <div>
                <PiBriefcase className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">{t("industry_types")}</p>
                <p className="font-bold text-sm">{company?.industry}</p>
              </div>
            </div>
            <div className="p-4 md:p-8 border-2 rounded-lg md:my-6">
              <h2 className="font-bold text-xl md:text-2xl">
                {t("contact_information")}
              </h2>
              <div className="flex items-center my-5">
                <FiGlobe className="text-3xl text-blue-500" />
                <div className="ml-4">
                  <p className="text-gray-500">{t("website")}</p>
                  <p className="text-black font-bold">
                    {company?.company_website}
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex items-center my-5">
                <LuPhoneCall className="text-3xl text-blue-500" />
                <div className="ml-4">
                  <p className="text-gray-500">{t("phone")}</p>
                  <p className="text-black font-bold">
                    {company?.phone_number}
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex items-center mt-5">
                <TfiEmail className="text-3xl text-blue-500" />
                <div className="ml-4">
                  <p className="text-gray-500">{t("email")}</p>
                  <p className="text-black font-bold">{company?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <OpenPosition title={t("open_position")} email={company?.email} />
      </div>
    </div>
  );
};

export default CompanyDetails;
