import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { LuDot } from "react-icons/lu";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { Link } from "react-router-dom";

const JobCardGrid = ({ job }) => {
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

  console.log("Job Data:", job); // Check job data

  // Only fetch company data if it's missing from the job object
  useEffect(() => {
    if (!company_id || company) return; // No need to fetch if company info is already present

    const fetchCompanyData = async () => {
      try {
        console.log('Fetching company info for:', company_id);
        const response = await axiosSecure.get(`/companies/${company_id}`);
        setCompanyData(response.data);
        console.log("Fetched company data:", response.data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, [company_id, company]);

  const companyName = companyData?.company_name || company;
  const companyLogo = companyData?.company_logo || company_logo;

  console.log("Company Name:", companyName); 
  console.log("Company Logo:", companyLogo); 

  return (
    <div>
      <Link>
        <div className="md:p-8 p-4 border-2 rounded-lg">
          {/* Image section */}
          <div className="flex mb-6">
            {/* <div>
              <img
                className="w-14 h-14 rounded-md"
                src={companyLogo } 
                alt={companyName }
              />
            </div> */}
            <div className="ml-4 items-center gap-2">
              <div className="flex items-center">
                <p className="font-semibold">
                  {companyName || "Unknown Company"}
                </p>
                {featured && (
                  <p className="text-xs text-red-400 bg-red-100 font-semibold my-auto py-1 px-3 rounded-full ml-2">
                    Featured
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 mt-2">
                <CiLocationOn className="text-gray-500 text-xl font-bold" />
                <p className="text-gray-400">{location}</p>
              </div>
            </div>
          </div>
          {/* Position section */}
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
