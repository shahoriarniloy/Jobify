import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { LuUser2, LuUserCircle2 } from "react-icons/lu";
import { GoGlobe } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import SocialMediaProfile from "./Tabs/SocialMediaProfile/SocialMediaProfile";
import AccountSetting from "./Tabs/AccountSetting/AccountSetting";
import UserInfo from "./Tabs/UserInfo/UserInfo";
import CareerInfo from "./Tabs/CareerInfo/CareerInfo";


const EmployeeSettings = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <div>
      <h2 className="font-bold mb-4">Settings</h2>
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
          <UserInfo />
        </TabPanel>
        <TabPanel>
          <CareerInfo />
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

export default EmployeeSettings;