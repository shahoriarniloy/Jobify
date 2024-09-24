
const SideBar = () => {
    return (
        <div>
           <aside className="w-64 h-full border-r border-gray-300">
        
            <ul className="p-5 space-y-4 ">
                <li className="py-2 px-4 hover:bg-blue-100 hover:text-blueCastomize text-gray-400 rounded">Dashboard Home</li>
                <li className="py-2 hover:bg-gray-100 rounded">Profile</li>
                <li className="py-2 hover:bg-gray-100 rounded">Settings</li>
                <li className="py-2 hover:bg-gray-100 rounded">Logout</li>
            </ul>
        </aside>
        </div>
    );
};

export default SideBar;