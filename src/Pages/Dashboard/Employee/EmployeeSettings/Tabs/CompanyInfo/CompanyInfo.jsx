import { useState } from "react";
import DragAndDropInput from "../../../Components/DragAndDropInput";
import "../../../../../../Styles/TextEditorTools/CustomReactQuill.css";
import ReactQuill from "react-quill";

const CompanyInfo = () => {
  const [companyName, setCompanyName] = useState("");
  const [aboutUs, setAboutUs] = useState(""); // Keep the rich text here
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const handleChangeCompanyName = (e) => {
    setCompanyName(e.target.value);
  };

  // Store rich text value in state
  const handleAboutUsChange = (value) => {
    setAboutUs(value); // Keep rich text format
  };

  const handleLogoUpload = (file) => {
    setLogoFile(file);
  };

  const handleBannerUpload = (file) => {
    setBannerFile(file);
  };

  // Convert rich text to plain text only when submitting the form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert rich text to plain text during submission
    const doc = new DOMParser().parseFromString(aboutUs, "text/html");
    const plainTextAboutUs = doc.body.innerText || ""; // Extract plain text

    console.log("Company Name:", companyName);
    console.log("About Us (Plain Text):", plainTextAboutUs); // Log the plain text
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
              value={aboutUs} // Keep rich text in state
              onChange={handleAboutUsChange} // Update with rich text
              placeholder="Write down your biography here. Let the employers know who you are..."
              modules={{
                toolbar: [
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link"],
                ],
              }}
              formats={["bold", "italic", "underline", "list", "bullet", "link"]} // Enable formats
              className="custom-quill-editor"
              style={{ direction: "ltr" }} // Force left-to-right (LTR) direction
            />
          </div>
        </section>

        <button type="submit" className="btn bg-blue-600 text-white md:mt-8">Save Change</button>
      </form>
    </div>
  );
};

export default CompanyInfo;
