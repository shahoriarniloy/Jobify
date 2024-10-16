import { useState, useEffect } from "react";
import axiosSecure from "../../../../Hooks/UseAxiosSecure";
import "./resume.css";
import { useSelector } from "react-redux";

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
        console.error("Error fetching user data", error);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      const response = await axiosSecure.post("/createResume", formData);
      console.log("Resume created successfully", response.data);
    } catch (error) {
      console.error("Error creating resume", error);
    }
  };

  return (
    <div className="resume-form mb-8 ">
      <h2 className="text-lg mb-8 text-center font-bold">Resume Builder</h2>

      <form onSubmit={handleSubmit}>
        <div className="border p-6 rounded-md bg-slate-100 shadow-md mb-8">
          <h2 className="font-bold text-xl mb-4">Personal Info</h2>

          <label className="block mt-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled
            className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
          />

          <label className="block mt-2">Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled
            className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
          />

          <label className="block mt-2">Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
            className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
          />

          <label className="block mt-2">LinkedIn:</label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
          />

          <label className="block mt-2">GitHub:</label>
          <input
            type="text"
            name="github"
            value={formData.github}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
          />
        </div>

        <div className="border p-6 rounded-md bg-slate-100 shadow-md mb-12 mt-12">
          <label className="block mt-2">Objective:</label>
          <textarea
            name="objective"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
          ></textarea>
        </div>

        <div className="border p-6 rounded-md bg-slate-100 shadow-md mb-12">
          <label className="block mt-2">Skills:</label>
          <input
            type="text"
            value={skillInput}
            placeholder="Type a skill..."
            onChange={handleSkillInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
          />
          {skillSuggestions.length > 0 && (
            <ul className="suggestions list-none p-0 my-1 bg-gray-100 border border-gray-300 max-h-24 overflow-y-auto rounded">
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

        <div className="border p-6 rounded-md bg-slate-100 shadow-md mb-12">
          <h3 className="mt-8 font-bold">Experience</h3>

          {formData.experiences.map((experience, index) => (
            <div key={index} className="mb-4">
              <label className="block mt-2">Job Position/Title:</label>
              <input
                type="text"
                name="jobTitle"
                value={experience.jobTitle}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded mt-1 mb-2"
              />

              <label className="block mt-2">Company:</label>
              <input
                type="text"
                name="company"
                value={experience.company}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded mt-1 mb-2"
              />

              <label className="block mt-2">Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={experience.startDate}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded mt-1 mb-2"
              />

              <label className="block mt-2">End Date:</label>
              <input
                type="date"
                name="endDate"
                value={experience.endDate}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded mt-1 mb-2"
              />

              <label className="block mt-2">Description:</label>
              <textarea
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

        <div className="border p-6 rounded-md bg-slate-100 shadow-md mb-12">
          <h3 className="font-bold">Projects</h3>

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

        <div className="border p-6 rounded-md bg-slate-100 shadow-md mb-12">
          <h3 className="font-bold">Education</h3>

          <label className="block mt-2">Year of Graduation:</label>
          <input
            type="text"
            name="educationYear"
            value={formData.educationYear}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
          />
        </div>

        <div className="border p-6 rounded-md bg-slate-100 shadow-md mb-12">
          <label className="block mt-2">Languages:</label>
          <input
            type="text"
            name="languages"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
          />
        </div>

        <button
          type="submit"
          className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate Resume
        </button>
      </form>
    </div>
  );
};

export default ResumeForm;
