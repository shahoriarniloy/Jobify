import React from "react";
import { useState, useEffect } from "react";
import axiosSecure from "../../../../Hooks/UseAxiosSecure";
import "./resume.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const predefinedSkills = [
  // Frontend Development
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Vue.js",
  "Angular",
  "Svelte",
  "Tailwind CSS",
  "Bootstrap",
  "Sass",
  "LESS",
  "Material UI",
  "jQuery",

  // Backend Development
  "Node.js",
  "Express.js",
  "PHP",
  "Laravel",
  "Ruby",
  "Ruby on Rails",
  "Python",
  "Django",
  "Flask",
  "Java",
  "Spring Boot",
  "C#",
  ".NET Core",
  "Kotlin",
  "Scala",
  "Go",
  "Elixir",

  // Databases
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "SQLite",
  "Oracle",
  "SQL Server",
  "Redis",
  "Cassandra",
  "DynamoDB",
  "MariaDB",
  "Neo4j",
  "Couchbase",

  // DevOps & Cloud
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "Google Cloud Platform (GCP)",
  "Terraform",
  "Ansible",
  "Jenkins",
  "CI/CD",
  "Vagrant",
  "CircleCI",
  "TravisCI",
  "Nginx",
  "Apache",
  "OpenShift",
  "CloudFormation",
  "Pulumi",
  "Kong",
  "Prometheus",
  "Grafana",

  // Mobile Development
  "React Native",
  "Flutter",
  "Swift",
  "Objective-C",
  "Kotlin",
  "Java (Android)",
  "Xamarin",
  "Ionic",
  "Cordova",
  "PhoneGap",

  // Data Science & Machine Learning
  "Python",
  "R",
  "Pandas",
  "NumPy",
  "SciPy",
  "TensorFlow",
  "PyTorch",
  "Keras",
  "Scikit-learn",
  "OpenCV",
  "NLTK",
  "Hugging Face",
  "Matplotlib",
  "Seaborn",
  "Jupyter",
  "Dask",
  "PySpark",
  "Tableau",
  "Power BI",
  "Plotly",
  "Excel",
  "SPSS",

  // Cybersecurity & Networking
  "Penetration Testing",
  "Network Security",
  "Cryptography",
  "Nmap",
  "Metasploit",
  "Wireshark",
  "Burp Suite",
  "OWASP",
  "Kali Linux",
  "Snort",
  "Suricata",
  "SIEM",
  "IDS/IPS",
  "Firewalls",
  "SOC",
  "SSL/TLS",
  "PKI",
  "IAM",
  "Malware Analysis",
  "Cisco Packet Tracer",
  "Cisco CCNA",
  "Cisco CCNP",
  "Cisco ASA",
  "Juniper Networks",
  "Network Monitoring",
  "BGP",
  "OSPF",
  "VPN",
  "DNS",
  "DHCP",
  "IPSec",
  "Load Balancers",
  "Cisco Routers/Switches",
  "TCP/IP",
  "VoIP",
  "LAN/WAN",
  "Routing & Switching",
  "SNMP",
  "F5 Big-IP",
  "VLAN",
  "Firewall Configuration",

  // Circuit Design & Simulation Tools
  "MATLAB",
  "Simulink",
  "Multisim",
  "Proteus",
  "NI LabVIEW",
  "PSPICE",
  "Altium Designer",
  "Cadence Virtuoso",
  "OrCAD",
  "KiCAD",
  "LTspice",
  "Mentor Graphics",
  "AutoCAD Electrical",
  "Xilinx ISE",
  "Quartus Prime",
  "Vivado",
  "HFSS",
  "ANSYS",
  "SolidWorks Electrical",
  "Verilog",
  "VHDL",
  "SPICE Simulation",
  "PCB Design",
  "Microcontroller Programming",

  // Telecommunications
  "Telecommunications Networks",
  "VoIP",
  "Telecom Protocols",
  "GSM",
  "4G LTE",
  "5G",
  "Fiber Optics",
  "Microwave Communication",
  "Satellite Communication",
  "RF Engineering",
  "SD-WAN",
  "VPN Tunneling",
  "MPLS",
  "FTTH",
  "Network Design",
  "Routing Protocols",

  // Blockchain
  "Ethereum",
  "Solidity",
  "Hyperledger",
  "Bitcoin",
  "Smart Contracts",
  "Truffle",
  "Ganache",
  "Web3.js",
  "IPFS",
  "Polkadot",
  "Solana",

  // Artificial Intelligence & Machine Learning
  "Machine Learning",
  "Deep Learning",
  "Natural Language Processing (NLP)",
  "Computer Vision",
  "AI Ethics",
  "GPT",
  "Reinforcement Learning",
  "Recommendation Systems",
  "Generative Adversarial Networks (GANs)",
  "Bayesian Networks",
  "Time Series Analysis",

  // Project Management & Tools
  "Agile",
  "Scrum",
  "Kanban",
  "JIRA",
  "Confluence",
  "Trello",
  "Asana",
  "Slack",
  "Basecamp",
  "Microsoft Project",
  "Monday.com",
  "ClickUp",
  "Notion",

  // Graphic Design
  "Adobe Photoshop",
  "Adobe Illustrator",
  "CorelDRAW",
  "InDesign",
  "Affinity Designer",
  "Figma",
  "Sketch",
  "Canva",
  "GIMP",
  "Adobe XD",
  "Procreate",
  "Blender",
  "3D Modeling",
  "Motion Graphics",
  "Typography",
  "Color Theory",
  "Branding",
  "Logo Design",
  "UI Mockups",
  "Vector Illustration",
  "Digital Painting",
  "Photo Retouching",

  // UI/UX Design
  "Wireframing",
  "Prototyping",
  "User Research",
  "Usability Testing",
  "Interaction Design",
  "Adobe XD",
  "Figma",
  "Sketch",
  "InVision",
  "Balsamiq",
  "Framer",
  "User Personas",
  "Journey Mapping",
  "Information Architecture",
  "A/B Testing",
  "Heatmaps",
  "Responsive Design",
  "Design Systems",
  "Accessibility",
  "Mobile-first Design",

  // Civil Engineering
  "AutoCAD",
  "Civil 3D",
  "Revit",
  "STAAD Pro",
  "ETABS",
  "SAP2000",
  "MATLAB",
  "Primavera P6",
  "Construction Management",
  "Structural Analysis",
  "Geotechnical Engineering",
  "Surveying",
  "Concrete Design",
  "Steel Design",
  "Project Scheduling",
  "Cost Estimation",
  "Building Information Modeling (BIM)",
  "Environmental Impact Assessment",
  "Soil Mechanics",
  "Hydraulics",
  "Urban Planning",
  "Transportation Engineering",

  // Medical/Healthcare
  "Patient Care",
  "Medical Records Management",
  "Electronic Health Records (EHR)",
  "Phlebotomy",
  "Medical Coding",
  "Telemedicine",
  "Medical Terminology",
  "Pharmacology",
  "Clinical Data Analysis",
  "Surgery Assistance",
  "Physical Therapy",
  "Patient Education",
  "Public Health",
  "Pathology",
  "Pediatrics",
  "Oncology",
  "Radiology",
  "Cardiology",
  "Medical Research",
  "Health Informatics",
  "CPR",
  "HIPAA Compliance",
  "Diagnostic Imaging",
  "Lab Testing",

  // Teaching & Education
  "Curriculum Development",
  "Lesson Planning",
  "Classroom Management",
  "Online Teaching",
  "Educational Technology",
  "Learning Management Systems (LMS)",
  "Instructional Design",
  "Pedagogy",
  "Differentiated Instruction",
  "Assessment Strategies",
  "Google Classroom",
  "Zoom",
  "Blackboard",
  "Kahoot",
  "Edmodo",
  "Moodle",
  "Tutoring",
  "Adult Education",
  "Special Education",
  "Early Childhood Education",
  "Blended Learning",
  "STEM Education",
  "Literacy",
  "Professional Development",
  "ESL Teaching",
  "Behavioral Management",

  // Other Tools & Technologies
  "Git",
  "GitHub",
  "GitLab",
  "Bitbucket",
  "Webpack",
  "Babel",
  "Gulp",
  "Grunt",
  "REST API",
  "GraphQL",
  "SOAP",
  "gRPC",
  "OAuth",
  "JWT",
  "Firebase",
  "Heroku",
  "Netlify",
  "Vercel",
  "DigitalOcean",
  "Electron",
  "WebAssembly",
  "Figma",
  "Adobe XD",
  "Sketch",
  "Zeplin",
];

