import { useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import ReactQuill from "react-quill";

const FoundingInfo = () => {
  const [companyVision, setCompanyVision] = useState("");
  const [website, setWebsite] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [industryType, setIndustryType] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [establishmentYear, setEstablishmentYear] = useState("");

  const handleCompanyVision = (value) => {
    setCompanyVision(value);
  };

  const handleLinkPicker = () => {
    const userInput = window.prompt("Enter the website URL:");
    if (userInput) {
      setWebsite(userInput);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Extract plain text from companyVision
    const companyVisionText = companyVision.replace(/<[^>]*>/g, ""); // Strip HTML tags

    // console.log({
    //   organizationType,
    //   industryType,
    //   teamSize,
    //   establishmentYear,
    //   website,
    //   companyVisionText,
    // });
  };

  return (
    <div className="p-4 md:p-8">
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Organization Type */}
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

          {/* Industry Types */}
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
              <option value="Industry 1">Industry 1</option>
              <option value="Industry 2">Industry 2</option>
            </select>
          </div>

          {/* Team Size */}
          <div>
            <label htmlFor="teamSize">Team Size</label>
            <input
              type="number" // Changed to number input
              name="teamSize"
              id="teamSize"
              className="border mt-2 border-gray-300 p-2 rounded w-full"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              min="1" // Optional: Set minimum value to 1
              placeholder="Enter team size..."
            />
          </div>

          {/* Year of Establishment */}
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

          {/* Company Website */}
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

        {/* Company Vision */}
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

        {/* Save Changes button */}
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
