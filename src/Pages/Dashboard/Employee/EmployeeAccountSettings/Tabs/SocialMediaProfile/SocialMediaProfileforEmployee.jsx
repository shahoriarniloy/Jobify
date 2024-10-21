import { useState, Fragment } from "react";
import { useTranslation } from "react-i18next"; // Importing useTranslation
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaSnapchat,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react"; // Ensure you have these imports
import { MdAddCircleOutline, MdOutlineCancel } from "react-icons/md";

const SocialMediaProfileForEmployee = ({ socialLinks, setSocialLinks }) => {
  const { t } = useTranslation(); // Destructuring t from useTranslation

  const socialOptions = [
    { name: t("facebook"), icon: <FaFacebook />, value: "facebook" },
    { name: t("twitter"), icon: <FaTwitter />, value: "twitter" },
    { name: t("instagram"), icon: <FaInstagram />, value: "instagram" },
    { name: t("linkedin"), icon: <FaLinkedin />, value: "linkedin" },
    { name: t("youtube"), icon: <FaYoutube />, value: "youtube" },
    { name: t("pinterest"), icon: <FaPinterest />, value: "pinterest" },
    { name: t("snapchat"), icon: <FaSnapchat />, value: "snapchat" },
    { name: t("tiktok"), icon: <FaTiktok />, value: "tiktok" },
  ];

  const [fields, setFields] = useState([{ socialMedia: "", link: "" }]);

  // Add new input field
  const addField = () => {
    if (fields.length < socialOptions.length) {
      setFields([...fields, { socialMedia: "", link: "" }]);
    }
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

  // Handle save changes
  const handleSaveChanges = () => {
    setSocialLinks(fields);
  };

  return (
    <div className="p-4 md:p-8">
      <form>
        <h3 className="text-lg font-medium mb-2">{t("your_social_media_profile")}</h3>
        {fields.map((field, index) => (
          <div key={index} className="flex items-center mb-3">
            <Listbox
              value={field.socialMedia}
              onChange={(value) => handleSelectChange(index, value)}
            >
              <div className="relative w-1/3">
                <ListboxButton className="relative w-full h-10 pl-10 pr-10 text-left bg-white rounded-lg cursor-default focus:outline-none">
                  <span className="block text-sm truncate">
                    {field.socialMedia
                      ? socialOptions.find(
                          (option) => option.value === field.socialMedia
                        )?.name
                      : t("select_social_media")}
                  </span>
                </ListboxButton>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <ListboxOptions className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    {socialOptions
                      .filter(
                        (option) =>
                          !fields.some(
                            (field) => field.socialMedia === option.value
                          ) || option.value === field.socialMedia
                      )
                      .map((option) => (
                        <ListboxOption
                          key={option.value}
                          className={({ active }) =>
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${
                              active
                                ? "text-blue-900 bg-blue-100"
                                : "text-gray-900"
                            }`
                          }
                          value={option.value}
                        >
                          {({ selected }) => (
                            <div className="flex items-center">
                              <span className="mr-2">{option.icon}</span>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {option.name}
                              </span>
                            </div>
                          )}
                        </ListboxOption>
                      ))}
                  </ListboxOptions>
                </Transition>
              </div>
            </Listbox>

            <input
              type="url"
              placeholder={t("profile_link_placeholder")}
              className="h-10 p-2 w-2/3 ml-2 border rounded"
              value={field.link}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            <button
              type="button"
              className="ml-2 text-xl bg-gray-100 p-2 rounded hover:bg-red-500 hover:text-white"
              onClick={() => removeField(index)}
            >
              <MdOutlineCancel />
            </button>
          </div>
        ))}

        <div className="flex items-center gap-5 mt-7">
          <button
            type="button"
            className={`flex items-center text-sm justify-center gap-2 font-semibold px-2 py-4 rounded w-full ${
              fields.length === socialOptions.length
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-100 hover:bg-blue-500 hover:text-white"
            }`}
            onClick={addField}
            disabled={fields.length === socialOptions.length}
          >
            <MdAddCircleOutline />
            {t("add_new_social_link")}
          </button>

          <button
            type="button"
            className="btn btn-outline hover:border-none hover:bg-blue-500 hover:text-white rounded-lg w-full md:w-auto"
            onClick={handleSaveChanges}
          >
            {t("save_changes")}
          </button>
        </div>
      </form>

      {/* Display all submitted links */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold">{t("submitted_social_links")}:</h3>
        <ul>
          {socialLinks.map((field, index) => (
            <li key={index} className="flex items-center">
              {field.socialMedia && (
                <span className="mr-2">
                  {
                    socialOptions.find(
                      (option) => option.value === field.socialMedia
                    )?.icon
                  }
                </span>
              )}
              <span>
                {field.socialMedia}: {field.link}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SocialMediaProfileForEmployee;
