import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaPinterest,
  FaSnapchat,
  FaTiktok,
} from "react-icons/fa";

// Social media options with icons
const socialOptions = [
  { name: "Facebook", icon: <FaFacebook />, value: "facebook" },
  { name: "Twitter", icon: <FaTwitter />, value: "twitter" },
  { name: "Instagram", icon: <FaInstagram />, value: "instagram" },
  { name: "LinkedIn", icon: <FaLinkedin />, value: "linkedin" },
  { name: "YouTube", icon: <FaYoutube />, value: "youtube" },
  { name: "Pinterest", icon: <FaPinterest />, value: "pinterest" },
  { name: "Snapchat", icon: <FaSnapchat />, value: "snapchat" },
  { name: "TikTok", icon: <FaTiktok />, value: "tiktok" },
];

const SocialMediaProfile = () => {
  const [fields, setFields] = useState([{ socialMedia: "", link: "" }]);

  // Add new input field
  const addField = () => {
    setFields([...fields, { socialMedia: "", link: "" }]);
  };

  // Remove input field
  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  // Handle dropdown selection change
  const handleSelectChange = (index, value) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, socialMedia: value } : field
    );
    setFields(updatedFields);
  };

  // Handle input change (link)
  const handleInputChange = (index, value) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, link: value } : field
    );
    setFields(updatedFields);
  };

  // Get options for each dropdown (hide already selected options)
  const getAvailableOptions = (selectedSocialMedia) => {
    return socialOptions.filter(
      (option) =>
        !fields.some(
          (field) =>
            field.socialMedia === option.value &&
            field.socialMedia !== selectedSocialMedia
        )
    );
  };

  return (
    <div>
      <form action="">
        {fields.map((field, index) => (
          <div key={index}>
            <label htmlFor={`Social Link ${index + 1}`}>{`Social Link ${
              index + 1
            }`}</label>
            <div className="flex justify-between items-center my-2">
              <div className="flex items-center border rounded w-full">
                {/* Dropdown Menu */}
                <select
                  className="h-10 p-2 border-none"
                  value={field.socialMedia}
                  onChange={(e) => handleSelectChange(index, e.target.value)}
                >
                  <option value="">Select Social Media</option>
                  {getAvailableOptions(field.socialMedia).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <div className="border-l-2 border-gray-300 h-5"></div>

                {/* URL Input Field */}
                <input
                  type="url"
                  placeholder="Profile link/url..."
                  className="h-10 p-2 w-full"
                  value={field.link}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              </div>

              {/* Cancel/Remove Button */}
              <button
                type="button"
                className="ml-3 text-xl bg-gray-100 p-3 rounded hover:bg-red-500 hover:text-white"
                onClick={() => removeField(index)}
              >
                <MdOutlineCancel />
              </button>
            </div>
          </div>
        ))}

        {/* Add new social link button */}
        <button
          type="button"
          className="mt-4 bg-blue-500 text-white p-2 rounded"
          onClick={addField}
        >
          Add New Social Link
        </button>

        {/* Save button */}
        <button
          type="button"
          className="mt-4 bg-green-500 text-white p-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default SocialMediaProfile;
