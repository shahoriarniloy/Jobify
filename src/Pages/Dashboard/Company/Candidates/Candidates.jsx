import React, { useEffect, useState } from 'react';
import CandidateCard from './CandidateCard';
import CandidatesFilter from './CandidatesFilter';
import { useTranslation } from "react-i18next";

const Candidates = () => {
    const { t } = useTranslation();
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        fetch('/candidates.json')
            .then(res => res.json())
            .then(data => setCandidates(data));
    }, []);

    return (
        <div className="flex lg:flex-row flex-col gap-2 w-full justify-between">
            <h1>{t("title_candidates")}</h1>
            <div>
                {candidates.length === 0 ? (
                    <p>{t("no_candidates")}</p>
                ) : (
                    candidates.map(candidate => (
                        <CandidateCard
                            key={candidate._id}
                            candidate={candidate}
                        />
                    ))
                )}
            </div>
            <CandidatesFilter />
        </div>
    );
};

export default Candidates;
