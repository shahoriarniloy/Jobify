import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import { FiCalendar, FiGlobe } from "react-icons/fi";
import { BiStopwatch } from "react-icons/bi";
import { PiBriefcase, PiWallet } from "react-icons/pi";
import { LuPhoneCall } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import OpenPosition from "../../../components/OpenPositions/OpenPositions";
import { useTranslation } from "react-i18next";
import axiosSecure from "../../../Hooks/useAxiosSecure";
import ButtonLoader from "../../../Shared/ButtonLoader.jsx";

const CompanyDetails = () => {
  const [company, setCompany] = useState([]);
  const { companyId } = useParams();
  const { t } = useTranslation(); // Initialize the translation function

  const { _id, email } = company;

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axiosSecure.get(`/companies/${companyId}`);
        setCompany(response.data);
      } catch (error) {
        // console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, [companyId]);

  return (
    <div className="bg-secondary">
      <div className="relative container mx-auto">
        <div className="relative">
          {/* Banner */}
          <div>
            <img
              className="w-full h-56 object-cover md:h-72 lg:h-96"
              src={company?.company_logo}
              alt={t("CompanyDetails.company_banner_alt")}
            />
          </div>
          <div className="container absolute left-1/2 transform -translate-x-1/2 md:-bottom-16 bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 w-11/12 md:w-3/4 lg:w-1/2">
            <div className="flex flex-col md:flex-row items-center">
              {/* Logo */}
              {company?.company_logo ? (
                <img
                  src={company?.company_logo}
                  className="w-16 h-16 object-cover rounded-full"
                  alt={t("CompanyDetails.company_logo_alt")}
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
                    {t("CompanyDetails.view_open_position")}
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden flex justify-end mt-48 md:mb-2 mb-2">
          <Link to={`/messages/${company.email}`}>
            <button className="bg-green-500 text-white hover:bg-blue-600 rounded-lg px-12 py-2 mt-12 ">
              {t("CompanyDetails.message")}
            </button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:mb-48 gap-6 justify-between">
          <div className="md:w-1/2 mt-12">
            <h2 className="font-bold lg:mt-2 text-xl md:text-2xl lg:text-3xl">
              {t("CompanyDetails.description")}
            </h2>
            <p className="text-gray-500 mb-4">{company?.company_description}</p>

            <h2 className="font-bold my-5 text-xl md:text-2xl lg:text-3xl">
              {t("CompanyDetails.company_benefits")}
            </h2>
            <p className="text-gray-500 mb-4">
              {t("CompanyDetails.benefits_intro")}
            </p>
            <ul className="list-disc text-gray-500 ml-5">
              <li>{t("CompanyDetails.benefit_1")}</li>
              <li>{t("CompanyDetails.benefit_2")}</li>
              <li>{t("CompanyDetails.benefit_3")}</li>
              <li>{t("CompanyDetails.benefit_4")}</li>
              <li>{t("CompanyDetails.benefit_5")}</li>
              <li>{t("CompanyDetails.benefit_6")}</li>
            </ul>

            <div className="flex flex-wrap items-center gap-5 my-5">
              <p>{t("CompanyDetails.share_profile")}</p>
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
            <div className="lg:flex lg:justify-end hidden">
              <Link to={`/messages/${company.email}`}>
                <button className="bg-green-500 text-white hover:bg-blue-600 rounded-lg px-12 py-2 mt-12 mb-2 ">
                  {t("CompanyDetails.message")}
                </button>
              </Link>
            </div>
            <div className="p-4 md:p-8 border-2 rounded-lg grid grid-cols-2 gap-5 md:gap-10">
              <div>
                <FiCalendar className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">
                  {t("CompanyDetails.founded_in")}
                </p>
                <p className="font-bold text-sm">{company?.founded_date}</p>
              </div>
              <div>
                <BiStopwatch className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">
                  {t("CompanyDetails.organization_type")}
                </p>
                <p className="font-bold text-sm">
                  {company?.company_type} {t("CompanyDetails.company")}
                </p>
              </div>
              <div>
                <PiWallet className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">
                  {t("CompanyDetails.team_size")}
                </p>
                <p className="font-bold text-sm">
                  {company?.company_size} {t("CompanyDetails.candidates")}
                </p>
              </div>
              <div>
                <PiBriefcase className="text-2xl text-blue-500" />
                <p className="text-gray-500 mt-2">
                  {t("CompanyDetails.industry_types")}
                </p>
                <p className="font-bold text-sm">{company?.industry}</p>
              </div>
            </div>
            <div className="p-4 md:p-8 border-2 rounded-lg md:my-6">
              <h2 className="font-bold text-xl md:text-2xl">
                {t("CompanyDetails.contact_information")}
              </h2>
              <div className="flex items-center my-5">
                <FiGlobe className="text-3xl text-blue-500" />
                <div className="ml-4">
                  <p className="text-gray-500">{t("CompanyDetails.website")}</p>
                  <p className="text-black font-bold">
                    {company?.company_website}
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex items-center my-5">
                <LuPhoneCall className="text-3xl text-blue-500" />
                <div className="ml-4">
                  <p className="text-gray-500">{t("CompanyDetails.phone")}</p>
                  <p className="text-black font-bold">
                    {company?.phone_number}
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex items-center mt-5">
                <TfiEmail className="text-3xl text-blue-500" />
                <div className="ml-4">
                  <p className="text-gray-500">{t("CompanyDetails.email")}</p>
                  <p className="text-black font-bold">{company?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <OpenPosition
          title={t("CompanyDetails.open_position")}
          email={company?.email}
        />
      </div>
    </div>
  );
};

export default CompanyDetails;
