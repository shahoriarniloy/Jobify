import { useState, useEffect } from "react";
import { AiOutlineLink } from "react-icons/ai";
import ReactQuill from "react-quill";
import axiosSecure from "../../../../../../Hooks/UseAxiosSecure";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next"; // Import useTranslation
import useCurrentUser from "../../../../../../Hooks/useCurrentUser";

const FoundingInfo = () => {
  const { currentUser } = useCurrentUser();
  const { t } = useTranslation(); // Destructure t from useTranslation

  // State variables
  const [companyVision, setCompanyVision] = useState("");
  const [website, setWebsite] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [industryType, setIndustryType] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [establishmentYear, setEstablishmentYear] = useState("");
  const theme = useSelector((state) => state.theme.theme);

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
        // console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [currentUser.email]);

  const handleCompanyVision = (value) => {
    setCompanyVision(value);
  };

  const handleLinkPicker = () => {
    const userInput = window.prompt(t("enter_website_url"));
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
      toast.success(t("company_founding_info_saved"));
    } catch (error) {
      // console.error("Error saving company info:", error);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="organizationType">{t("organization_type")}</label>
            <select
              name="organizationType"
              id="organizationType"
              className={ theme === "dark"? "h-10 border mt-1 rounded px-4 w-full  bg-slate-900 text-slate-300 border-slate-400  p-2" : "h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"}
              value={organizationType}
              onChange={(e) => setOrganizationType(e.target.value)}
            >
              <option value="">{t("select")}</option>
              <option value="Private">{t("private")}</option>
              <option value="Public">{t("public")}</option>
            </select>
          </div>

          <div>
            <label htmlFor="industryType">{t("industry_type_label")}</label>
            <select
              name="industryType"
              id="industryType"
              className={ theme === "dark"? "h-10 border mt-1 rounded px-4 w-full  bg-slate-900 text-slate-300 border-slate-400  p-2" : "h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"}
              value={industryType}
              onChange={(e) => setIndustryType(e.target.value)}
            >
              <option value="">{t("industry_type_select")}</option>
              <option value="Agriculture">{t("Agriculture")}</option>
              <option value="Automotive">{t("Automotive")}</option>
              <option value="Banking">{t("Banking")}</option>
              <option value="Biotechnology">{t("Biotechnology")}</option>
              <option value="Construction">{t("Construction")}</option>
              <option value="Education">{t("Education")}</option>
              <option value="Energy">{t("Energy")}</option>
              <option value="Entertainment">{t("Entertainment")}</option>
              <option value="Finance">{t("Finance")}</option>
              <option value="Healthcare">{t("Healthcare")}</option>
              <option value="Hospitality">{t("Hospitality")}</option>
              <option value="Information Technology">
                {t("Information Technology")}
              </option>
              <option value="Insurance">{t("Insurance")}</option>
              <option value="Manufacturing">{t("Manufacturing")}</option>
              <option value="Real Estate">{t("Real Estate")}</option>
              <option value="Retail">{t("Retail")}</option>
              <option value="Telecommunications">
                {t("Telecommunications")}
              </option>
              <option value="Transportation">{t("Transportation")}</option>
              <option value="Travel and Tourism">
                {t("Travel and Tourism")}
              </option>
              <option value="Pharmaceuticals">{t("Pharmaceuticals")}</option>
              <option value="E-commerce">{t("E-commerce")}</option>
              <option value="Aerospace">{t("Aerospace")}</option>
              <option value="Advertising">{t("Advertising")}</option>
              <option value="Artificial Intelligence">
                {t("Artificial Intelligence")}
              </option>
              <option value="Construction Materials">
                {t("Construction Materials")}
              </option>
              <option value="Consumer Goods">{t("Consumer Goods")}</option>
              <option value="Cybersecurity">{t("Cybersecurity")}</option>
              <option value="Elder Care">{t("Elder Care")}</option>
              <option value="Environmental Services">
                {t("Environmental Services")}
              </option>
              <option value="Fashion">{t("Fashion")}</option>
              <option value="Film and Television">
                {t("Film and Television")}
              </option>
              <option value="Food and Beverage">
                {t("Food and Beverage")}
              </option>
              <option value="Gaming">{t("Gaming")}</option>
              <option value="Human Resources">{t("Human Resources")}</option>
              <option value="Logistics">{t("Logistics")}</option>
              <option value="Marketing">{t("Marketing")}</option>
              <option value="Media">{t("Media")}</option>
              <option value="Mining">{t("Mining")}</option>
              <option value="Music">{t("Music")}</option>
              <option value="Nonprofit">{t("Nonprofit")}</option>
              <option value="Public Relations">{t("Public Relations")}</option>
              <option value="Research and Development">
                {t("Research and Development")}
              </option>
              <option value="Social Media">{t("Social Media")}</option>
              <option value="Software Development">
                {t("Software Development")}
              </option>
              <option value="Sports">{t("Sports")}</option>
              <option value="Television Broadcasting">
                {t("Television Broadcasting")}
              </option>
              <option value="Textiles">{t("Textiles")}</option>
              <option value="Transportation Services">
                {t("Transportation Services")}
              </option>
              <option value="Waste Management">{t("Waste Management")}</option>
            </select>
          </div>

          <div>
            <label htmlFor="teamSize">{t("team_size_label")}</label>
            <input
              type="number"
              name="teamSize"
              id="teamSize"
              className={ theme === "dark"? "h-10 border mt-1 rounded px-4 w-full  bg-slate-900 text-slate-300 border-slate-400  p-2" : "h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"}
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              min="1"
              placeholder={t("team_size_placeholder")}
            />
          </div>

          <div>
            <label htmlFor="establishmentYear">
              {t("establishment_year_label")}
            </label>
            <input
              type="date"
              name="establishmentYear"
              id="establishmentYear"
              className={ theme === "dark"? "h-10 border mt-1 rounded px-4 w-full  bg-slate-900 text-slate-300 border-slate-400  p-2" : "h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"}
              value={establishmentYear}
              onChange={(e) => setEstablishmentYear(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="companyWebsite">{t("company_website_label")}</label>
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
                className={ theme === "dark"? "h-10 border mt-1 rounded px-4 w-full  bg-slate-900 text-slate-300 border-slate-400  p-2" : "h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"}
                placeholder={t("company_website_placeholder")}
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="companyVision">{t("company_vision_label")}</label>
          <div className="quill-wrapper relative border rounded-lg mt-2">
            <ReactQuill
              value={companyVision}
              onChange={handleCompanyVision}
              placeholder={t("company_vision_placeholder")}
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
          {t("save_changes")}
        </button>
      </form>
    </div>
  );
};

export default FoundingInfo;
