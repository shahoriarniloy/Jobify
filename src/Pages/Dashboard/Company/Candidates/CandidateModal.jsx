import React from 'react';
import { BsGlobe2 } from 'react-icons/bs';
import { FaFacebookSquare, FaGithub, FaInstagram, FaLinkedin, FaPhoneAlt, FaRegAddressCard, FaTwitterSquare, FaYoutube } from "react-icons/fa";
import { GoBookmark } from 'react-icons/go';
import { IoMdContact } from 'react-icons/io';
import { IoDocumentTextOutline, IoLocationOutline } from 'react-icons/io5';
import { MdCake, MdOutlineMail } from 'react-icons/md';
import { PiGraduationCapBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const CandidateModal = ({ candidate, onClose }) => {
    const { t } = useTranslation();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6">
            <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 w-full max-w-lg md:max-w-3xl lg:max-w-5xl max-h-[90vh] overflow-y-auto">
                <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6'>

                    {/* Left section */}
                    <div>
                        <div className='flex gap-4 sm:gap-6'>
                            <img className='mb-4 rounded-full h-14 w-14 sm:h-20 sm:w-20' src={candidate.image} alt={candidate.candidate_name} />
                            <div>
                                <h2 className="text-lg sm:text-xl font-bold mb-1">{candidate.candidate_name}</h2>
                                <p className="text-sm sm:text-base">{candidate.designation}</p>
                            </div>
                        </div>

                        <div className='mb-4'>
                            <h2 className='font-bold text-sm sm:text-base mb-2'>{t("biography")}</h2>
                            <p className='text-xs sm:text-sm text-justify'>{candidate.biography_description}</p>
                        </div>
                        <hr />

                        <div className='mt-4 mb-4'>
                            <h2 className='font-bold text-sm sm:text-base mb-2'>{t("cover_letter")}</h2>
                            <h2 className='text-xs sm:text-sm mb-2'>{t("dear_hiring_manager")}</h2>
                            <p className='text-xs sm:text-sm mb-2 text-justify'>{candidate.cover_letter}</p>
                            <h2 className='text-xs sm:text-sm'>{t("best_regards")}, <br /> {candidate.candidate_name}</h2>
                        </div>
                        <hr />

                        <div className='mt-4'>
                            <h2 className='font-bold text-sm sm:text-base mb-2'>{t("follow_on_social_media")}</h2>
                            <div className='flex gap-2'>
                                <Link to={candidate.social_links.facebook}><FaFacebookSquare className='bg-white text-blue-600 h-5 w-5 sm:h-6 sm:w-6' /></Link>
                                <Link to={candidate.social_links.twitter}><FaTwitterSquare className='bg-white text-blue-600 h-5 w-5 sm:h-6 sm:w-6' /></Link>
                                <Link to={candidate.social_links.linkedin}><FaLinkedin className='bg-white text-blue-600 h-5 w-5 sm:h-6 sm:w-6' /></Link>
                                <Link to={candidate.social_links.github}><FaGithub className='bg-white text-blue-600 h-5 w-5 sm:h-6 sm:w-6' /></Link>
                                <Link to={candidate.social_links.instagram}><FaInstagram className='bg-white text-blue-600 h-5 w-5 sm:h-6 sm:w-6' /></Link>
                                <Link to={candidate.social_links.youtube}><FaYoutube className='bg-white text-blue-600 h-5 w-5 sm:h-6 sm:w-6' /></Link>
                            </div>
                        </div>
                    </div>

                    {/* Right section */}
                    <div>
                        <div className='flex justify-end items-center space-x-2 sm:space-x-4'>
                            <GoBookmark className='bg-blue-100 text-blue-600 h-6 w-6 sm:h-8 sm:w-8' />
                            <button className="btn bg-blue-600 text-white rounded-md flex items-center px-2 py-1 sm:px-4 sm:py-2">
                                <MdOutlineMail className="mr-1 sm:mr-2" /> {t("send_email")}
                            </button>
                        </div>

                        <div className='mt-6 border-2 rounded-lg p-4'>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <MdCake className='bg-white text-blue-600 h-4 w-4 sm:h-5 sm:w-5 mb-2' />
                                    <h2 className='text-gray-500 text-xs sm:text-sm font-bold mb-1'>{t("date_of_birth")}</h2>
                                    <h2 className='text-xs sm:text-sm font-bold mb-2'>{candidate.date_of_birth}</h2>
                                </div>
                                <div>
                                    <FaRegAddressCard className='bg-white text-blue-600 h-4 w-4 sm:h-5 sm:w-5 mb-2' />
                                    <h2 className='text-gray-500 text-xs sm:text-sm font-bold mb-1'>{t("nationality")}</h2>
                                    <h2 className='text-xs sm:text-sm font-bold mb-2'>{candidate.nationality}</h2>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-4 mt-4'>
                                <div>
                                    <IoDocumentTextOutline className='bg-white text-blue-600 h-4 w-4 sm:h-5 sm:w-5 mb-2' />
                                    <h2 className='text-gray-500 text-xs sm:text-sm font-bold mb-1'>{t("marital_status")}</h2>
                                    <h2 className='text-xs sm:text-sm font-bold mb-2'>{candidate.marital_status}</h2>
                                </div>
                                <div>
                                    <IoMdContact className='bg-white text-blue-600 h-4 w-4 sm:h-5 sm:w-5 mb-2' />
                                    <h2 className='text-gray-500 text-xs sm:text-sm font-bold mb-1'>{t("gender")}</h2>
                                    <h2 className='text-xs sm:text-sm font-bold mb-2'>{candidate.gender}</h2>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-4 mt-4'>
                                <div>
                                    <MdCake className='bg-white text-blue-600 h-4 w-4 sm:h-5 sm:w-5 mb-2' />
                                    <h2 className='text-gray-500 text-xs sm:text-sm font-bold mb-1'>{t("experience")}</h2>
                                    {candidate.experience.map((exp, index) => (
                                        <h2 key={index} className='text-xs sm:text-sm font-bold mb-2'>
                                            {exp.duration || t("duration_not_available")}
                                        </h2>
                                    ))}
                                </div>
                                <div>
                                    <PiGraduationCapBold className='bg-white text-blue-600 h-4 w-4 sm:h-5 sm:w-5 mb-2' />
                                    <h2 className='text-gray-500 text-xs sm:text-sm font-bold mb-1'>{t("education")}</h2>
                                    {candidate.education.map((edu, index) => (
                                        <h2 key={index} className='text-xs sm:text-sm font-bold mb-2'>
                                            {edu.degree || t("degree_not_available")}
                                        </h2>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Resume Download */}
                        <div className='border-2 mt-4 rounded-lg p-4'>
                            <h2 className='text-sm sm:text-base font-bold'>{t("download_my_resume")}</h2>
                            <a
                                href={candidate.resume_link}
                                download={candidate.candidate_name + '_Resume.pdf'}
                                className='btn bg-blue-600 text-white rounded-md flex items-center mt-2 px-2 py-1 sm:px-4 sm:py-2'
                            >
                                <IoDocumentTextOutline className='mr-1 sm:mr-2' /> {t("download_resume")}
                            </a>
                        </div>

                        {/* Contact Information */}
                        <div className='border-2 rounded-lg mt-4 p-4'>
                            <h2 className='text-sm sm:text-base font-bold mb-4'>{t("contact_information")}</h2>
                            <div className='flex items-center gap-4 mb-4'>
                                <BsGlobe2 className='bg-white text-blue-600 h-5 w-5 sm:h-6 sm:w-6' />
                                <div>
                                    <h2 className='text-gray-500 text-xs sm:text-sm font-bold'>{t("address")}</h2>
                                    <h2 className='text-xs sm:text-sm font-bold'>{candidate.address}</h2>
                                </div>
                            </div>
                            <div className='flex items-center gap-4 mb-4'>
                                <FaPhoneAlt className='bg-white text-blue-600 h-5 w-5 sm:h-6 sm:w-6' />
                                <h2 className='text-xs sm:text-sm font-bold'>{candidate.phone}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <button onClick={onClose} className="btn bg-red-600 text-white rounded-md px-4 py-2">
                        {t("close")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CandidateModal;
