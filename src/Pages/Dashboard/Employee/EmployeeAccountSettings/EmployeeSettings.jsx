import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { LuUser2, LuUserCircle2 } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import AccountSetting from "./Tabs/AccountSetting/AccountSetting";
import UserInfo from "./Tabs/UserInfo/UserInfo";
import CareerInfo from "./Tabs/CareerInfo/CareerInfo";
import useCurrentUser from "../../../../Hooks/useCurrentUser";


const EmployeeSettings = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { currentUser } = useCurrentUser();
  return (
    <div>
      <h2 className="mb-4">Welcome <span className="font-bold">{currentUser?.displayName}</span></h2>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>
            <div className="flex items-center gap-2">
              <LuUser2 /> Your Basic Info
            </div>
          </Tab>
          <Tab>
            <div className="flex items-center gap-2">
              <LuUserCircle2 /> Founding Info
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
          <AccountSetting />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default EmployeeSettings;
