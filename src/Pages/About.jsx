import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosSecure from '../Hooks/UseAxiosSecure'; 

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);



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
    <div className='lg:mx-24 mx-8'>
         <div className="container mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-indigo-700 fade-in">About Jobify</h1>
        </div>

        <div className='flex lg:flex-row md:flex-row flex-col mt-24'>
        <section className="mb-16 fade-in lg:w-1/2 md:w-1/2 lg:px-8">
          <h2 className="text-3xl font-semibold text-brownText mt-8">Who We Are</h2>
          <p className="mt-4 text-lg text-gray-700">
            Jobify is a cutting-edge platform designed to connect job seekers with their dream careers and help employers find the perfect candidates.
            With advanced job search filters, resume-building tools, and personalized career paths, we aim to revolutionize the hiring process.
          </p>
        </section>
        <div className="mb-12 px-8">
          <img
            className="w-full h-auto rounded-lg shadow-xl fade-in"
            src="https://i.ibb.co.com/47jqqCB/65-Mj-Ex-Mi53-MDEy-Lm4w-MDEu-Mj-TQo-S5w-Ni4y-NA.jpg"
            alt="About Jobify"
          />
        </div>

       
        </div>

        

        <section className="baseCastomize">
  <div className="container flex flex-col items-center p-4 mx-auto md:p-8">
    <h1 className="text-2xl text-brownText font-bold leading-none text-center sm:text-4xl">
      Why Choose Us?
    </h1>
    <p className="mt-4 text-lg text-center text-gray-700">
      With a team of experienced professionals, cutting-edge technology, and a
      user-centric approach, Jobify stands out as the platform of choice for
      both job seekers and employers. We constantly innovate to meet the
      changing needs of the industry.
    </p>
    <div className="flex flex-col w-full divide-y sm:flex-row sm:divide-y-0 sm:divide-x sm:px-8 lg:px-12 xl:px-32 dark:divide-gray-300 mt-6">
      <div className="flex flex-col w-full divide-y dark:divide-gray-300">
        <a
          rel="noopener noreferrer"
          href="#"
          className="flex items-center justify-center p-4 sm:py-8 lg:py-12"
        >
          Experienced Professionals
        </a>
        <a
          rel="noopener noreferrer"
          href="#"
          className="flex items-center justify-center p-4 sm:py-8 lg:py-12"
        >
          Cutting-Edge Technology
        </a>
        <a
          rel="noopener noreferrer"
          href="#"
          className="flex items-center justify-center p-4 sm:py-8 lg:py-12"
        >
          Innovation & Growth
        </a>
      </div>
      <div className="flex flex-col w-full divide-y dark:divide-gray-300">
        <a
          rel="noopener noreferrer"
          href="#"
          className="flex items-center justify-center p-4 sm:py-8 lg:py-12"
        >
          User-Centric Approach
        </a>
        <a
          rel="noopener noreferrer"
          href="#"
          className="flex items-center justify-center p-4 sm:py-8 lg:py-12"
        >
          Industry Leaders
        </a>
        <a
          rel="noopener noreferrer"
          href="#"
          className="flex items-center justify-center p-4 sm:py-8 lg:py-12"
        >
          Trusted by Top Companies
        </a>
      </div>
    </div>
  </div>
</section>

      </div>
      <h1 className="text-4xl text-center noto mt-16 font-bold leading-none text-brownText">
        Feedbacks
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 gap-2 mx-4 mt-8">
        <div className="flex flex-col p-8 shadow-sm rounded-xl lg:p-12 dark:bg-gray-50 dark:text-gray-800 mx-auto">
          <div className="w-full">
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
              className="py-4 my-8 font-semibold rounded-md dark:text-gray-50 dark:bg-violet-600 w-full"
            >
              Leave feedback
            </button>
          </div>
        </div>

        <div className="col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div
                  key={index}
                  className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md dark:divide-gray-300 dark:bg-gray-50 dark:text-gray-800"
                >
                  <div className="flex justify-between p-4">
                    <div className="flex space-x-4">
                      <img
                        src="https://i.ibb.co/v1qmfRn/836.jpg"
                        alt=""
                        className="object-cover w-12 h-12 rounded-full dark:bg-gray-500"
                      />
                      <div>
                        <h4 className="font-bold">{review.username}</h4>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 dark:text-yellow-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-5 h-5 fill-current"
                      >
                        <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                      </svg>
                      <span className="text-xl font-bold">{review.rating}</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2 text-sm dark:text-gray-600">
                    <p>{review.feedback}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-center'>No reviews available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
