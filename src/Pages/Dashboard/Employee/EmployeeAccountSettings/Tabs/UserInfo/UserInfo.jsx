import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import DragAndDropInput from "../../../Components/DragAndDropInput";
import PhoneInput from "react-phone-input-2";
import { TfiEmail } from "react-icons/tfi";
import SocialMediaProfileForEmployee from "../SocialMediaProfile/SocialMediaProfileforEmployee";
import axios from "axios";
import { toast } from "react-toastify";
import axiosSecure from "../../../../../../Hooks/UseAxiosSecure";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "react-quill/dist/quill.snow.css";
import { useQuery } from "@tanstack/react-query";
import DashboardLoader from "../../../../../../Shared/DashboardLoader";
import useCurrentUser from "../../../../../../Hooks/useCurrentUser";


const UserInfo = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);
  const { currentUser } = useCurrentUser();

  const { data, isLoading } = useQuery({
    queryKey: ["load initial data for user"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${currentUser?.email}`)
      setSocialLinks(data?.userInfo[0]?.socialLinks || "");
      return data.userInfo[0];
    }
  })

  const handleAboutChange = (value) => {
    setAbout(value);
  };

  const handleLogoUpload = (file) => {
    setLogoFile(file);
  };

  const uploadImageToImgBB = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY
      }`,
      formData
    );
    return response.data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoUrl = null;
      if (logoFile) {
        photoUrl = await uploadImageToImgBB(logoFile);
      }

      const postData = {
        about,
        phone,
        photoUrl,
        socialLinks,
      };

      await axiosSecure.post("/userInfo-updating", postData);
      toast.success(t("profile_saved_successfully"));
    } catch (error) {
      // console.error("Error submitting profile:", error);
    } finally {
      setLoading(false);
    }
  };
  if (isLoading) return <DashboardLoader />
  return (
    <div className="p-4 md:p-8">
      <form onSubmit={handleSubmit}>
        <section className="flex flex-col lg:flex-row lg:gap-8 gap-6 w-full items-start justify-between">
          <div className="w-full lg:flex-1">
            <DragAndDropInput
              type="logo"
              label={t("upload_your_profile_photo")}
              file={logoFile}
              onFileUpload={handleLogoUpload}
            />
          </div>

          <div className="w-full lg:flex-1">
            <div className="flex flex-col md:my-4 w-full">
              <label htmlFor="Phone" className="text-lg font-medium mb-2">
                {t("phone")}
              </label>
              <PhoneInput
                country={"bd"}
                value={data?.phone}
                required
                onChange={(phone) => setPhone(phone)}
                inputClass="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border rounded-md h-10 pl-12 my-2 w-full"
              />
            </div>

            <div className="flex flex-col md:my-4">
              <label htmlFor="Email" className="text-lg font-medium">
                {t("email")}
              </label>
              <div className="relative">
                <TfiEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 font-bold" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={currentUser.email}
                  readOnly
                  className="border border-gray-300 p-2 pl-10 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 my-2"
                  placeholder={t("email_placeholder")}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:flex-1">
            <div className="flex flex-col">
              <label htmlFor="textInput" className="text-lg font-medium mb-2">
                {t("your_name")}
              </label>
              <input
                id="textInput"
                type="text"
                value={currentUser.displayName}
                readOnly
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-6">
          <section className="mt-4 w-full lg:w-1/2">
            <h3 className="text-lg font-medium mb-2">{t("about_yourself")}</h3>
            <div className="quill-wrapper relative border rounded-lg bg-white">
              <ReactQuill
                value={about}
                onChange={handleAboutChange}
                placeholder={t("write_down_your_biography")}
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link"],
                  ],
                }}
                formats={["bold", "italic", "underline", "list", "bullet", "link"]}
                className="custom-quill-editor h-[600px]"
              />
            </div>
          </section>

          <div className="w-full lg:w-1/2">
            <SocialMediaProfileForEmployee
              socialLinks={socialLinks}
              setSocialLinks={setSocialLinks}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn bg-blue-600 text-white mt-4 md:mt-8 px-6 py-3 rounded-lg w-full md:w-auto"
            disabled={loading}
          >
            {loading ? t("saving") : t("save_changes")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
