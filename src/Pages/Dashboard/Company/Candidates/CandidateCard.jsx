import  { useState } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoArrowRight, GoBookmark } from "react-icons/go";
import { MdOutlineLocationOn } from 'react-icons/md';
import CandidateModal from './CandidateModal'; // Import the modal component

const CandidateCard = ({ candidate }) => {
    const { candidate_name, image, designation, experience, location } = candidate;
    const [isModalOpen, setModalOpen] = useState(false); 

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <div className="card card-side bg-base-100 shadow-xl mb-5" >
                <figure>
                    <img className=' rounded-lg' src={image} alt={candidate_name} style={{ height: '100px', width: 'auto' }} />
                </figure>
                <div className="card-body p-4" >
                    <h2 className="card-title" >{candidate_name}</h2>
                    <p>{designation}</p>
                    {/* <div className='flex lg:flex-row flex-col items-center mr-52'>
                        <MdOutlineLocationOn className="mr-2 text-2xl" />
                        <p className="mr-2">{location}</p>
                        <div className="candidate-experience flex items-center">
                            <BsCurrencyDollar className="mr-2" />
                            <ul>
                                {experience.map((exp, index) => (
                                    <li key={index} className="experience-item">
                                        <p><strong></strong> {exp.duration ? exp.duration : "Duration not available"} experience</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div> */}
                </div>
                <div className="card-actions justify-center mr-5">
                    <GoBookmark className='mt-14' />
                    <button onClick={handleOpenModal} className="btn mt-10 bg-blue-100 text-blue-600">View Profile <GoArrowRight /></button>
                </div>
            </div>

            {/* Render the modal */}
            {isModalOpen && <CandidateModal candidate={candidate} onClose={handleCloseModal} />}
        </div>
    );
};

export default CandidateCard;
