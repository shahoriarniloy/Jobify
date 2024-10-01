import { useState } from "react";
import DragAndDropInput from "../../../Components/DragAndDropInput";
import "../../../../../../Styles/TextEditorTools/CustomReactQuill.css";
import ReactQuill from "react-quill";

const CompanyInfo = () => {
  const [companyName, setCompanyName] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const handleChangeCompanyName = (e) => {
    setCompanyName(e.target.value);
  };

  const handleAboutUsChange = (e) => {
    setAboutUs(e.target.value);
  };

  const handleLogoUpload = (file) => {
    setLogoFile(file);
  };

  const handleBannerUpload = (file) => {
    setBannerFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Company Name:", companyName);
    console.log("About Us:", aboutUs);
    console.log("Logo File:", logoFile);
    console.log("Banner File:", bannerFile);
  };

  return (
    <div>
      <h2 className="font-bold mt-8 mb-2">Logo & Banner Image</h2>

      <form onSubmit={handleSubmit}>
        {/* Image Upload section */}
        <section className="flex gap-6">
          {/* Logo Upload Section */}
          <div className="w-2/6">
            <DragAndDropInput type="logo" label="Upload Logo" file={logoFile} onFileUpload={handleLogoUpload} />
            <p className="gap-2 ">
              <span className="text-gray-400">Maximum 3.5 MB</span>
            </p>
          </div>
          {/* Banner Upload Section */}
          <div className="w-full">
            <DragAndDropInput type="banner" label="Upload Banner" file={bannerFile} onFileUpload={handleBannerUpload} />
            <p className="gap-2 ">
              <span className="text-gray-400">Maximum 4.3 MB</span>
            </p>
          </div>
        </section>
        <hr className="my-2" />

        {/* Company name input */}
        <div className="flex flex-col ">
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

        {/* About us */}
        <section className="mt-2">
          <h3 className="text-lg font-medium mb-2">About us</h3>
          <div className="quill-wrapper relative border rounded-lg">
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
              className="custom-quill-editor"
            />
          </div>
        </section>

        <button type="submit" className="btn bg-blue-600 text-white md:mt-8">Save Change</button>
      </form>
    </div>
  );
};

export default CompanyInfo;
