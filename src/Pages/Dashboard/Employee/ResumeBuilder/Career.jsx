import React, { useEffect, useState } from "react";
import axiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useSelector } from "react-redux";
import useCurrentUser from "../../../../Hooks/useCurrentUser";
import ReactFlow, { Controls } from "react-flow-renderer";

const Career = () => {
  const [user, setUser] = useState(null);
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(true);
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
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchJobCategories = async () => {
      if (!user || !user.skills) return;

      try {
        const response = await axiosSecure.post(`/getCareerSuggestions`, {
          skills: user.skills,
        });
        const careerRoadmap = generateCareerRoadmap(user.skills, response.data);
        setRoadmap(careerRoadmap);
      } catch (error) {
        console.error("Error fetching job categories:", error);
      }
    };

    if (user?.skills) fetchJobCategories();
  }, [user]);

  const generateCareerRoadmap = (userSkills, jobCategories) => {
    if (!userSkills || !jobCategories) return [];

    return jobCategories
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
  };

  const createNodes = () => {
    let nodes = [];
    let yOffset = 0; // Offset for vertical positioning

    roadmap.forEach((category, index) => {
      // Job Title Node
      nodes.push({
        id: `job-${index}`,
        data: { label: `Job Title: ${category.jobTitle}` },
        position: { x: index * 200, y: yOffset },
        style: { backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' },
      });
      yOffset += 150; // Increase yOffset for the next job title node

      // Required Skills Nodes
      category.requiredSkills.forEach((skill, skillIndex) => {
        nodes.push({
          id: `requiredSkill-${index}-${skillIndex}`,
          data: { label: skill },
          position: { x: index * 200, y: yOffset },
          style: { backgroundColor: '#e0f7fa', border: '1px solid #006064', padding: '10px' },
        });
        yOffset += 50; // Increase yOffset for the next skill node
      });

      // Additional Skills Section Node
      if (category.additionalSkills.length > 0) {
        const additionalSkillsPosition = {
          x: index * 200 + 150, // Offset to create a separate road
          y: yOffset - (category.requiredSkills.length * 50) + 25, // Align with the middle of the required skills
        };

        // Node for Additional Skills header
        nodes.push({
          id: `additionalSkillsHeader-${index}`,
          data: { label: `Additional Skills:` },
          position: additionalSkillsPosition,
          style: { backgroundColor: '#ffe0b2', border: '1px solid #ff6f20', padding: '10px' },
        });
        yOffset += 50; // Increase yOffset for the header node

        // Individual Additional Skills Nodes
        category.additionalSkills.forEach((skill, skillIndex) => {
          nodes.push({
            id: `additionalSkill-${index}-${skillIndex}`,
            data: { label: skill },
            position: { x: index * 200 + 150, y: yOffset },
            style: { backgroundColor: '#ffe0b2', border: '1px solid #ff6f20', padding: '10px' },
          });
          yOffset += 50; // Increase yOffset for the next additional skill node
        });
      }

      // Add Time to Learn Node
      nodes.push({
        id: `timeToLearn-${index}`,
        data: { label: `Time to Learn: ${category.timeToLearn} months` },
        position: { x: index * 200, y: yOffset + 50 },
        style: { backgroundColor: '#f0e68c', border: '1px solid #e1e100', padding: '10px' },
      });
      yOffset += 100; // Increase yOffset for spacing between job categories
    });

    return nodes;
  };

  const createEdges = () => {
    let edges = [];

    roadmap.forEach((category, index) => {
      // Connect job title to required skills
      category.requiredSkills.forEach((_, skillIndex) => {
        edges.push({
          id: `edge-job-${index}-skill-${skillIndex}`,
          source: `job-${index}`,
          target: `requiredSkill-${index}-${skillIndex}`,
          animated: true,
        });
      });

      // Connect job title to additional skills header
      if (category.additionalSkills.length > 0) {
        edges.push({
          id: `edge-job-${index}-additionalHeader`,
          source: `job-${index}`,
          target: `additionalSkillsHeader-${index}`,
          animated: true,
        });

        // Connect additional skills nodes
        category.additionalSkills.forEach((_, skillIndex) => {
          edges.push({
            id: `edge-job-${index}-additional-${skillIndex}`,
            source: `additionalSkillsHeader-${index}`,
            target: `additionalSkill-${index}-${skillIndex}`,
            animated: true,
          });
        });
      }

      // Connect job title to time to learn
      edges.push({
        id: `edge-job-${index}-time`,
        source: `job-${index}`,
        target: `timeToLearn-${index}`,
        animated: true,
      });
    });

    return edges;
  };

  const nodes = createNodes();
  const edges = createEdges();

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
        Career Roadmap for{" "}
        {user?.name || loggedUser?.name || loggedUser.displayName}
      </h1>
      <div className="text-center mb-6">
        <p
          className={`text-lg mb-4 ${
            theme === "dark" ? "text-slate-300" : "text-gray-700"
          }`}
        >
          Based on your skills, here are the most suitable career fields for you.
        </p>
      </div>

      {roadmap.length === 0 ? (
        <div className={`text-center text-lg border-2 ${
            theme === "dark" ? "text-slate-300" : "text-gray-700"
          }`}>
          <p>No suitable job categories found.</p>
        </div>
      ) : (
        <div style={{ height: '600px' }}>
          <ReactFlow nodes={nodes} edges={edges} fitView>
            {/* Removed <MiniMap /> to hide it */}
            <Controls />
          </ReactFlow>
        </div>
      )}

      <div className="text-center mt-6">
        <p className={`text-lg mb-2 ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
          Explore these fields and prepare for the best possible career outcome.
        </p>
        <p className={`text-lg mb-2 ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
          We've also provided additional skills to help you reach your goals.
        </p>
      </div>
    </div>
  );
};

export default Career;
