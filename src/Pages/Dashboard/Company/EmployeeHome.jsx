import { useEffect, useState } from "react";
import ButtonWithIcon from "../../../Shared/ButtonWithIcon";
import { useSelector } from "react-redux";
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Importing useTranslation

const EmployeeHome = () => {
  const { t } = useTranslation(); // Destructuring t from useTranslation
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
        // console.error("Error fetching job counts:", error);
      }
    };

    if (currentUser?.email) {
      fetchJobCounts();
    }
  }, [currentUser?.email]);

  return (
    <>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          {t("hello_user", {
            name: currentUser?.displayName || currentUser?.name,
          })}
        </h2>
        <p className="text-sm">{t("daily_activities_alerts")}</p>
        <div className="flex justify-between gap-8">
          <div className="bg-blue-100 shadow-md rounded-lg p-4 mt-4 w-full">
            <h3 className="text-lg font-semibold">{t("applied_jobs")}</h3>
            <p className="text-sm">
              {t("count")}: {appliedJobsCount}
            </p>
          </div>
          <div className="bg-green-100 shadow-md rounded-lg p-4 mt-4 w-full ">
            <h3 className="text-lg font-semibold">{t("favorite_jobs")}</h3>
            <p className="text-sm">
              {t("count")}: {favoriteJobsCount}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center bg-[#5f8794] p-8 rounded-lg mt-6">
        <div className="flex items-center gap-6">
          <img
            className="size-[64px] rounded-full"
            src={currentUser?.photoURL}
            alt=""
          />
          <div className="text-white">
            <h2 className="text-xl font-semibold">{t("complete_profile")}</h2>
            <p>{t("complete_profile_description")}</p>
          </div>
        </div>
        <Link to="/jobSeeker/employee-settings">
          <button>
            <ButtonWithIcon
              btnName={t("edit_profile")}
              customStyle={"text-[#E05151] bg-white"}
            />
          </button>
        </Link>
      </div>
    </>
  );
};

export default EmployeeHome;
