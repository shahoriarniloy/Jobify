import React from "react";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DashboardLoader from "./../../Shared/DashboardLoader";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TopCompanies = () => {
  const theme = useSelector((state) => state.theme.theme);

  const { data, isLoading } = useQuery({
    queryKey: ["top-companies"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/companies")
      return data?.Companies;
    }
  })
  if (isLoading) return <DashboardLoader />
  return (
    <div>
      <div className='container mx-auto py-24'>
        <h1 className='text-3xl font-semibold mb-2 tracking-wider text-black text-center '>Top Companies</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {data
            ?.slice(0, 8)
            .map(({ _id, company_logo, company_name, location, email }) => (
              <div key={_id} className="border p-8 rounded-md">
                <div className="flex items-center gap-4 mb-8">
                  <div className="size-[50px]">
                    <img
                      className="w-full h-full rounded-md"
                      src={company_logo}
                      alt=""
                    />
                  </div>
                  <div>
                    <h2>{company_name}</h2>
                    <p className="flex items-center gap-1 text-[#939AAD]">
                      <CiLocationOn className="text-xl" />
                      <span className="text-sm">{location}</span>
                    </p>
                  </div>
                </div>
                <Link to={`/company-details/${email}`}>
                  <button className="btn bg-[#E7F0FA] rounded-sm link-color hover:bg-[#0a65cc] hover:text-white w-full">
                    Open Positions
                  </button>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TopCompanies;
