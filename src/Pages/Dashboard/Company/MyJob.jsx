import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import useUserRole from '../../../Hooks/useUserRole';
import axiosSecure from '../../../Hooks/UseAxiosSecure'; 
import useCurrentUser from '../../../Hooks/useCurrentUser';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

const JobTable = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const { currentUser } = useCurrentUser();
  const { id, loading, error: roleError } = useUserRole(); 

  useEffect(() => {
    if (!loading && id) { 
      const fetchJobs = async () => {
        try {
          const response = await axiosSecure.get(`/company-jobs?email=${currentUser?.email}`);
          setJobs(response?.data);
        } catch (err) {
          setError(err.message || 'Failed to fetch jobs');
        }
      };

      fetchJobs(); 
    }
  }, [id, loading, currentUser?.email]); 

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
              <td className="px-4 py-2 text-green-500">
                <button>Open</button>
              </td>
              <td className="px-4 py-2">{job.applications || 0}</td>
              
              <td className="px-4 py-2">
                <Link
                  to={`/dashboard/job-candidates`} 
                  state={{ jobId: job._id }} 
                  className="btn bg-blue-100 px-3 py-1 text-blue-700 rounded flex items-center"
                >
                  <ClipboardDocumentListIcon className="h-5 w-5 mr-2" /> 
                  View Applications
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
