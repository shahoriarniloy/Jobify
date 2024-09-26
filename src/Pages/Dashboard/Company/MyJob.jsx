import { useEffect, useState } from 'react';
import useUserRole from '../../../Hooks/useUserRole'; // Adjust this import based on your folder structure

const JobTable = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const { id, loading, error: roleError } = useUserRole(); // Access the user ID from your hook

  useEffect(() => {
    if (!loading && id) { // Ensure we have the id before making the request
      fetch(`http://localhost:5000/company-jobs/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) { // Check if the data is an array
            setJobs(data);
          } else {
            setError('Unexpected response format'); // Handle unexpected response
          }
        })
        .catch((error) => setError('Error fetching jobs: ' + error.message));
    }
  }, [id, loading]); // Re-run effect if id or loading status changes

  if (loading) {
    return <div>Loading jobs...</div>; // Display loading state while fetching data
  }

  if (roleError || error) {
    return <div>Error: {roleError || error}</div>; // Display any errors
  }

  if (jobs.length === 0) {
    return <div>No jobs available for this company.</div>; // Handle case when no jobs are found
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
              {/* <td className="px-4 py-2">
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