const languageList = [
  "English",
  "Spanish",
  "Mandarin",
  "Hindi",
  "Bengali",
  "Telugu",
  "Marathi",
  "Tamil",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Punjabi",
  "Urdu",
  "Arabic",
  "Egyptian Arabic",
  "Levantine Arabic",
  "Maghrebi Arabic",
  "Swahili",
  "Hausa",
  "Yoruba",
  "Amharic",
  "Zulu",
  "Shona",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Dutch",
  "Greek",
  "Swedish",
  "Danish",
  "Norwegian",
  "Finnish",
  "Polish",
  "Czech",
  "Slovak",
  "Hungarian",
  "Romanian",
  "Bulgarian",
  "Serbian",
  "Croatian",
  "Bosnian",
  "Albanian",
  "Ukrainian",
  "Belarusian",
  "Lithuanian",
  "Latvian",
  "Estonian",
  "Russian",
  "Kazakh",
  "Uzbek",
  "Tajik",
  "Turkmen",
  "Kyrgyz",
  "Vietnamese",
  "Thai",
  "Lao",
  "Khmer",
  "Burmese",
  "Malay",
  "Indonesian",
  "Tagalog",
  "Korean",
  "Japanese",
  "Turkish",
  "Azerbaijani",
  "Persian",
  "Pashto",
  "Kurdish",
  "Samoan",
  "Tongan",
  "Fijian",
  "Maori",
  "Hawaiian",
  "Navajo",
  "Quechua",
  "Guarani",
  "Hebrew",
  "Georgian",
  "Armenian",
  "Mongolian",
  "Sinhala",
  "Nepali",
  "Dzongkha",
  "Tibetan",
  "Malagasy",
];

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
    objective: "",
    skills: [],
    experiences: [
      {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    projects: [{ title: "", link: "", description: "", technologies: "" }],
    educationYear: "",
    languages: "",
  });

  const [skillInput, setSkillInput] = useState("");
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [languageInput, setLanguageInput] = useState("");
  const [languageSuggestions, setLanguageSuggestions] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosSecure.get(`/users/${currentUser?.email}`);
        const { name, phone, email, education, userInfo } = response.data;
        setFormData((prev) => ({
          ...prev,
          name,
          phone,
          email,
          education,
          userInfo,
        }));
      } catch (error) {
        // console.error("Error fetching user data", error);
      }
    };
    fetchUserData();
  }, []);

  const fetchResumeOrUserData = async (email) => {
    try {
      // Fetch resume data using axiosSecure
      const resumeResponse = await axiosSecure.get(
        `/resume/${currentUser.email}`
      );
      if (resumeResponse.status === 200) {
        const resumeData = resumeResponse.data;

        setFormData({
          ...formData,
          ...resumeData,
          languages: resumeData.languages || "",
        });
      } else {
        const userResponse = await axiosSecure.get(`/users/${email}`);

        if (userResponse.status === 200) {
          const userData = userResponse.data;

          setFormData({
            ...formData,
            name: currentUser.displayName,
            phone: userData?.userInfo[0]?.phone,
            email: currentUser.email,
            linkedin: userData.linkedin,
            github: userData.github,
          });
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (currentUser?.email) {
      fetchResumeOrUserData(currentUser.email);
    }
  }, [currentUser?.email]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLanguageInputChange = (e) => {
    const value = e.target.value;
    setLanguageInput(value);

    if (value) {
      const suggestions = languageList.filter((lang) =>
        lang.toLowerCase().startsWith(value.toLowerCase())
      );
      setLanguageSuggestions(suggestions);
    } else {
      setLanguageSuggestions([]);
    }
  };

  const handleLanguageSelect = (language) => {
    if (!selectedLanguages.includes(language)) {
      setSelectedLanguages([...selectedLanguages, language]);
    }
    setLanguageInput("");
    setLanguageSuggestions([]);
  };

  const handleSkillInputChange = (e) => {
    const value = e.target.value;
    setSkillInput(value);

    if (value.length > 0) {
      const filteredSkills = predefinedSkills.filter((skill) =>
        skill.toLowerCase().includes(value.toLowerCase())
      );
      setSkillSuggestions(filteredSkills);
    } else {
      setSkillSuggestions([]);
    }
  };

  const handleSkillSelect = (skill) => {
    setFormData({
      ...formData,
      skills: [...formData.skills, skill],
    });
    setSkillInput("");
    setSkillSuggestions([]);
  };

  const handleExperienceChange = (index, e) => {
    const updatedExperiences = [...formData.experiences];
    updatedExperiences[index][e.target.name] = e.target.value;
    setFormData({ ...formData, experiences: updatedExperiences });
  };

  const handleAddExperience = () => {
    setFormData({
      ...formData,
      experiences: [
        ...formData.experiences,
        {
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  };

  const handleProjectChange = (index, e) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][e.target.name] = e.target.value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  const handleAddProject = () => {
    if (formData.projects.length < 3) {
      setFormData({
        ...formData,
        projects: [
          ...formData.projects,
          { title: "", link: "", description: "", technologies: "" },
        ],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        ...formData,
        languages: selectedLanguages,
        name: currentUser.displayName,
      };

      const response = await axiosSecure.post(
        "/createOrUpdateResume",
        updatedFormData
      );

      toast.success("Resume Informations Updated");
    } catch (error) {
      toast.error("Failed Saving Resume Information");
    }
  };

  return (
    <div className="resume-form mb-8 text-sm ">
      <h2 className="text-lg mb-8 text-center font-bold">Resume Builder</h2>

      <form onSubmit={handleSubmit}>
        <div className="border p-6 rounded-md  shadow-md mb-4 ">
          <h2 className="font-bold text-xl mb-4">Personal Info</h2>

          <div className="flex lg:flex-row flex-col justify-between w-full gap-4">
            <div className="w-full">
              <label htmlFor="name" className="block mt-2">
                Name:
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={currentUser?.displayName}
                onChange={handleChange}
                disabled
                className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
              />
            </div>
            <div className="w-full">
              <label htmlFor="email" className="block mt-2">
                Email:
              </label>
              <input
                id="email"
                type="text"
                name="email"
                value={currentUser?.email}
                onChange={handleChange}
                disabled
                className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
              />
            </div>

            <div className="w-full">
              <label htmlFor="phone" className="block mt-2">
                Phone:
              </label>
              <input
                id="phone"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
              />
            </div>
          </div>

          <div className="flex lg:flex-row flex-col justify-between w-full gap-4">
            <div className="w-full">
              <label htmlFor="linkedin" className="block mt-2">
                LinkedIn:
              </label>
              <input
                id="linkedin"
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
              />
            </div>

            <div className="w-full">
              <label htmlFor="github" className="block mt-2">
                GitHub:
              </label>
              <input
                id="github"
                type="text"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
              />
            </div>
          </div>
        </div>
        <div className=" border p-6 rounded-md  shadow-md mb-4">
          <h3 className=" font-bold text-xl">Summary & Skills</h3>
          <div className="flex lg:flex-row flex-col justify-between w-full gap-4 ">
            <div className=" w-full">
              <label htmlFor="objective" className="block mt-2">
                Objective:
              </label>
              <textarea
                id="objective"
                name="objective"
                value={formData.objective}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
              ></textarea>
            </div>

            <div className="w-full flex flex-col">
              <label htmlFor="skills" className="block mt-2">
                Skills:
              </label>
              <input
                id="skills"
                type="text"
                value={skillInput}
                placeholder="Type a skill..."
                onChange={handleSkillInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 mb-2"
              />
              {skillSuggestions.length > 0 && (
                <ul className="suggestions list-none p-0 my-1 bg-gray-100 border border-gray-300 max-h-24 overflow-y-auto rounded z-10 absolute">
                  {skillSuggestions.map((skill, index) => (
                    <li
                      key={index}
                      onClick={() => handleSkillSelect(skill)}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              )}

              <div className="selected-skills mt-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-500 text-white px-3 py-1 mr-2 mb-2 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border p-6 rounded-md   shadow-md mb-4">
          <h3 className=" font-bold text-xl">Experience</h3>

          {formData.experiences.map((experience, index) => (
            <div key={index} className="mb-4">
              <div className="flex lg:flex-row flex-col justify-between w-full gap-4">
                <div className="w-full">
                  <label htmlFor="jobTitle" className="block mt-2">
                    Job Position/Title:
                  </label>
                  <input
                    id="jobTitle"
                    type="text"
                    name="jobTitle"
                    value={experience.jobTitle}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="w-full p-2 border border-gray-300 rounded mt-1 mb-2"
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="company" className="block mt-2">
                    Company:
                  </label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    value={experience.company}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="w-full p-2 border border-gray-300 rounded mt-1 mb-2"
                  />
                </div>
              </div>

              <div className="flex lg:flex-row flex-col justify-between w-full gap-4">
                <div className="w-full">
                  <label htmlFor="date1" className="block mt-2">
                    Start Date:
                  </label>
                  <input
                    id="date1"
                    type="date"
                    name="startDate"
                    value={experience.startDate}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="w-full p-2 border border-gray-300 rounded mt-1 mb-2"
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="date2" className="block mt-2">
                    End Date:
                  </label>
                  <input
                    id="date2"
                    type="date"
                    name="endDate"
                    value={experience.endDate}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="w-full p-2 border border-gray-300 rounded mt-1 mb-2"
                  />
                </div>
              </div>

              <label htmlFor="description" className="block mt-2">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={experience.description}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
              ></textarea>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddExperience}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Experience
          </button>
        </div>
        <div className="border p-6 rounded-md   shadow-md mb-4">
          <h3 className="font-bold text-xl">Projects</h3>

          {formData.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h4 className="font-semibold">Project {index + 1}</h4>

              <label className="block mt-2">Project Title:</label>
              <input
                type="text"
                name="title"
                value={project.title}
                onChange={(e) => handleProjectChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded mt-1 mb-2"
              />

              <label className="block mt-2">Project Link:</label>
              <input
                type="text"
                name="link"
                value={project.link}
                onChange={(e) => handleProjectChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded mt-1 mb-2"
              />

              <label className="block mt-2">Description:</label>
              <textarea
                name="description"
                value={project.description}
                onChange={(e) => handleProjectChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded mt-1 mb-2"
              ></textarea>

              <label className="block mt-2">Technologies Used:</label>
              <input
                type="text"
                name="technologies"
                value={project.technologies}
                onChange={(e) => handleProjectChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddProject}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Project
          </button>
        </div>
        <div className="border p-6 rounded-md   shadow-md mb-4">
          <h3 className="font-bold text-xl">Education</h3>

          <label className="block mt-2">Year of Graduation:</label>
          <input
            type="text"
            name="educationYear"
            value={formData.educationYear}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
          />
        </div>
        <div className="border p-6 rounded-md shadow-md mb-12">
          <label className="block mt-2 text-xl">Languages:</label>
          <input
            type="text"
            value={languageInput}
            placeholder="Type a language..."
            onChange={handleLanguageInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 mb-2"
          />

          {languageSuggestions.length > 0 && (
            <ul className="suggestions list-none p-0 my-1 bg-white border border-gray-300 w-64 max-h-64 overflow-y-auto rounded z-10 absolute">
              {languageSuggestions.map((language, index) => (
                <li
                  key={index}
                  onClick={() => handleLanguageSelect(language)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {language}
                </li>
              ))}
            </ul>
          )}

          <div className="selected-languages mt-2">
            {selectedLanguages.map((language, index) => (
              <span
                key={index}
                className="inline-block bg-blue-500 text-white px-3 py-1 mr-2 mb-2 rounded-full"
              >
                {language}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Generate Resume
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeForm;
