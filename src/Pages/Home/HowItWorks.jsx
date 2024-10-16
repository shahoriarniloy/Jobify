import {
  FaUserPlus,
  FaFileUpload,
  FaSearch,
  FaCheckCircle,
  FaComments,
  FaUserFriends,
} from "react-icons/fa";
import Marquee from "react-fast-marquee";

const HowItWorks = () => {
  const steps = [
    { icon: <FaUserPlus />, label: "Create Account" },
    { icon: <FaFileUpload />, label: "Build Resume" },
    { icon: <FaSearch />, label: "Find Suitable Job" },
    { icon: <FaCheckCircle />, label: "Apply for Job" },
    { icon: <FaComments />, label: "See Application Progress" },
    { icon: <FaUserFriends />, label: "Get Hired" },
  ];

  return (
    <div className="pt-16">
      <div className="mx-auto ">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
          How Jobify Works
        </h2>
        <Marquee>
          <div className="flex  gap-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center mb-8 sm:mx-4"
              >
                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-md">
                  <span className="text-3xl text-[#0a65cc]">{step.icon}</span>
                </div>
                <p className="mt-2 text-center text-base text-gray-700 md:text-sm">
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default HowItWorks;
