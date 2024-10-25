import { useState, useEffect } from "react";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import useCurrentUser from "../../Hooks/useCurrentUser";

import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

const Bookmark = ({ jobId }) => {
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const checkIfBookmarked = async () => {
      if (currentUser?.email) {
        try {
          const response = await axiosSecure.get(
            `/bookmarks?email=${currentUser?.email}`
          );
          const bookmarkedJobs = response.data.map(
            (bookmark) => bookmark.jobId
          );
          setIsBookmarked(bookmarkedJobs.includes(jobId));
        } catch (error) {
          // Handle error (if needed)
        }
      }
    };
    checkIfBookmarked();
  }, [currentUser, jobId]);

  const handleBookmark = async () => {
    if (!currentUser) {
      toast.info(t("please_log_in_to_bookmark_jobs"));
      return;
    }

    try {
      const response = await axiosSecure.post("/bookmarks", {
        userEmail: currentUser.email,
        jobId,
      });
      toast.success(t("job_bookmarked_successfully"));
      setIsBookmarked(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.info(t("job_already_bookmarked"));
      } else {
        toast.error(t("failed_to_bookmark_job"));
      }
    }
  };

  return (
    <button
      onClick={handleBookmark}
      style={{ color: isBookmarked ? "sky" : "currentColor" }}
    >
      {isBookmarked ? (
        <BsBookmarkFill className="w-5 h-5" />
      ) : (
        <BsBookmark className="w-5 h-5" />
      )}
    </button>
  );
};

Bookmark.propTypes = {
  jobId: PropTypes.string.isRequired,
};

export default Bookmark;
