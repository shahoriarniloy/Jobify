import { useEffect, useState } from 'react';
import axiosSecure from '../../Hooks/UseAxiosSecure'; 

const TopCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axiosSecure.get('/companies/top');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
        setError(error.message);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="p-8 mt-16">
      <h1 className='text-[#593B34] noto text-3xl text-center mb-12'>Top Companies</h1>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {companies.map((company) => (
            <div
              key={company.company_name}
              className="border border-gray-200 rounded-lg p-4 text-center"
            >
              <img
                src={company.company_logo}
                alt={`${company.company_name} Logo`}
                className="w-24 h-auto mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{company.company_name}</h3>
              <p className="text-gray-700 mb-4">{company.company_description}</p>
              <a
                href={company.company_website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Visit Website
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopCompanies;
