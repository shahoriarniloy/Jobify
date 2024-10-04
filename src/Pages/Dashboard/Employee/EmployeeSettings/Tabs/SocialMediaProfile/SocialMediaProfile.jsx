import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPlusCircle,
  FaTimes,
} from "react-icons/fa";

const socialOptions = [
  { name: "Facebook", icon: <FaFacebook /> },
  { name: "Twitter", icon: <FaTwitter /> },
  { name: "Instagram", icon: <FaInstagram /> },
  { name: "YouTube", icon: <FaYoutube /> },
];

const SocialMediaProfile = () => {
  const [socialLinks, setSocialLinks] = useState([{ platform: "", url: "" }]);

  const handleChange = (index, field, value) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index][field] = value;
    setSocialLinks(updatedLinks);
  };

  const addNewSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: "", url: "" }]);
  };

  const deleteSocialLink = (index) => {
    const updatedLinks = socialLinks.filter((_, i) => i !== index);
    setSocialLinks(updatedLinks);
  };

  const saveChanges = () => {
    console.log("Social Media Links:", socialLinks);
  };

  const selectedPlatforms = socialLinks.map((link) => link.platform);

  return (
    <div className="p-6 space-y-6 ">
      {socialLinks.map((link, index) => (
        <div key={index} className="flex items-center space-x-4">
          {/* Dropdown and label */}
          <div className="w-full space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Social Link {index + 1}
            </label>
            <div className="relative flex items-center w-full ">
              <select
                value={link.platform}
                onChange={(e) =>
                  handleChange(index, "platform", e.target.value)
                }
                className="w-1/4 h-10 flex items-center pr-10 bg-white border rounded-l-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Social Media</option>
                {socialOptions.map((option) => (
                  <option
                    key={option.name}
                    value={option.name}
                    disabled={selectedPlatforms.includes(option.name)}
                  >
                    {option.name}
                  </option>
                ))}
              </select>
              <span className="absolute left-4 text-lg ">
                {socialOptions.find((opt) => opt.name === link.platform)?.icon}
              </span>

              {/* Input for social media link */}
              <input
                type="text"
                placeholder="Profile link/url..."
                value={link.url}
                onChange={(e) => handleChange(index, "url", e.target.value)}
                className="w-3/4 h-10 px-4 py-2 bg-white border border-l-0 rounded-r-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Delete button */}
          <button
            onClick={() => deleteSocialLink(index)}
            className="px-2 py-1 text-gray-400 hover:text-red-600"
          >
            <FaTimes />
          </button>
        </div>
      ))}

      {/* Add New Social Link button - full width */}
      <button
        onClick={addNewSocialLink}
        className="flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
      >
        <FaPlusCircle className="mr-2" /> Add New Social Link
      </button>

      {/* Save Changes button - same size as old Add Social button */}
      <button
        onClick={saveChanges}
        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Save Changes
      </button>
    </div>
  );
};

export default SocialMediaProfile;
