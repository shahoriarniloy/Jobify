
import { Outlet } from "react-router-dom";
import SideBar from "../../components/Sidebar/SideBar";


const Dashboard = () => {
    return (
        <div className="flex h-screen">
            <SideBar></SideBar>
            <div className="flex-1 lg:p-6 md:p-6 p-2">
                
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;