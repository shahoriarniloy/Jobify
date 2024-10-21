import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiArrowRight } from "react-icons/ti";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import { useTranslation } from "react-i18next";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import ButtonLoader from "../../../Shared/ButtonLoader";

const Register = ({ setLoginModalOpen, setSignUpModalOpen }) => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const accountType = selectedIndex === 0 ? t("job_seeker") : t("employer");
  const { createUser, loading, setLoading } = useCurrentUser();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    // for employee
    if (accountType == "Job Seeker") {
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;
      createUser(email, password)
        .then(res => {
          toast.success("Account creation successful");
          setSignUpModalOpen(false);
        })
        .catch(err => {
          toast.error(err);


        })

    }

    // for company
    else if (accountType == "Employer") {
      const companyEmail = form.companyEmail.value;
      const companyName = form.companyName.value;

      createUser(companyEmail, companyName)
        .then(res => {
          toast.success("Account creation successful");
          setSignUpModalOpen(false);
        })
        .catch(err => {
          toast.error(err);


        })
    }
    setLoading(false);


  };

  return (
    <div className="bg-white flex justify-center w-[400px] max-w-2xl">
      <div className="w-full p-7">
        <h2 className="text-4xl font-semibold text-center">{t("create_account")}</h2>

        <form className="mt-8" onSubmit={handleRegister}>
          <Tabs
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index)}
          >
            <div className="flex items-center justify-between">
              <p className="text-[#0A65CC]">{t("your_account_type")} </p>
              <TabList className="flex space-x-4 border-b">
                <Tab
                  className={`pb-2 cursor-pointer ${selectedIndex === 0
                    ? "border-b-4"
                    : "text-gray-700"
                    }`}
                >
                  {t("employee")}
                </Tab>
                <Tab
                  className={`pb- cursor-pointer ${selectedIndex === 1
                    ? "border-b-4"
                    : "text-gray-700"
                    }`}
                >
                  {t("hr_manager")}
                </Tab>
              </TabList>
            </div>

            <TabPanel>
              <div className="flex gap-5 mt-4">
                <input
                  type="text"
                  name="name"
                  placeholder={t("full_name")}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>
              <div className="space-y-5 mt-5">
                <input
                  type="email"
                  name="email"
                  placeholder={t("email_address")}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={t("password")}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="flex gap-5 mt-4">
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>
              <div className="space-y-5 mt-5">
                <input
                  type="email"
                  name="companyEmail"
                  placeholder="Company Email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={t("password")}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </TabPanel>
          </Tabs>

          <div className="mt-6">
            <button
              disabled={loading}
              type="submit"
              className="btn w-full bg-[#0A65CC] text-white"
            >
              {loading ? <ButtonLoader /> : <>Create Now <TiArrowRight className="text-2xl" /></>}
            </button>
          </div>

        </form>

        <p className="text-xs text-center mt-3">
          {t("already_have_account")}
          <button
            className="text-blue-500 font-semibold underline"
            onClick={() => {
              setLoginModalOpen(true);
              setSignUpModalOpen(false);
            }}
          >
            {t("login.login")}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
