import React, { useEffect, useState } from "react";
import axiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useSelector } from "react-redux";

const Career = () => {
  const [user, setUser] = useState(null);
  const [roadmap, setRoadmap] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state?.user?.currentUser);

  useEffect(() => {
    if (currentUser?.email) {
      const fetchUserData = async () => {
        try {
          setLoading(true); // Set loading before API call
          const response = await axiosSecure.get(`/resume/${currentUser.email}`);
          setUser(response.data);

          const careerRoadmap = generateCareerRoadmap(
            response.data.skills,
            jobCategories
          );
          setRoadmap(careerRoadmap);
          setLoading(false); // End loading after data is fetched
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false); // Ensure loading ends even on error
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl text-center font-bold mb-6">
        Career Roadmap for {user.name}
      </h1>
      <div className="text-center mb-6">

        <p className="text-xl text-blue-500 mb-2">{user.name},</p>
        <p className="text-lg text-gray-700 mb-4">
          Based on your skills, here are the most suitable career fields for you.
        </p>
      </div>

      {roadmap.length === 0 ? (
        <div className="text-center text-lg text-gray-700">
          <p>No suitable job categories found.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {roadmap.map((category) => (
            <div
              className="bg-white shadow-lg rounded-lg p-6"
              key={category.jobTitle}
            >
              <h2 className="text-xl font-semibold mb-2">
                Job Title: {category.jobTitle}
              </h2>
              <p className="mb-2">
                <span className="font-semibold">Required Skills:</span>{" "}
                {category.requiredSkills.join(", ")}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Additional Skills to Learn:</span>{" "}
                {category.additionalSkills.length > 0
                  ? category.additionalSkills.join(", ")
                  : "None"}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Time to Learn:</span>{" "}
                {category.timeToLearn} months
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-6">
        <p className="text-lg text-gray-700 mb-2">
          Explore these fields and prepare for the best possible career outcome.
        </p>
        <p className="text-lg text-gray-700">
          We've also provided additional skills to help you reach your goals.
        </p>
      </div>
    </div>
  );
};

export default Career;
