import { useEffect, useState } from "react";
import ButtonWithIcon from "../../../Shared/ButtonWithIcon";
import { useSelector } from "react-redux";
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import { Link } from "react-router-dom";

const EmployeeHome = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [appliedJobsCount, setAppliedJobsCount] = useState(0);
  const [favoriteJobsCount, setFavoriteJobsCount] = useState(0);

  useEffect(() => {
    const fetchJobCounts = async () => {
      try {
        const response = await axiosSecure.get(
          `/getJobCountsByEmail/${currentUser?.email}`
        );
        setAppliedJobsCount(response.data.appliedJobsCount);
        setFavoriteJobsCount(response.data.favoriteJobsCount);
      } catch (error) {
        console.error("Error fetching job counts:", error);
      }
    };

    if (currentUser.email) {
      fetchJobCounts();
    }
  }, [currentUser?.email]);

  return (
    <>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          Hello, {currentUser.displayName}
        </h2>
        <p className="text-sm">Here is your daily activities and job alerts</p>
        <div className="flex justify-between gap-8">
          {" "}
          <div className="bg-blue-100 shadow-md rounded-lg p-4 mt-4 w-full">
            <h3 className="text-lg font-semibold">Applied Jobs</h3>
            <p className="text-sm">Count: {appliedJobsCount}</p>
          </div>
          <div className="bg-green-100 shadow-md rounded-lg p-4 mt-4 w-full ">
            <h3 className="text-lg font-semibold">Favorite Jobs</h3>
            <p className="text-sm">Count: {favoriteJobsCount}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center bg-[#5f8794] p-8 rounded-lg mt-6">
        <div className="flex items-center gap-6">
          <img
            className="size-[64px] rounded-full"
            src={currentUser.photoURL}
            alt=""
          />
          <div className="text-white">
            <h2 className="text-xl font-semibold">Complete your profile</h2>
            <p>Complete your profile editing & build your custom Resume</p>
          </div>
        </div>
        <Link to="/jobSeeker/employee-settings">
          <button>
            <ButtonWithIcon
              btnName={"Edit Profile"}
              customStyle={"text-[#E05151] bg-white"}
            />
          </button>
        </Link>
      </div>
    </>
  );
};

export default EmployeeHome;
