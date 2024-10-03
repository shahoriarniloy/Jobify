import { useEffect, useState } from 'react';
import useUserRole from '../../../Hooks/useUserRole';
import axiosSecure from '../../../Hooks/UseAxiosSecure'; 

const JobTable = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const { id, loading, error: roleError } = useUserRole(); 

  useEffect(() => {
    if (!loading && id) { 
      const fetchJobs = async () => {
        
          const response = await axiosSecure.get(`/company-jobs/${id}`);
          setJobs(response?.data);
        
      };

      fetchJobs(); 
    }
  }, [id, loading]); 

  console.log(jobs)

  if (loading) {
    return <div>Loading jobs...</div>; 
  }

  if (roleError || error) {
    return <div>Error: {roleError || error}</div>; 
  }

  if (jobs.length === 0) {
    return <div>No jobs available for this company.</div>; 
  }

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
              {/* Uncomment if you want to display job status
              <td className="px-4 py-2">
                <span
                  className={`${
                    job.status === "Open" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {job.status}
                </span>
              </td> */}
              <td className="px-4 py-2 text-green-500"><button>Open</button></td>
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
