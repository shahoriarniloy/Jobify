import { useState } from "react";
import "../../../../../../Styles/TextEditorTools/CustomReactQuill.css";
import ReactQuill from "react-quill";
import DragAndDropInput from '../../../Components/DragAndDropInput';
import PhoneInput from "react-phone-input-2";
import { TfiEmail } from "react-icons/tfi";
import SocialMediaProfileForEmployee from "../SocialMediaProfile/SocialMediaProfileforEmployee";

const UserInfo = () => {
  const [companyName, setCompanyName] = useState("");
  const [aboutUs, setAboutUs] = useState(""); // Keep the rich text here
  const [logoFile, setLogoFile] = useState(null);
  const [phone, setPhone] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const doc = new DOMParser().parseFromString(aboutUs, "text/html");
    const plainTextAboutUs = doc.body.innerText || ""; // Extract plain text

  };

  return (
    <div className="p-4 md:p-8">

      <form onSubmit={handleSubmit}>
        <section className="flex flex-col lg:flex-row lg:gap-8 gap-6 w-full items-start justify-between">
          {/* Drag and Drop Input */}
          <div className="w-full lg:flex-1">
            <DragAndDropInput
              type="logo"
              label="Upload Your Profile Photo"
              file={logoFile}
              onFileUpload={handleLogoUpload}
            />
          </div>

          {/* Phone and Email Section */}
          <div className="w-full lg:flex-1">
            {/* Phone Input */}
            <div className="flex flex-col md:my-4 w-full">
              <label htmlFor="Phone" className="text-lg font-medium mb-2">Phone</label>
              <PhoneInput
                country={"bd"}
                value={phone}
                required
                onChange={(phone) => setPhone(phone)}
                inputClass="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border rounded-md h-10 pl-12 my-2 w-full"
                buttonClass="bg-gray-50 border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                dropdownClass="absolute mt-1 w-full z-10 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col md:my-4">
              <label htmlFor="Email" className="text-lg font-medium">Email</label>
              <div className="relative">
                <TfiEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 font-bold" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="border border-gray-300 p-2 pl-10 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 my-2"
                  placeholder="Email"
                />
              </div>
            </div>
          </div>

          {/* Company Name and Map Location Section */}
          <div className="w-full lg:flex-1">
            {/* Company Name */}
            <div className="flex flex-col">
              <label htmlFor="textInput" className="text-lg font-medium mb-2">Company Name</label>
              <input
                id="textInput"
                type="text"
                value={companyName}
                onChange={handleChangeCompanyName}
                placeholder="Type here..."
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Map Location */}
            <div className="flex flex-col md:my-4">
              <label htmlFor="Map Location" className="text-lg font-medium mb-2">Map Location</label>
              <input
                type="text"
                name="location"
                id="location"
                value={""}
                required
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 my-2"
                placeholder=""
              />
            </div>
          </div>
        </section>


        <div className="flex flex-col lg:flex-row gap-6">
          <section className="mt-4 w-full lg:w-1/2">
            <h3 className="text-lg font-medium mb-2">About yourself</h3>
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
                formats={["bold", "italic", "underline", "list", "bullet", "link"]}
                className="custom-quill-editor h-[600px]"
                style={{ direction: "ltr" }}
              />
            </div>
          </section>
          <div className="w-full lg:w-1/2">
            <SocialMediaProfileForEmployee />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn bg-blue-600 text-white mt-4 md:mt-8 px-6 py-3 rounded-lg w-full md:w-auto"
          >
            Save All Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
