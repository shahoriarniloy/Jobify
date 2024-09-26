// CandidateModal.js
import React from 'react';
import { BsGlobe2 } from 'react-icons/bs';
import { FaFacebookSquare, FaGithub, FaInstagram, FaLinkedin, FaPhoneAlt, FaPhoneVolume, FaRegAddressCard, FaTwitterSquare, FaYoutube } from "react-icons/fa";
import { GoBookmark } from 'react-icons/go';
import { IoMdContact } from 'react-icons/io';
import { IoDocumentTextOutline, IoLocationOutline } from 'react-icons/io5';
import { MdCake, MdOutlineMail } from 'react-icons/md';
import { PiGraduationCapBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const CandidateModal = ({ candidate, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-3/4 max-w-5xl max-h-[80vh] overflow-y-auto"> {/* Set max-height and overflow */}
            <div className='grid grid-cols-[2fr_1fr] gap-6'>

               {/* left */}
                <div>
                <div className='flex gap-8'>
            <img className='mb-4 rounded-full h-14 w-14 ' src={candidate.image} alt={candidate.candidate_name}  />
            <div>
            <h2 className="text-xl font-bold mb-1">{candidate.candidate_name}</h2>
            <p>{candidate.designation}</p>
            </div>
            
            </div>
            <div className='mb-4'>
            <h2 className='font-bold mb-2'>BIOGRAPHY:</h2>
        
            <p className='text-sm '>{candidate.biography_description}</p>
   
            </div>
            <hr />

            <div className='mt-4 mb-4'>
            <h2 className='font-bold mb-2'>COVER LETTER:</h2>
            <h2 className='text-sm mb-2'>Dear Hiring Manager, </h2>
            <p className='text-sm mb-2 text-justify'>{candidate.cover_letter}</p>
            <h2 className='text-sm'>Best regards, <br /> {candidate.candidate_name}</h2>
            </div>
                <hr />
            <div className='mt-4'>
                <h2 className='font-bold mb-2'>Follow on Social Media</h2>
                <div className='flex gap-2'>
                    <Link to={candidate.social_links.facebook}><FaFacebookSquare className='bg-white text-blue-600 h-6 w-6' /> </Link>
                    <Link to={candidate.social_links.twitter}><FaTwitterSquare className='text-white bg-blue-600 h-6 w-6' />  </Link>
                    <Link to={candidate.social_links.linkedin}><FaLinkedin className='bg-white text-blue-600 h-6 w-6'  /> </Link>
                    <Link to={candidate.social_links.github}><FaGithub className='bg-white text-blue-600 h-6 w-6'  /> </Link>
                    <Link to={candidate.social_links.instagram}><FaInstagram className='bg-white text-blue-600 h-6 w-6'  /> </Link>
                    <Link to={candidate.social_links.youtube}><FaYoutube className='bg-white text-blue-600 h-6 w-6'  /> </Link>
                
             
                </div>

            </div>
                </div>


          {/* right */}
          <div>
          <div>
                    <div className='flex justify-end items-center space-x-4'>
            <GoBookmark className='bg-blue-100 text-blue-600 h-8 w-8' />
            <button className="btn bg-blue-600 text-white rounded-none flex items-center">
                <MdOutlineMail /> Send Email
            </button>
        </div>
        <div className='mt-6 border-2 rounded-lg'>
            <div className='grid grid-cols-[2fr_2fr]  m-4'>
                <div>
                <MdCake className='bg-white text-blue-600 h-4 w-4 mb-2' />
                <h2 className='text-gray-500 text-xs font-bold mb-1'>DATE OF BIRTH</h2>
                <h2 className=' text-xs font-bold mb-2'>{candidate.date_of_birth}</h2>
                </div>
                <div>
                <FaRegAddressCard className='bg-white text-blue-600 h-4 w-4 mb-2' />
                <h2 className='text-gray-500 text-xs font-bold mb-1'>NATIONALITY</h2>
                <h2 className=' text-xs font-bold mb-2'>{candidate.nationality}</h2>
                </div>
                
            </div>
            <div className='grid grid-cols-[2fr_2fr] m-4'>
                <div>
                <IoDocumentTextOutline className='bg-white text-blue-600 h-4 w-4 mb-2' />
                <h2 className='text-gray-500 text-xs font-bold mb-1'>MARITAL STATUS</h2>
                <h2 className=' text-xs font-bold mb-2'>{candidate.marital_status}</h2>
                </div>
                <div>
                <IoMdContact  className='bg-white text-blue-600 h-4 w-4 mb-2' />
                <h2 className='text-gray-500 text-xs font-bold mb-1'>GENDER</h2>
                <h2 className=' text-xs font-bold mb-2'>{candidate.gender}</h2>
                </div>
                
            </div>
           <div className='grid grid-cols-[2fr_2fr] m-4'>
                <div>
                <MdCake className='bg-white text-blue-600 h-4 w-4 mb-2' />
                <h2 className='text-gray-500 text-xs font-bold mb-1'>EXPERIENCE</h2>
                <h2>
                    {candidate.experience.map((exp, index) => (
                        <h2 className='text-xs font-bold mb-2' key={index}>
                            {exp.duration ? exp.duration : "Duration not available"}
                        </h2>
                    ))}
                </h2>
                </div>
                <div>
                <PiGraduationCapBold  className='bg-white text-blue-600 h-4 w-4 mb-2' />
                <h2 className='text-gray-500 text-xs font-bold mb-1'>EDUCATION</h2>
                <h2>
                    {candidate.education.map((edu, index) => (
                        <h2 className='text-xs font-bold mb-2' key={index}>
                            {edu.degree ? edu.degree : "Duration not available"}
                        </h2>
                    ))}
                </h2>
                </div>
                
            </div>

           
        </div>


            </div>

            {/* resume */}
            <div className='border-2 mt-4 rounded-lg'>
            <div className='m-4'>
                <h2 className='text-sm font-bold'>Download My Resume</h2>
            
                <a 
                    href={candidate.resume_link} 
                    download={candidate.candidate_name + '_Resume.pdf'} 
                    className='btn bg-blue-600 text-white rounded-none flex items-center mt-2'
                >
                    <IoDocumentTextOutline className='mr-2' /> Download Resume
                </a>
            </div>
            </div>

            {/* contact info */}
            <div className='border-2 rounded-lg mt-4'>
                <div className='m-5'>
                <h2 className='text-sm font-bold mb-4'>Contact Information</h2>
                  <div className='flex items-center gap-4 mb-4'>
                <BsGlobe2 className='bg-white text-blue-600 h-6 w-6' />
                <div>
                    <h1 className='text-gray-500 text-xs font-bold mb-1'>WEBSITE</h1>
                    <h3 className='text-black text-xs'>{candidate.website}</h3>
                </div>
            </div>
            <hr />

            <div className='flex items-center gap-4 mt-4 mb-4'>
                <IoLocationOutline  className='bg-white text-blue-600 h-6 w-6' />
                <div>
                    <h1 className='text-gray-500 text-xs font-bold mb-1'>LOCATION</h1>
                    <h3 className='text-black text-xs'>{candidate.location}</h3>
                </div>
            </div>
            <hr />
            <div className='flex items-center gap-4 mt-4 mb-4'>
                <FaPhoneAlt  className='bg-white text-blue-600 h-6 w-6' />
                <div>
                    <h1 className='text-gray-500 text-xs font-bold mb-1'>PHONE</h1>
                    <h3 className='text-black text-xs'>{candidate.phone_no}</h3>
                </div>
            </div>
            <hr />
            <div className='flex items-center gap-4 mt-4 mb-4'>
                <MdOutlineMail  className='bg-white text-blue-600 h-6 w-6' />
                <div>
                    <h1 className='text-gray-500 text-xs font-bold mb-1'>EMAIL ADDRESS</h1>
                    <h3 className='text-black text-xs'>{candidate.email_address}</h3>
                </div>
            </div>
            </div>
            

            </div>
            <button onClick={onClose} className="mt-4 btn btn-primary bg-red-600 text-white w-full">Close</button>
          </div>
         
            
            </div>
        
                
            </div>
     
        </div>
    );
};

export default CandidateModal;
