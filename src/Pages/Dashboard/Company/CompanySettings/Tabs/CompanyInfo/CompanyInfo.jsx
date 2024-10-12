import { useState } from "react";
import "../../../../../../Styles/TextEditorTools/CustomReactQuill.css";
import ReactQuill from "react-quill";
import DragAndDropInput from "../../../../Employee/Components/DragAndDropInput";
import { useSelector } from "react-redux";
import axiosSecure from "../../../../../../Hooks/UseAxiosSecure";

const CompanyInfo = () => {
  const [companyName, setCompanyName] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleChangeCompanyName = (e) => {
    setCompanyName(e.target.value);
  };

  const handleAboutUsChange = (value) => {
    setAboutUs(value);
  };

  const handleLogoUpload = (file) => {
    setLogoFile(file);
  };

  const handleBannerUpload = (file) => {
    setBannerFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const doc = new DOMParser().parseFromString(aboutUs, "text/html");
    const plainTextAboutUs = doc.body.innerText || "";

    const companyData = {
      companyName,
      aboutUs: plainTextAboutUs,
      logoFile,
      bannerFile,
      currentUserEmail: currentUser.email,
    };

    try {
      const response = await axiosSecure.post("/companyInfo", companyData);
      console.log("Company info saved:", response.data);

      setCompanyName("");
      setAboutUs("");
      setLogoFile(null);
      setBannerFile(null);
    } catch (error) {
      console.error("Error saving company info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="font-bold mt-8 mb-4 text-xl">Logo & Banner Image</h2>

      <form onSubmit={handleSubmit}>
        <section className="flex flex-col md:flex-row md:gap-6 gap-4">
          <div className="md:w-2/6 ">
            <DragAndDropInput
              type="logo"
              label="Upload Logo"
              file={logoFile}
              onFileUpload={handleLogoUpload}
            />
            <p className="text-gray-400 mt-2">Maximum 3.5 MB</p>
          </div>

          <div className="w-full">
            <DragAndDropInput
              type="banner"
              label="Upload Banner"
              file={bannerFile}
              onFileUpload={handleBannerUpload}
            />
            <p className="text-gray-400 mt-2">Maximum 4.3 MB</p>
          </div>
        </section>

        <hr className="my-4" />

        <div className="flex flex-col">
          <label htmlFor="textInput" className="text-lg font-medium mb-2">
            Company Name
          </label>
          <input
            id="textInput"
            type="text"
            value={companyName}
            onChange={handleChangeCompanyName}
            placeholder="Type here..."
            className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <section className="mt-4">
          <h3 className="text-lg font-medium mb-2">About us</h3>
          <div className="quill-wrapper relative border rounded-lg bg-white ">
            <ReactQuill
              value={aboutUs}
              onChange={handleAboutUsChange}
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
              className="custom-quill-editor "
              style={{ direction: "ltr" }}
            />
          </div>
        </section>

        <button
          type="submit"
          className={`btn bg-blue-600 text-white mt-4 md:mt-8 px-6 py-3 rounded-lg w-full md:w-auto ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default CompanyInfo;
