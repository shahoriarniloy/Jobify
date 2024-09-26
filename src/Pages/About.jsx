import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosSecure from '../Hooks/UseAxiosSecure'; 
import useCurrentUser from "../Hooks/useCurrentUser";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  const { currentUser } = useCurrentUser();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosSecure.get('/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError(error.message);
      }
    };

    fetchReviews();
  }, []); 

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.displayName || currentUser.name);
    }
  }, [currentUser]);

  const handleFeedbackSubmit = async () => {
    if (!rating || !feedback || !username) {
      toast.error('Please provide all required fields.');
      return;
    }

    const newReview = {
      username,
      rating,
      feedback,
    };

    try {
      const response = await axiosSecure.post('/reviews', newReview);
      console.log(response.data);
      toast.success('Your review has been posted successfully!');
      setReviews([...reviews, newReview]); 
      setRating(0);
      setFeedback('');
      setUsername('');
    } catch (error) {
      console.error('Error posting review:', error);
      toast.error('Failed to post the review.');
    }
  };

  const handleRate = (stars) => {
    setRating(stars === rating ? 0 : stars);
  };

  return (
    <div className='lg:px-56 mx-4 my-8'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        

        <div className='flex flex-col-reverse lg:flex-row gap-10'>
          <section className="lg:w-1/2 md:w-1/2 fade-in">
            <h2 className="text-3xl font-semibold text-brownText mt-8">Who We Are</h2>
            <p className="mt-4 text-lg text-gray-700">
              Jobify is a cutting-edge platform designed to connect job seekers with their dream careers and help employers find the perfect candidates.
              With advanced job search filters, resume-building tools, and personalized career paths, we aim to revolutionize the hiring process.
            </p>
          </section>
          <div className="lg:w-1/2">
            <img
              className="w-full h-auto rounded-lg shadow-xl fade-in"
              src="https://i.ibb.co.com/47jqqCB/65-Mj-Ex-Mi53-MDEy-Lm4w-MDEu-Mj-TQo-S5w-Ni4y-NA.jpg"
              alt="About Jobify"
            />
          </div>
        </div>

        <section className="baseCustomize my-16">
          <div className="container flex flex-col items-center p-4 mx-auto md:p-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-brownText font-bold leading-none text-center">
              Why Choose Us?
            </h1>
            <p className="mt-4 text-lg text-center text-gray-700">
              With a team of experienced professionals, cutting-edge technology, and a
              user-centric approach, Jobify stands out as the platform of choice for
              both job seekers and employers. We constantly innovate to meet the
              changing needs of the industry.
            </p>
            <div className="flex flex-col sm:flex-row w-full mt-6 divide-y sm:divide-x sm:divide-y-0 sm:px-6 lg:px-12 xl:px-32 dark:divide-gray-300">
              <div className="flex flex-col w-full divide-y dark:divide-gray-300">
                <a href="#" className="flex items-center justify-center p-4 sm:py-8 lg:py-12">
                  Experienced Professionals
                </a>
                <a href="#" className="flex items-center justify-center p-4 sm:py-8 lg:py-12">
                  Cutting-Edge Technology
                </a>
                <a href="#" className="flex items-center justify-center p-4 sm:py-8 lg:py-12">
                  Innovation & Growth
                </a>
              </div>
              <div className="flex flex-col w-full divide-y dark:divide-gray-300">
                <a href="#" className="flex items-center justify-center p-4 sm:py-8 lg:py-12">
                  User-Centric Approach
                </a>
                <a href="#" className="flex items-center justify-center p-4 sm:py-8 lg:py-12">
                  Industry Leaders
                </a>
                <a href="#" className="flex items-center justify-center p-4 sm:py-8 lg:py-12">
                  Trusted by Top Companies
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <h1 className="text-4xl text-center  mt-16 font-bold text-brownText">
        Feedbacks
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mx-4 mt-8">
        <div className="flex flex-col p-6 shadow-sm rounded-xl dark:bg-gray-50 dark:text-gray-800 mx-auto">
          <div className="flex flex-col items-center py-6 space-y-3">
            <div className="flex space-x-3">
              {[1, 2, 3, 4, 5].map((stars) => (
                <button
                  key={stars}
                  type="button"
                  onClick={() => handleRate(stars)}
                  className="w-10 h-10 dark:text-yellow-700"
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
            className="w-full rounded-md p-2 focus:ring focus:ring-opacity-75 dark:text-gray-700 focus:dark:ring-violet-600 dark:border-gray-300 mb-8"
            required
          />
          <textarea
            rows="3"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback"
            className="w-full rounded-md p-2 focus:ring focus:ring-opacity-75 dark:text-gray-700 focus:dark:ring-violet-600 dark:border-gray-300"
            required
          ></textarea>
          <button
            type="button"
            onClick={handleFeedbackSubmit}
            className="py-4 my-8 font-semibold rounded-md dark:text-gray-50 brownlogo w-full"
          >
            Leave feedback
          </button>
        </div>

        <div className="col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review, index) => (
              <div key={index} className="flex flex-col p-6 shadow-sm rounded-xl dark:bg-gray-50 dark:text-gray-800">
                <h3 className="text-lg font-bold">{review.username}</h3>
                <p className="mt-2">{review.feedback}</p>
                <div className="flex mt-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 text-yellow-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
