import React, { useEffect, useState, useRef } from "react";
import axiosSecure from "../../../../Hooks/UseAxiosSecure";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaGraduationCap,
  FaLanguage,
  FaTools,
  FaProjectDiagram,
  FaDownload,
} from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { PiBag } from "react-icons/pi";
import DashboardLoader from "../../../../Shared/DashboardLoader";
import { useTranslation } from "react-i18next";
import useCurrentUser from "../../../../Hooks/useCurrentUser";

const Resume = () => {
  const { t } = useTranslation();
  const { email } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState("");
  const { currentUser } = useCurrentUser();
  const contentRef = useRef();

  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axiosSecure.get(`/resume/${currentUser?.email}`);
        setResumeData(response?.data);
      } catch (err) {
        setError(t("error_fetching_resume_data"));
      }
    };

    if (currentUser) {
      fetchResume();
    }
  }, [currentUser, t]);


  if (!resumeData) {
    return <div>{t("no_resume_data_found")}</div>;
  }

  return (
    <div>
      {resumeData && (
        <div className="flex justify-end">
          <button
            onClick={reactToPrintFn}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          >
            <FaDownload className="inline mr-2" />
            {t("download_resume")}
          </button>
        </div>
      )}
      <div
        className="relative resume-container pt-6 px-6 shadow-lg bg-white rounded-lg lg:w-[600px] lg:h-[842px] md:w-[600px] md:h-[842px] text-xs w-full mx-auto"
        ref={contentRef}
      >
        <h1 className="text-xl font-bold">{resumeData?.name}</h1>

        <div className="contact-section my-2">
          <p>
            <FaEnvelope className="inline mr-2" /> {resumeData?.email}
          </p>
          <p>
            <FaPhone className="inline mr-2" /> {resumeData?.phone}
          </p>
          <p>
            <FaLinkedin className="inline mr-2" />{" "}
            <a href={resumeData.linkedin}>{resumeData?.linkedin}</a>
          </p>
          <p>
            <FaGithub className="inline mr-2" />{" "}
            <a href={resumeData.github}>{resumeData?.github}</a>
          </p>
        </div>

        <h2 className="text-sm font-semibold my-2">{t("objective")}</h2>
        <p>{resumeData?.objective}</p>

        <h2 className="text-sm font-semibold my-2">
          <FaTools className="inline mr-2" /> {t("skills")}
        </h2>
        <p>{resumeData.skills.join(", ")}</p>

        <h2 className="text-sm font-semibold my-2">
          <FaBriefcase className="inline mr-2" /> {t("experience")}
        </h2>
        {resumeData.experiences.map((exp, index) => (
          <div key={index} className="my-1">
            <h3 className="font-bold">
              {exp?.jobTitle} {t("at")} {exp?.company}
            </h3>
            <p>
              {exp?.startDate} {t("to")} {exp?.endDate}
            </p>
            <p>{exp?.description}</p>
          </div>
        ))}

        <h2 className="text-sm font-semibold my-2">
          <FaProjectDiagram className="inline mr-2" /> {t("projects")}
        </h2>
        {resumeData.projects.map((project, index) => (
          <div key={index} className="my-1">
            <h3 className="font-bold">{project?.title}</h3>
            <p>
              {t("link")}: <a href={project?.link}>{project?.link}</a>
            </p>
            <p>{t("description")}: {project?.description}</p>
            <p>{t("technologies")}: {project?.technologies}</p>
          </div>
        ))}

        <h2 className="text-sm font-semibold my-2">
          <FaGraduationCap className="inline mr-2" /> {t("education")}
        </h2>
        <p>{t("institution")}: {resumeData?.education[0]?.schoolName}</p>
        <p>{resumeData.education[0].degree}</p>
        <p>{t("year_of_graduation")}: {resumeData?.education[0]?.endDate}</p>

        <h2 className="text-sm font-semibold my-2">
          <FaLanguage className="inline mr-2" /> {t("languages")}
        </h2>
        <p>{resumeData.languages.join(", ")}</p>
        <div className="absolute bottom-0 right-0 flex items-center justify-end gap-2 text-[#0a65cc] mb-2 p-2 mr-2">
          <PiBag className="w-3 h-3" />
          <Link to="/" className="text-xs font-bold">
            Jobify
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Resume;
