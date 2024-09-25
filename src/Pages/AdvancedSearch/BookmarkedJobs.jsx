import { useEffect, useState } from "react";
import useCurrentUser from "../../Hooks/useCurrentUser"; 
import axiosSecure from "../../Hooks/UseAxiosSecure"; 
import { FaBriefcase, FaClock, FaDollarSign, FaTrash } from 'react-icons/fa'; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookmarkedJobs = () => {
    const { currentUser } = useCurrentUser();
    const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookmarkedJobs = async () => {
            if (currentUser) {
                try {
                    const { data: bookmarks } = await axiosSecure.get(`/bookmarks/${currentUser.email}`);
                    const jobPromises = bookmarks.map(bm => axiosSecure.get(`/jobs/${bm.jobId}`));
                    const jobResponses = await Promise.all(jobPromises);
                    setBookmarkedJobs(jobResponses.map(res => res.data));
                } catch (error) {
                    console.error("Error fetching bookmarked jobs:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchBookmarkedJobs();
    }, [currentUser]);

    const handleDeleteBookmark = async (jobId) => {
        try {
            await axiosSecure.delete(`/bookmarks/${currentUser.email}/${jobId}`);
            setBookmarkedJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
            toast.success("Bookmark Deleted")
        } catch (error) {
            console.error("Error deleting bookmark:", error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="flex flex-col gap-4 pt-2">
            {bookmarkedJobs.map(job => {
                const isDeadlineExpired = new Date(job.deadline) < new Date(); 
                return (
                    <div key={job._id} className="h-fit p-6 bg-base-100 shadow-xl rounded-xl mx-24">
                        <div className="flex lg:flex-row md:flex-row flex-col justify-between items-center">
                            <div className="flex flex-col">
                                <h2 className="card-title text-2xl mb-6">{job.title}</h2>
                                <div className="flex lg:flex-row flex-col gap-4 text-xs">
                                    <div className="flex items-center">
                                        <FaBriefcase className="mr-1" /> 
                                        <p className="text-base-400">Experience: {job.experience}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <FaDollarSign className="mr-1" /> 
                                        <p className="text-base-400">Salary: {job.salaryRange}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <FaClock className="mr-1" /> 
                                        <p className="text-base-400">Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card-actions justify-end mt-6 flex items-center">
                                <button 
                                    className={`btn ${isDeadlineExpired ? 'btn-disabled' : 'btn-primary'}`} 
                                    disabled={isDeadlineExpired}
                                >
                                    {isDeadlineExpired ? 'Deadline Expired' : 'Apply Now'}
                                    {!isDeadlineExpired && (
                                        <span className="ml-2">→</span> 
                                    )}
                                </button>

                                <FaTrash 
                                    className="ml-4 text-red-500 cursor-pointer hover:text-red-700" 
                                    onClick={() => handleDeleteBookmark(job._id)} 
                                    title="Remove Bookmark"
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
            {bookmarkedJobs.length === 0 && <p>No bookmarked jobs found.</p>}
        </div>
    );
};

export default BookmarkedJobs;
