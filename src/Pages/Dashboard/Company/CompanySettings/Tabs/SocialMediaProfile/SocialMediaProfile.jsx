import { Fragment, useState, useEffect } from "react";
import { useTranslation } from "react-i18next"; // Importing useTranslation
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import {
  FaChevronDown,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaSnapchat,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { MdAddCircleOutline, MdOutlineCancel } from "react-icons/md";
import { useSelector } from "react-redux";
import axiosSecure from "../../../../../../Hooks/UseAxiosSecure";
import { toast } from "react-toastify";
import useCurrentUser from "../../../../../../Hooks/useCurrentUser";

 


const SocialMediaProfile = () => {
  const { currentUser } = useCurrentUser();
  const { t } = useTranslation(); // Destructuring t function for translation

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

  const [fields, setFields] = useState([{ socialMedia: "", link: "" }]);
  const [submittedLinks, setSubmittedLinks] = useState([]);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    const fetchSocialMediaLinks = async () => {
      try {
        const response = await axiosSecure.get(
          `/companies/${currentUser.email}`
        );
        const userData = response.data;

        if (userData && userData.social_media_links) {
          const newFields = Object.keys(userData.social_media_links).map(
            (key) => ({
              socialMedia: key,
              link: userData.social_media_links[key],
            })
          );
          setFields(newFields);
        }
      } catch (error) {
        // console.error("Error fetching social media links:", error);
      }
    };

    fetchSocialMediaLinks();
  }, [currentUser.email]);

  const addField = () => {
    if (fields.length < socialOptions.length) {
      setFields([...fields, { socialMedia: "", link: "" }]);
    }
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSelectChange = (index, value) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, socialMedia: value } : field
    );
    setFields(updatedFields);
  };

  const handleInputChange = (index, value) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, link: value } : field
    );
    setFields(updatedFields);
  };

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

  const handleSaveChanges = async () => {
    const socialMediaLinks = fields.reduce((acc, field) => {
      if (field.socialMedia && field.link) {
        acc[field.socialMedia] = field.link;
      }
      return acc;
    }, {});

    try {
      const response = await axiosSecure.post("/companySocialInfo", {
        email: currentUser.email,
        socialMediaLinks: socialMediaLinks,
      });

      toast.success(t("social_info_saved"));
      setSubmittedLinks(fields);
    } catch (error) {
      // console.error("Error saving links:", error);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <form>
        {fields.map((field, index) => (
          <div key={index}>
            <label htmlFor={`Social Link ${index + 1}`}>
              {t("social_link")} {index + 1}
            </label>

            <div className="flex justify-between items-center my-2 ">
              <div className="md:flex items-center border rounded w-full ">
                <Listbox
                  value={field.socialMedia}
                  onChange={(value) => handleSelectChange(index, value)}
                >
                  <div className="relative md:w-2/5 w-full">
                    <ListboxButton className={ theme === "dark"? "relative w-full h-10 pl-10 pr-10 text-left  bg-slate-900 text-slate-300   rounded-lg cursor-default focus:outline-none" : "relative w-full h-10 pl-10 pr-10 text-left bg-white rounded-lg cursor-default focus:outline-none"}>
                      <span className="block truncate">
                        {field.socialMedia
                          ? socialOptions.find(
                            (option) => option.value === field.socialMedia
                          )?.name
                          : t("select_social_media")}
                      </span>

                      {field.socialMedia && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          {
                            socialOptions.find(
                              (option) => option.value === field.socialMedia
                            )?.icon
                          }
                        </span>
                      )}

                      <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <FaChevronDown />
                      </span>
                    </ListboxButton>

                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <ListboxOptions className={theme === "dark"? "absolute w-full py-1 mt-1 overflow-auto  bg-slate-900 text-slate-300 rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none z-10" : "absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none z-10"}>
                        {getAvailableOptions(field.socialMedia).map(
                          (option) => (
                            <ListboxOption
                              key={option.value}
                              className={({ active }) =>
                                `cursor-default select-none relative py-2 pl-10 pr-4 ${active
                                  ? (theme === "dark"? "text-blue-900 bg-black" : "text-blue-900 bg-blue-100" )
                                  :  (theme === "dark"? "text-slate-300" : "text-gray-900"  )
                                }`
                              }
                              value={option.value}
                            >
                              {({ selected }) => (
                                <div className="flex items-center">
                                  <span className="mr-2">{option.icon}</span>
                                  <span
                                    className={`block truncate ${selected ? "font-medium" : "font-normal"
                                      }`}
                                  >
                                    {option.name}
                                  </span>
                                </div>
                              )}
                            </ListboxOption>
                          )
                        )}
                      </ListboxOptions>
                    </Transition>
                  </div>
                </Listbox>

                <div className="hidden md:block border-l-2 border-gray-300 h-5"></div>

                <hr className="block md:hidden border-gray-300 w-full my-2" />

                <input
                  type="url"
                  placeholder={t("profile_link_placeholder")}
                  className={theme === "dark"? "h-10 p-2 w-full  bg-slate-900 text-slate-300  " : "h-10 p-2 w-full "}
                  value={field.link}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              </div>
              <button
                type="button"
                className={theme === "dark"? "ml-3 text-xl bg-gray-700 p-3 rounded hover:bg-red-500 hover:text-white" : "ml-3 text-xl bg-gray-100 p-3 rounded hover:bg-red-500 hover:text-white"}
                onClick={() => removeField(index)}
              >
                <MdOutlineCancel />
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          className={`flex items-center justify-center gap-2 mt-4 font-semibold p-2 rounded w-full ${fields.length === socialOptions.length
              ? (theme === "dark"? "bg-gray-700 text-slate-300 cursor-not-allowed" : "bg-gray-300 text-gray-500 cursor-not-allowed") 
              : (theme === "dark"? "bg-gray-700 hover:bg-blue-500 hover:text-white" : "bg-gray-100 hover:bg-blue-500 hover:text-white")
            }`}
          onClick={addField}
          disabled={fields.length === socialOptions.length}
        >
          <MdAddCircleOutline />
          {t("add_new_social_link")}
        </button>

        <button
          type="button"
          className="btn bg-blue-600 text-white mt-4 md:mt-8 px-6 py-3 rounded-lg w-full md:w-auto"
          onClick={handleSaveChanges}
        >
          {t("save_changes")}
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">{t("submitted_social_links")}</h3>
        <ul>
          {submittedLinks.map((field, index) => (
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

export default SocialMediaProfile;
