import { useState, useEffect } from 'react';
import axiosSecure from '../../Hooks/UseAxiosSecure';
import useCurrentUser from '../../Hooks/useCurrentUser'; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from 'prop-types';

const Bookmark = ({ jobId }) => {
  const { currentUser } = useCurrentUser(); 
  const [isBookmarked, setIsBookmarked] = useState(false); 

  useEffect(() => {
    const checkIfBookmarked = async () => {
      if (currentUser) {
        try {
          const response = await axiosSecure.get(`/bookmarks/${currentUser.email}`);
          const bookmarkedJobs = response.data.map(bookmark => bookmark.jobId);
          setIsBookmarked(bookmarkedJobs.includes(jobId));
        } catch (error) {
          // console.error('Error fetching bookmarks:', error);
        }
      }
    };
    checkIfBookmarked();
  }, [currentUser, jobId]);

  const handleBookmark = async () => {
    if (!currentUser) {
      toast.info("Please log in to bookmark jobs.");
      return;
    }

    try {
      const response = await axiosSecure.post('/bookmarks', {
        userEmail: currentUser.email, 
        jobId,
      });
      // console.log('Bookmark added:', response.data);
      toast.success('Job bookmarked successfully!');
      setIsBookmarked(true); 
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.info('Job already bookmarked.');
      } else {
        // console.error('Error adding bookmark:', error);
        toast.error('Failed to bookmark job.');
      }
    }
  };

  return (
    <button onClick={handleBookmark} style={{ color: isBookmarked ? 'blue' : 'currentColor' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 3h14a2 2 0 012 2v16l-9-4-9 4V5a2 2 0 012-2z"
        />
      </svg>
    </button>
  );
};

Bookmark.propTypes = {
  jobId: PropTypes.string.isRequired,
};

export default Bookmark;
