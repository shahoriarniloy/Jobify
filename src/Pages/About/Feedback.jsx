import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { useSelector, useDispatch } from "react-redux";

const Feedback = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [username, setUsername] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const currentUser = useSelector((state) => state.user.currentUser);

  // Fetch Reviews when component mounts and when currentPage changes
  useEffect(() => {
    const fetchReviews = async (page = 1) => {
      try {
        const response = await axiosSecure.get(`/reviews?page=${page}&limit=3`);
        setReviews(response.data.reviews);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
      } catch (error) {
        toast.error("Failed to fetch reviews.");
      }
    };
    fetchReviews(currentPage);
  }, [currentPage]);

  // Set current user's data
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.displayName || currentUser.name);
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  // Handle feedback submission
  const handleFeedbackSubmit = async () => {
    if (!rating || !feedback || !username) {
      toast.error("Please provide all required fields.");
      return;
    }

    const newReview = {
      username,
      rating,
      feedback,
      photoURL,
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/reviews", newReview);
      toast.success("Your review has been posted successfully!");
      setReviews((prevReviews) => [...prevReviews, newReview]);
      setRating(0);
      setFeedback("");
    } catch (error) {
      toast.error("Failed to post the review.");
    }
  };

  // Handle star rating selection
  const handleRate = (stars) => {
    setRating(stars === rating ? 0 : stars);
  };

  // Pagination controls
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-12 lg:mt-36 mt-16">
        Feedback
      </h1>

      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6">
        <div className="p-8 shadow-sm rounded-xl bg-white">
          <h3>Your Rating:</h3>
          <div className="flex flex-col py-4 space-y-3 h-36">
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((stars) => (
                <button
                  key={stars}
                  type="button"
                  onClick={() => handleRate(stars)}
                  className="w-8 h-8 text-blue-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill={stars <= rating ? "currentColor" : "none"}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-3/4 rounded-md p-2 focus:ring focus:ring-opacity-75 dark:text-gray-700 focus:ring-violet-600 dark:border-gray-300 mb-4"
            required
          />
          <textarea
            rows="3"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback"
            className="w-full rounded-md p-2 focus:ring focus:ring-opacity-75 dark:text-gray-700 focus:ring-violet-600 dark:border-gray-300"
            required
          ></textarea>
          <button
            type="button"
            onClick={handleFeedbackSubmit}
            className="py-4 mt-8 text-white font-semibold rounded-md bg-gradient-to-r from-blue-500 to-blue-700 w-full"
          >
            Leave feedback
          </button>
        </div>

        <div>
          <div className="grid grid-cols-1">
            {reviews.map((review, index) => (
              <div key={index} className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="User Avatar"
                      src={
                        review.photoURL ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                </div>
                <div className="chat-bubble bg-white text-black w-full">
                  <h3 className="font-bold">{review.username}</h3>
                  <p>{review.feedback}</p>
                  <div className="flex mt-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="blue"
                        className="w-5 h-5"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center mt-8">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              <FaArrowLeft />
            </button>

            <span className="mx-4">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
