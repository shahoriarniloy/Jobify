import { Link } from "react-router-dom";

const RouteNotFound = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-secondary p-6">
      <div className="text-center lg:text-left mb-8 lg:mb-0 lg:mr-12">
        <h1 className="text-4xl font-bold text-gray-800">
          Opps! Page not found
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Something went wrong. It looks like the link is broken or the page is
          removed.
        </p>
        <div className="flex space-x-4 mt-6 justify-center lg:justify-start">
          <Link
            to="/"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition"
          >
            Home <span>&rarr;</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Go Back
          </button>
        </div>
      </div>

      <div className="">
        <img
          src="https://i.ibb.co.com/Q91cq61/Illustration.png"
          alt="404 Broken Robot"
          className="w-64 h-auto lg:w-80"
        />
      </div>
    </div>
  );
};

export default RouteNotFound;
