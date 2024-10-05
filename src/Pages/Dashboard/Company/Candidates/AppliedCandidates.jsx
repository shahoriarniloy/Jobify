import  { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosSecure from '../../../../Hooks/UseAxiosSecure';

const AppliedCandidates = () => {
  const location = useLocation();
  const { jobId } = location.state; 
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const response = await axiosSecure.get(`/appliedCandidates?job_id=${jobId}`);
        setCandidates(response.data);
        console.log("Candidates fetched:", response.data);
      } catch (err) {
        console.error(err);
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [jobId]);

  if (loading) {
    return <div>Loading candidates...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {candidates.map((candidate) => (
        <div key={candidate.user.email} className="card lg:card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src={candidate.user.photoURL || 'https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp'} 
              alt={candidate.user.name}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{candidate.user.name}</h2>
            <p>Email: {candidate.user.email}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={() => viewCV(candidate.user.email)}>View CV</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  
  function viewCV(email) {
    console.log(`View CV for ${email}`); 
  }
};

export default AppliedCandidates;
