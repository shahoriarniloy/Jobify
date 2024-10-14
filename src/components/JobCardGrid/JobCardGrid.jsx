import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { LuDot } from "react-icons/lu";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const JobCardGrid = ({ job }) => {
  const { t } = useTranslation();
  const [companyData, setCompanyData] = useState(null);

  const {
    company_id,
    company,
    company_logo,
    featured,
    location,
    title,
    jobType,
    salaryRange,
  } = job;

  // Only fetch company data if it's missing from the job object
  useEffect(() => {
    if (!company_id || company) return; // No need to fetch if company info is already present

    const fetchCompanyData = async () => {
      try {
        const response = await axiosSecure.get(`/companies/${company_id}`);
        setCompanyData(response.data);
      } catch (error) {
        // Error fetching company data
      }
    };

    fetchCompanyData();
  }, [company_id, company]);

  const companyName = companyData?.company_name || company;
  const companyLogo = companyData?.company_logo || company_logo;

  return (
    <div className="flex justify-center">
      <Link to="#" className="">
        <div className="md:p-8 p-4 border-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex mb-6 items-center">
            <div className="ml-4 flex-grow">
              <div className="flex items-center justify-between">
                <p className="font-bold text-lg truncate">{companyName}</p>
                {featured && (
                  <p className="text-xs text-red-400 bg-red-100 font-semibold my-auto py-1 px-3 rounded-full ml-2">
                    {t("Featured")}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 mt-2">
                <CiLocationOn className="text-gray-500 text-xl font-bold" />
                <p className="text-gray-400">{location}</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold">{title}</p>
            <div className="flex items-center gap-1 mt-1">
              <p className="text-gray-400">{jobType}</p>
              <p className="text-gray-400">
                <LuDot />
              </p>
              <p className="text-gray-400">{salaryRange}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default JobCardGrid;
