import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaBriefcase, FaBuilding } from "react-icons/fa";
import { useState, useEffect } from "react";
import axiosSecure from "../../Hooks/UseAxiosSecure";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState('');
    const [totalJobs, setTotalJobs] = useState(0);
    const [totalCompanies, setTotalCompanies] = useState(0);

    useEffect(() => {
        const fetchTotals = async () => {
            try {
                const jobsResponse = await axiosSecure.get('/jobs/count');
                setTotalJobs(jobsResponse.data.totalJobs);

                const companiesResponse = await axiosSecure.get('/companies/count');
                setTotalCompanies(companiesResponse.data.totalCompanies);
            } catch (error) {
                console.error('Error fetching totals:', error);
            }
        };

        fetchTotals();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm && !location) {
            setError("Please enter something first");
            return;
        }
        setError('');
        try {
            const response = await axiosSecure.get('/jobs/search', {
                params: { searchTerm, location },
            });
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    return (
        <div className="bg-[#A7794B] min-h-screen flex justify-center items-center">
            <div className="bg-[#F8F8F8] h-80 w-[600px] flex flex-col justify-center items-center rounded-lg shadow-lg">
                <div className="mb-4 pt-8">
                    <h4 className="text-[#A7794B] text-2xl noto font-bold mb-4">Explore According to Your Preferences!</h4>
                </div>

                <form className="w-full px-10">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2">
                            <input
                                type="text"
                                placeholder="Job Name..."
                                className="bg-transparent focus:outline-none w-full"
                            />
                           
                        </div>

                        <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2">
                            <input
                                type="text"
                                placeholder="City..."
                                className="bg-transparent focus:outline-none w-full"
                            />
                           
                        </div>

                        <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2">
                            <input
                                type="text"
                                placeholder="Job Type..."
                                className="bg-transparent focus:outline-none w-full"
                            />
                            
                        </div>

                        <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2">
                            <input
                                type="text"
                                placeholder="Experience Level..."
                                className="bg-transparent focus:outline-none w-full"
                            />
                        </div>

                        <div className="col-span-2 flex items-center bg-white rounded-full shadow-md px-4 py-2">
                            <input
                                type="text"
                                placeholder="Salary Range..."
                                className="bg-transparent focus:outline-none w-full"
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <button
                            type="submit"
                            className="bg-[#A7794B] text-white rounded-full px-6 py-2 shadow-md hover:bg-[#8c6639] transition duration-200"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SearchBar;
