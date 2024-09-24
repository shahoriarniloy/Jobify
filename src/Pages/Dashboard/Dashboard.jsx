
import SideBar from "../../components/Sidebar/SideBar";


const Dashboard = () => {
    return (
        <div className="flex h-screen">
            <SideBar></SideBar>
            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
                <p className="text-gray-700">Welcome to your dashboard!</p>
            </div>
        </div>
    );
};

export default Dashboard;