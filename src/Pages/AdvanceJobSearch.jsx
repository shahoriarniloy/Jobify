import React, { useState, useEffect } from 'react';

const AdvanceJobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    industry: '',
    jobType: '',
    salaryRange: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    setLoading(true);
    fetch('http://localhost:5000/jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    setLoading(true);
    fetch(`http://localhost:5000/jobs?location=${filters.location}&industry=${filters.industry}&jobType=${filters.jobType}&salaryRange=${filters.salaryRange}`)
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      });
  };

  return (
    <div className="p-6 bg-[#F2E3D1] min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#593B34]">Search - Apply - Get Hired</h2>

      {/* Filter Inputs */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <input 
          type="text" 
          name="location" 
          value={filters.country} 
          onChange={handleInputChange} 
          placeholder="Location" 
          className="p-3 w-full max-w-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="text" 
          name="industry" 
          value={filters.industry} 
          onChange={handleInputChange} 
          placeholder="Industry" 
          className="p-3 w-full max-w-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select 
          name="jobType" 
          value={filters.jobType} 
          onChange={handleInputChange} 
          className="p-3 w-full max-w-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Job Type</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="remote">Remote</option>
        </select>
        <input 
          type="text" 
          name="salaryRange" 
          value={filters.salaryRange} 
          onChange={handleInputChange} 
          placeholder="Salary Range (e.g., 40000-80000)" 
          className="p-3 w-full max-w-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="text-center">
        <button onClick={handleSearch} className="bg-green-900 text-white px-6 py-2 rounded-lg hover:bg-[#C67265] transition">
          Search Jobs
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && <div className="text-center mt-6">Loading jobs...</div>}

      {/* Job Listings */}
      <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {!loading && jobs.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No jobs found matching your criteria.</div>
        )}
        {jobs.map(job => (
          <div key={job._id} className="p-6 bg-white shadow-md rounded-lg transform hover:scale-105 transition">
            <img src={job.company_logo} alt={job.company_name} className="w-16 h-16 mb-3 mx-auto"/>
            <h3 className="text-lg font-semibold text-center">{job.company_name}</h3>
            <p className="text-center text-gray-600">{job.industry}</p>
            <p className="text-center text-gray-500">{job.city}, {job.state}, {job.country}</p>
            <div className="text-center mt-3">
              <a href={job.company_website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Visit Company
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvanceJobSearch;
