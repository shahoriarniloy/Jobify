import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { LuUser2, LuUserCircle2 } from "react-icons/lu";
import UserInfo from "./Tabs/UserInfo/UserInfo";
import CareerInfo from "./Tabs/CareerInfo/CareerInfo";
import useCurrentUser from "../../../../Hooks/useCurrentUser";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const EmployeeSettings = () => {
  const { t } = useTranslation(); // Destructure useTranslation
  const [tabIndex, setTabIndex] = useState(0);
  const { currentUser } = useCurrentUser();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div
      className={`p-4 ${
        theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-black"
      }`}
    >
      <Helmet>
        <title>Jobify - Employee Settings</title>
      </Helmet>
      <h2 className="mb-4">
        {t("welcome")}{" "}
        <span className="font-bold">{currentUser?.displayName}</span>
      </h2>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList
          className={`flex items-center gap-4 ${
            theme === "dark"
              ? "border-b border-gray-700"
              : "border-b border-gray-300"
          }`}
        >
          <Tab
            className={`pb-2 cursor-pointer ${
              selectedIndex === 0
                ? `border-b-4 border-blue-500 ${
                    theme === "dark" ? "bg-gray-800 text-white" : ""
                  }` // Active tab styles
                : "text-gray-700"
            }`}
            onClick={() => {
              setSelectedIndex(0);
              setTabIndex(0);
            }}
          >
            <div className="flex items-center gap-2">
              <LuUser2 /> {t("your_basic_info")}
            </div>
          </Tab>
          <Tab
            className={`pb-2 cursor-pointer ${
              selectedIndex === 1
                ? `border-b-4 border-blue-500 ${
                    theme === "dark" ? "bg-gray-800 text-white" : ""
                  }` // Active tab styles
                : "text-gray-700"
            }`}
            onClick={() => {
              setSelectedIndex(1);
              setTabIndex(1);
            }}
          >
            <div className="flex items-center gap-2">
              <LuUserCircle2 /> {t("education_info")}
            </div>
          </Tab>
        </TabList>

        <TabPanel>
          <UserInfo />
        </TabPanel>

        <TabPanel>
          <CareerInfo />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default EmployeeSettings;
