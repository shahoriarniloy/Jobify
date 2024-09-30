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

const EmployerSettings = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <div>
      <h2 className="font-bold">Settings</h2>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>
            <div className="flex items-center gap-2">
              <LuUser2 /> Company Info
            </div>
          </Tab>
          <Tab>
            <div className="flex items-center gap-2">
              <LuUserCircle2 /> Founding Info
            </div>
          </Tab>
          <Tab>
            <div className="flex items-center gap-2">
              <GoGlobe /> Social Media Profile
            </div>
          </Tab>
          <Tab>
            <div className="flex items-center gap-2">
              <IoSettingsOutline /> Account Setting
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

export default EmployerSettings;
