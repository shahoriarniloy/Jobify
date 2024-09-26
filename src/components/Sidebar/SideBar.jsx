import { IoMdAddCircleOutline } from "react-icons/io";
import { PiHandbagSimpleLight } from "react-icons/pi";
import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <div>
            <aside className="w-64 h-full bg-white border-r border-gray-300">
                <ul className="p-5 space-y-4">
                    <li className="py-2 px-4 hover:bg-blue-100 hover:text-blue-600 text-gray-600 rounded flex items-center">
                        <Link to='postJob' className="flex items-center">
                            <span className="mr-2">
                                <IoMdAddCircleOutline />
                            </span>
                            Post a Job
                        </Link>
                    </li>
                    <li className="py-2 px-4 hover:bg-blue-100 hover:text-blue-600 text-gray-600 rounded flex items-center">
                        <Link to='myJob' className="flex items-center">
                            <span className="mr-2">
                                <PiHandbagSimpleLight />
                            </span>
                            My Jobs
                        </Link>
                    </li>
                </ul>
            </aside>
        </div>
    );
};

export default SideBar;
