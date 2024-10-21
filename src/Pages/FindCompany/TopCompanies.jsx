import React from "react";

import { useEffect, useState } from "react";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { Link } from "react-router-dom";

const TopCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axiosSecure.get("/companies/top");
        setCompanies(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="mt-6">
      <h1 className="text-3xl text-center mb-12">Top Companies</h1>
      {error ? (
        <p className="text-redCastomize">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-4">
          {companies.length > 0 ? (
            companies.map((company) => (
              <div
                key={company.company_name}
                className="border border-gray-200 rounded-lg text-center bg-white hover:shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out"
              >
                <div className="w-full h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={company.company_logo}
                    alt={`${company.company_name} Logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-brownText">
                    {company.company_name}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {company.company_description}
                  </p>
                  <Link
                    to={`/company-details/${company.email}`}
                    className="text-blueCastomize hover:underline"
                  >
                    View Company Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No companies found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TopCompanies;
