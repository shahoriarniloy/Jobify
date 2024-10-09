import axiosSecure from "../../Hooks/UseAxiosSecure";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { useEffect, useState } from "react";
import DashboardLoader from "../../Shared/DashboardLoader";
import { Link } from "react-router-dom";

const JobSeekerCard = ({ jobSeeker }) => {
  const { currentUser } = useCurrentUser();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const response = await axiosSecure.get(
          `/check-follow-status?followerEmail=${currentUser?.email}&followedEmail=${jobSeeker.email}`
        );
        // console.log("Follow status response:", response.data);
        setIsFollowing(response.data.hasFollowed);
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking follow status:", error);
        setIsLoading(false);
      }
    };

    if (currentUser?.email && jobSeeker.email) {
      checkFollowStatus();
    }
  }, [currentUser, jobSeeker.email]);

  const handleFollowToggle = async () => {
    try {
      const followedEmail = jobSeeker.email;
      const followerEmail = currentUser?.email;

      if (isFollowing) {
        await axiosSecure.delete("/unfollow-job-seeker", {
          data: {
            followerEmail,
            followedEmail,
          },
        });
        setIsFollowing(false);
      } else {
        await axiosSecure.post("/follow-job-seeker", {
          followerEmail,
          followedEmail,
        });
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Error following/unfollowing job seeker:", error);
    }
  };

  if (isLoading) {
    return <DashboardLoader />;
  }
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
      <div className="flex justify-end px-4 pt-4">
        <button className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5">
          <span className="sr-only">Open dropdown</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 3">
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={jobSeeker.photoURL}
          alt={jobSeeker.name}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900">
          {jobSeeker.name}
        </h5>
        <div className="flex mt-4 md:mt-6">
          <button
            onClick={handleFollowToggle}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none ${
              isFollowing
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
          <Link
            to={`/messages/${jobSeeker.email}`}
            className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
          >
            Message
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerCard;
