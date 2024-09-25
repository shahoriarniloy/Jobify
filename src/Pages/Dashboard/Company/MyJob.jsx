import { useEffect, useState } from 'react';

const JobTable = () => {
  const [jobs, setJobs] = useState([]);

  // Fetch jobs from the server
  useEffect(() => {
    fetch('http://localhost:5000/jobs')  // Make sure this is your API endpoint
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2">Jobs</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Applications</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id} className="border-b">
              <td className="px-4 py-2">{job.title}</td>
              <td className="px-4 py-2">
                <span
                  className={`${
                    job.status === "Open" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {job.status}
                </span>
              </td>
              <td className="px-4 py-2">{job.applications || 0}</td>
              <td className="px-4 py-2">
                <div className="">
                  <button className="btn bg-blue-100 px-3 py-1 text-blue-700 rounded">
                    View Applications
                  </button>
        
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
