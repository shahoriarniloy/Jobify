import React, { useEffect, useState } from 'react';
import CandidateCard from './CandidateCard';
import CandidatesFilter from './CandidatesFilter';

const Candidates = () => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        fetch('/candidates.json')
            .then(res => res.json())
            .then(data => setCandidates(data));
    }, []);

    return (
        <div className="flex lg:flex-row flex-col m-10 gap-5">
      
          <CandidatesFilter></CandidatesFilter>

    
            <div>
                {
                    candidates.map(candidate => (
                        <CandidateCard
                            key={candidate._id}
                            candidate={candidate}
                        />
                    ))
                }

                
            </div>
        </div>
    );
};

export default Candidates;
