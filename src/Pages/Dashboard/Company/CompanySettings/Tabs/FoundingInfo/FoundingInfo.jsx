import { useState, useEffect } from "react";
import { AiOutlineLink } from "react-icons/ai";
import ReactQuill from "react-quill";
import axiosSecure from "../../../../../../Hooks/UseAxiosSecure";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const FoundingInfo = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  // State variables
  const [companyVision, setCompanyVision] = useState("");
  const [website, setWebsite] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [industryType, setIndustryType] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [establishmentYear, setEstablishmentYear] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosSecure.get(
          `/companies/${currentUser.email}`
        );
        const userData = response.data;

        if (userData) {
          setCompanyVision(userData.company_vision || "");
          setWebsite(userData.company_website || "");
          setOrganizationType(userData.company_type || "");
          setIndustryType(userData.industry || "");
          setTeamSize(userData.company_size || "");
          setEstablishmentYear(userData.founded_date || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [currentUser.email]);

  const handleCompanyVision = (value) => {
    setCompanyVision(value);
  };

  const handleLinkPicker = () => {
    const userInput = window.prompt("Enter the website URL:");
    if (userInput) {
      setWebsite(userInput);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyData = {
      organizationType,
      industryType,
      teamSize,
      establishmentYear,
      website,
      companyVision,
      email: currentUser.email,
    };

    try {
      const response = await axiosSecure.post(
        "/companyFoundingInfo",
        companyData
      );
      toast.success("Company Founding Info Saved");
    } catch (error) {
      console.error("Error saving company info:", error);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="organizationType">Organization Type</label>
            <select
              name="organizationType"
              id="organizationType"
              className="border mt-2 border-gray-300 p-2 rounded w-full"
              value={organizationType}
              onChange={(e) => setOrganizationType(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="Private">Private</option>
              <option value="Public">Public</option>
            </select>
          </div>

          <div>
            <label htmlFor="industryType">Industry Types</label>
            <select
              name="industryType"
              id="industryType"
              className="border mt-2 border-gray-300 p-2 rounded w-full"
              value={industryType}
              onChange={(e) => setIndustryType(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Automotive">Automotive</option>
              <option value="Banking">Banking</option>
              <option value="Biotechnology">Biotechnology</option>
              <option value="Construction">Construction</option>
              <option value="Education">Education</option>
              <option value="Energy">Energy</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Insurance">Insurance</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Retail">Retail</option>
              <option value="Telecommunications">Telecommunications</option>
              <option value="Transportation">Transportation</option>
              <option value="Travel and Tourism">Travel and Tourism</option>
              <option value="Pharmaceuticals">Pharmaceuticals</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Aerospace">Aerospace</option>
              <option value="Advertising">Advertising</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Construction Materials">
                Construction Materials
              </option>
              <option value="Consumer Goods">Consumer Goods</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Elder Care">Elder Care</option>
              <option value="Environmental Services">
                Environmental Services
              </option>
              <option value="Fashion">Fashion</option>
              <option value="Film and Television">Film and Television</option>
              <option value="Food and Beverage">Food and Beverage</option>
              <option value="Gaming">Gaming</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Logistics">Logistics</option>
              <option value="Marketing">Marketing</option>
              <option value="Media">Media</option>
              <option value="Mining">Mining</option>
              <option value="Music">Music</option>
              <option value="Nonprofit">Nonprofit</option>
              <option value="Public Relations">Public Relations</option>
              <option value="Research and Development">
                Research and Development
              </option>
              <option value="Social Media">Social Media</option>
              <option value="Software Development">Software Development</option>
              <option value="Sports">Sports</option>
              <option value="Television Broadcasting">
                Television Broadcasting
              </option>
              <option value="Textiles">Textiles</option>
              <option value="Transportation Services">
                Transportation Services
              </option>
              <option value="Waste Management">Waste Management</option>
            </select>
          </div>

          <div>
            <label htmlFor="teamSize">Team Size</label>
            <input
              type="number"
              name="teamSize"
              id="teamSize"
              className="border mt-2 border-gray-300 p-2 rounded w-full"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              min="1"
              placeholder="Enter team size..."
            />
          </div>

          <div>
            <label htmlFor="establishmentYear">Year of Establishment</label>
            <input
              type="date"
              name="establishmentYear"
              id="establishmentYear"
              className="border mt-2 border-gray-300 p-2 rounded w-full"
              value={establishmentYear}
              onChange={(e) => setEstablishmentYear(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="companyWebsite">Company Website</label>
            <div className="relative mt-2">
              <AiOutlineLink
                className="absolute left-2 top-2 text-gray-400 cursor-pointer hover:text-blue-500"
                size={24}
                onClick={handleLinkPicker}
              />
              <input
                type="url"
                name="companyWebsite"
                id="companyWebsite"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full pl-10"
                placeholder="Website url..."
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="companyVision">Company Vision</label>
          <div className="quill-wrapper relative border rounded-lg mt-2">
            <ReactQuill
              value={companyVision}
              onChange={handleCompanyVision}
              placeholder="Write down your biography here. Let the employers know who you are..."
              modules={{
                toolbar: [
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link"],
                ],
              }}
              formats={[
                "bold",
                "italic",
                "underline",
                "list",
                "bullet",
                "link",
              ]}
              className="custom-quill-editor"
              style={{ direction: "ltr" }}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn bg-blue-600 text-white mt-4 md:mt-8 px-6 py-3 rounded-lg w-full md:w-auto"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default FoundingInfo;
