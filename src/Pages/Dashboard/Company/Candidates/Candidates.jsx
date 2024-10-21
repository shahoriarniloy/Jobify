import React, { useEffect, useState } from "react";
import CandidateCard from "./CandidateCard";
import CandidatesFilter from "./CandidatesFilter";
import axiosSecure from "../../../../Hooks/UseAxiosSecure";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axiosSecure.get(`/job-seekers`);
        setCandidates(response.data);
        console.log(response);
      } catch (err) {
        console.error("Error fetching candidates:", err);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div className="flex lg:flex-row flex-col  gap-2 w-full justify-between">
      <div>
        {candidates.map((candidate) => (
          <CandidateCard key={candidate._id} candidate={candidate} />
        ))}
      </div>
      <CandidatesFilter></CandidatesFilter>
    </div>
  );
};

export default Candidates;
