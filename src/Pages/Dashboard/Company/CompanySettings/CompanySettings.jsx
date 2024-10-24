import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { LuUser2, LuUserCircle2 } from "react-icons/lu";
import { GoGlobe } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import CompanyInfo from "./Tabs/CompanyInfo/CompanyInfo";
import FoundingInfo from "./Tabs/FoundingInfo/FoundingInfo";
import SocialMediaProfile from "./Tabs/SocialMediaProfile/SocialMediaProfile";
import AccountSetting from "./Tabs/AccountSetting/AccountSetting";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { Helmet } from "react-helmet";

const CompanySettings = () => {
  const { t } = useTranslation(); // Destructure useTranslation
  const [tabIndex, setTabIndex] = useState(0);
  
  return (
    <div>
       <Helmet>
        <title>Jobify - Company Settings</title>
      </Helmet>
      <h2 className="font-bold">{t("settings")}</h2> {/* Wrapped string */}
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>
            <div className="flex items-center gap-2">
              <LuUser2 /> {t("company_info")} {/* Wrapped string */}
            </div>
          </Tab>
          <Tab>
            <div className="flex items-center gap-2">
              <LuUserCircle2 /> {t("founding_info")} {/* Wrapped string */}
            </div>
          </Tab>
          <Tab>
            <div className="flex items-center gap-2">
              <GoGlobe /> {t("social_media_profile")} {/* Wrapped string */}
            </div>
          </Tab>
          <Tab>
            <div className="flex items-center gap-2">
              <IoSettingsOutline /> {t("account_setting")} {/* Wrapped string */}
            </div>
          </Tab>
        </TabList>
        <TabPanel>
          <CompanyInfo />
        </TabPanel>
        <TabPanel>
          <FoundingInfo />
        </TabPanel>
        <TabPanel>
          <SocialMediaProfile />
        </TabPanel>
        <TabPanel>
          <AccountSetting />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default CompanySettings;
