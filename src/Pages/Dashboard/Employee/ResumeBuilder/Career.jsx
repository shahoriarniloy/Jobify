import React, { useEffect, useState } from "react";
import axiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useSelector } from "react-redux";

const Career = () => {
  const [user, setUser] = useState(null);
  const [roadmap, setRoadmap] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);
  const currentUser = useSelector((state) => state?.user?.currentUser);

  useEffect(() => {
    if (currentUser?.email) {
      const fetchUserData = async () => {
        try {
          const response = await axiosSecure.get(
            `/resume/${currentUser.email}`
          );
          setUser(response.data);

          const careerRoadmap = generateCareerRoadmap(
            response.data.skills,
            jobCategories
          );
          setRoadmap(careerRoadmap);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [currentUser, jobCategories]);

  useEffect(() => {
    const fetchJobCategories = async () => {
      try {
        if (!user || !user.skills) return;

        const skillsArray = user.skills;
        const response = await axiosSecure.post(`/getCareerSuggestions`, {
          skills: skillsArray,
        });

        setJobCategories(response.data);
      } catch (error) {
        console.error("Error fetching job categories:", error);
      }
    };

    fetchJobCategories();
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

  if (!user) return <div>Loading...</div>;

  return (
    <div className="">
      <h1 className="text-2xl text-center">Career Roadmap for {user.name}</h1>
      <div>
        <p className="text-xl text-blue-500 mb-2">{user.name},</p>
        <p className="text-lg text-gray-800 mb-2">
          Based on your skills, we have determined the most suitable career
          fields for you.
        </p>
      </div>

      {roadmap.length === 0 ? (
        <p>No suitable job categories found.</p>
      ) : (
        roadmap.map((category) => (
          <div
            className="bg-white shadow-md w-1/2 mb-8"
            key={category.jobTitle}
          >
            <h2>Job Title: {category.jobTitle}</h2>
            <p>Required Skills: {category.requiredSkills.join(", ")}</p>
            <p>
              Additional Skills to Learn: {category.additionalSkills.join(", ")}
            </p>
            <p>Time to Learn: {category.timeToLearn} months</p>
          </div>
        ))
      )}
      <p className="text-lg text-gray-800 mb-2">
        You can explore these fields and prepare yourself for the best possible
        outcome.
      </p>
      <p className="text-lg text-gray-800">
        We have also provided additional skills that will help you reach your
        goal.
      </p>
    </div>
  );
};

export default Career;
