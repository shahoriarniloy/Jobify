import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosSecure from "../../Hooks/UseAxiosSecure";

const FavoriteCompany = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const userEmail = currentUser?.email;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchJobs = async () => {
      if (!userEmail) {
        setLoading(false); // Stop loading if email is undefined
        return;
      }

      console.log('Fetching jobs for userEmail:', userEmail);

      try {
        const response = await axiosSecure.get(`/users/${userEmail}/latest-jobs`);
        setJobs(response.data.jobs);
      } catch (error) {
        console.error('Error fetching jobs', error);
        setError(error.message); // Set error message if fetch fails
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchJobs();
  }, [userEmail]);

  if (loading) return <p>Loading...</p>; // Show loading message
  if (error) return <p>Error: {error}</p>; // Show error message if any
  

  return (
    <div>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            <h3>{job.title}</h3>
            <p>Posted by: {job.hrEmail}</p>
            <p>Posted on: {new Date(job.posted).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteCompany;
