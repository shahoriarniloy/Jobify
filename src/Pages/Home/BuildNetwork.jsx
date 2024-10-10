import { FaUserPlus, FaUsers } from "react-icons/fa";

const BuildNetwork = () => {
  return (
    <div className="py-16 ">
      <div className=" ">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-8">
          Build Your Network
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center ">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#0a65cc] text-white">
              <FaUserPlus className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              Find People
            </h3>
            <p className="text-gray-600 text-center mt-2">
              Connect with like-minded professionals and expand your career
              opportunities.
            </p>
          </div>
          <div className="flex flex-col items-center ">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#0a65cc] text-white">
              <FaUsers className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">Follow</h3>
            <p className="text-gray-600 text-center mt-2">
              Stay updated with your connections' activities and growth in their
              careers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildNetwork;
