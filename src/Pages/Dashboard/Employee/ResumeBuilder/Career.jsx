import React, { useEffect, useState } from "react";
import axiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useSelector } from "react-redux";
import useCurrentUser from "../../../../Hooks/useCurrentUser";
import { useTranslation } from "react-i18next";

const Career = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [roadmap, setRoadmap] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingJobCategories, setLoadingJobCategories] = useState(false);
  const { currentUser } = useCurrentUser();
  const theme = useSelector((state) => state.theme.theme);
  const loggedUser = useSelector((state) => state.user.loggedUser);

  useEffect(() => {
    if (currentUser?.email) {
      const fetchUserData = async () => {
        try {
          setLoading(true);
          const response = await axiosSecure.get(
            `/resume/${currentUser.email}`
          );
          setUser(response.data);
        } catch (error) {
          // console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchJobCategories = async () => {
      try {
        if (!user || !user.skills) return;

        setLoadingJobCategories(true);
        const response = await axiosSecure.post(`/getCareerSuggestions`, {
          skills: user.skills,
        });

        setJobCategories(response.data);

        const careerRoadmap = generateCareerRoadmap(
          user.skills,
          response.data
        );
        setRoadmap(careerRoadmap);
      } catch (error) {
        // console.error("Error fetching job categories:", error);
      } finally {
        setLoadingJobCategories(false);
      }
    };

    if (user?.skills) fetchJobCategories();
  }, [user]);

  const generateCareerRoadmap = (userSkills, jobCategories) => {
    if (!userSkills || !jobCategories) return [];

    const suitableJobCategories = jobCategories
      .map((details) => {
        const hasRequiredSkills = details.requiredSkills.every((skill) =>
          userSkills.includes(skill)
        );
        const additionalSkillsToLearn = details.additionalSkills.filter(
          (skill) => !userSkills.includes(skill)
        );

        if (hasRequiredSkills) {
          return {
            jobTitle: details.jobTitle,
            requiredSkills: details.requiredSkills,
            additionalSkills: additionalSkillsToLearn,
            timeToLearn: details.timeToLearn,
          };
        }
        return null;
      })
      .filter((category) => category !== null);

    return suitableJobCategories;
  };

  if (loading || loadingJobCategories) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">{t("loading")}</p>
      </div>
    );
  }

  if (!user) {
    return <div>{t("loading")}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl text-center font-bold mb-6">
        {t("careerRoadmap")}{" "}
        {user?.name || loggedUser?.name || loggedUser?.displayName}
      </h1>
      <div className="text-center mb-6">
        <p
          className={
            theme === "dark"
              ? "text-lg text-slate-300 mb-4"
              : "text-lg text-gray-700 mb-4"
          }
        >
          {t("basedOnSkills")}
        </p>
      </div>

      {roadmap.length === 0 ? (
        <div
          className={
            theme === "dark"
              ? "text-center text-lg text-slate-300 border-2"
              : "text-center text-lg text-gray-700 border-2"
          }
        >
          <p>{t("noJobCategoriesFound")}</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {roadmap.map((category) => (
            <div
              className={
                theme === "dark"
                  ? "bg-slate-700 bg-opacity-50 shadow-lg text-slate-300 rounded-lg p-6 border-2"
                  : "bg-white shadow-lg rounded-lg p-6 border-2"
              }
              key={category.jobTitle}
            >
              <h2 className="text-xl font-semibold mb-2">
                {t("jobTitle")}: {category.jobTitle}
              </h2>
              <p className="mb-2">
                <span className="font-semibold">{t("requiredSkills")}:</span>{" "}
                {category.requiredSkills.join(", ")}
              </p>
              <p className="mb-2">
                <span className="font-semibold">
                  {t("additionalSkillsToLearn")}:
                </span>{" "}
                {category.additionalSkills.length > 0
                  ? category.additionalSkills.join(", ")
                  : t("none")}
              </p>
              <p className="mb-2">
                <span className="font-semibold">{t("timeToLearn")}:</span>{" "}
                {category.timeToLearn} {t("months")}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-6">
        <p
          className={
            theme === "dark"
              ? "text-lg text-slate-300 mb-2"
              : "text-lg text-gray-700 mb-2"
          }
        >
          {t("exploreFields")}
        </p>
        <p
          className={
            theme === "dark"
              ? "text-lg text-slate-300 mb-2"
              : "text-lg text-gray-700 mb-2"
          }
        >
          {t("additionalSkills")}
        </p>
      </div>
    </div>
  );
};

export default Career;
