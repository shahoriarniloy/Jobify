
import { Outlet } from "react-router-dom";
import SideBar from "../../components/Sidebar/SideBar";


const Dashboard = () => {
    return (
        <div className="flex h-screen">
            <SideBar></SideBar>
            <div className="flex-1 p-6 ">
                
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;