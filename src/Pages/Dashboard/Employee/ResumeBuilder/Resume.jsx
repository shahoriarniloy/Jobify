import React, { useRef } from "react";
import axiosSecure from "../../../../Hooks/UseAxiosSecure";
import { Link, useParams } from "react-router-dom";
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
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

const CandidateResume = () => {
  const { t } = useTranslation(); // Destructuring useTranslation
  const { email } = useParams();
  const contentRef = useRef();

  const reactToPrintFn = useReactToPrint({ contentRef });

  const { data: resumeData, isLoading } = useQuery({
    queryKey: ["load-resume"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/resume/${email}`);
      return data;
    },
  });

  if (isLoading) return <DashboardLoader />;
  return (
    <div>
       <Helmet>
        <title>Jobify - Resume</title>
      </Helmet>
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
        className="relative resume-container  p-16 shadow-lg bg-white rounded-lg   w-full mx-auto border-2"
        ref={contentRef}
      >
        <h1 className="text-3xl font-semibold text-blue-700">
          {resumeData?.name}
        </h1>
        <p className="text-xl text-gray-800 italic">{resumeData?.title}</p>

        <div className="contact-section my-3">
          <p>
            <FaEnvelope className="inline mr-2 text-blue-700" />{" "}
            {resumeData?.email}
          </p>
          <p>
            <FaPhone className="inline mr-2 text-blue-700" />{" "}
            {resumeData?.phone}
          </p>
          <p>
            <FaLinkedin className="inline mr-2 text-blue-700" />{" "}
            <a href={resumeData.linkedin}>{resumeData?.linkedin}</a>
          </p>
          <p>
            <FaGithub className="inline mr-2 text-blue-700" />{" "}
            <a href={resumeData.github}>{resumeData?.github}</a>
          </p>
        </div>

        <h2 className="font-bold my-2">{t("objective")}</h2>
        <p className="text-gray-800">{resumeData?.objective}</p>

        <h2 className="font-bold mt-4 mb-2">
          <FaTools className="inline mr-2 text-blue-700" /> {t("skills")}
        </h2>
        <p className="text-gray-800">{resumeData.skills.join(", ")}</p>

        <h2 className="font-bold mb-2 mt-4">
          <FaBriefcase className="inline mr-2 text-blue-700" />{" "}
          {t("Experience")}
        </h2>
        {resumeData.experiences.map((exp, index) => (
          <div key={index} className="my-2">
            <h3 className="font-bold italic text-gray-800">
              {exp?.jobTitle} {t("at")} {exp?.company}
            </h3>
            <p className="text-sm text-gray-700 italic">
              {exp?.startDate} {t("to")} {exp?.endDate}
            </p>
            <p className="text-gray-800">{exp?.description}</p>
          </div>
        ))}

        <h2 className="font-bold mt-4 mb-2">
          <FaProjectDiagram className="inline mr-2 text-blue-700" />{" "}
          {t("projects")}
        </h2>
        {resumeData.projects.map((project, index) => (
          <div key={index} className="my-2">
            <h3 className="font-bold italic">{project?.title}</h3>
            <p>
              {t("link")}:{" "}
              <a className="text-blue-600" href={project?.link}>
                {project?.link}
              </a>
            </p>
            <p className="text-gray-800 text-[15px]">
              {t("description")}: {project?.description}
            </p>
            <p className="text-gray-800 text-[15px]">
              {t("technologies")}: {project?.technologies}
            </p>
          </div>
        ))}

        <h2 className="font-bold mt-4 mb-2">
          <FaGraduationCap className="inline mr-2 text-blue-700" />{" "}
          {t("education")}
        </h2>
        <p className="font-semibold italic text-gray-800">
          {resumeData?.education[0]?.schoolName}
        </p>
        <p className="text-sm text-gray-700 italic">
          {resumeData.education[0].degree}
        </p>
        <p className="text-sm text-gray-700">
          {t("year_of_graduation")}: {resumeData?.education[0]?.endDate}
        </p>

        <h2 className="font-bold mt-4 mb-2">
          <FaLanguage className="inline mr-2 text-blue-700" /> {t("languages")}
        </h2>
        <p className="text-gray-800">{resumeData.languages.join(", ")}</p>
        <div className="absolute bottom-0 right-0 flex items-center justify-end gap-2 text-[#0a65cc] mb-2 p-2 mr-2">
          <PiBag className="w-3 h-3 text-blue-700" />
          <Link to="/" className="text-xs font-bold">
            Jobify
          </Link>
        </div>
      </div>

      {resumeData && (
        <div className="flex justify-center mt-6">
          <button
            onClick={reactToPrintFn}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          >
            <FaDownload className="inline mr-2" />
            {t("download_resume")} {/* Translated button text */}
          </button>
        </div>
      )}
    </div>
  );
};

export default CandidateResume;
