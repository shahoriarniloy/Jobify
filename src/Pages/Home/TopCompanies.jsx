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
    <div className="p-8 mt-16 ">
      <h1 className='text-brownText noto text-3xl text-center mb-12'>Top Companies</h1>
      {error ? (
        <p className="text-redCastomize">Error: {error}</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {companies.map((company) => (
            <div
              key={company.company_name}
              className="border border-gray-200 rounded-lg text-center bg-[#F2E3D1] hover:shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out"
            >
              <div className="w-full h-48 overflow-hidden rounded-t-lg">
                <img
                  src={company.company_logo}
                  alt={`${company.company_name} Logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-brownText">{company.company_name}</h3>
                <p className="text-gray-700 mb-4">{company.company_description}</p>
                <a
                  href={company.company_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blueCastomize hover:underline"
                >
                  Visit Website
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopCompanies;
