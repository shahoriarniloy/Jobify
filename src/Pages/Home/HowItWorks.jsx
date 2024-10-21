import {
  FaUserPlus,
  FaFileUpload,
  FaSearch,
  FaClipboardCheck,
} from "react-icons/fa";
import { SiLibreofficewriter } from "react-icons/si";
import arrow1 from "../../assets/arrow1.png";
import arrow2 from "../../assets/arrow2.png";
import { useSelector } from "react-redux";

const HowItWorks = () => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div
      className={`roboto-regular ${
        theme === "dark"
          ? "bg-gradient-to-r from-gray-800 to-slate-900 text-white"
          : "bg-secondary text-black"
      }`}
    >
      <div className="py-24 container mx-auto ">
        <h1
          className={
            theme === "dark"
              ? "text-3xl font-semibold mb-2 tracking-wider text-slate-200 text-center"
              : "text-3xl font-semibold mb-2 tracking-wider text-black text-center"
          }
        >
          How Jobify work
        </h1>
        {/* <div className="flex justify-between items-center  gap-12 text-center mt-16"> */}
        <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-4  gap-12 text-center mt-16 ">
          <div className="flex flex-col justify-center items-center max-w-xs gap-3 relative">
            <div className="p-6 rounded-full bg-white flex justify-center items-center">
              <FaUserPlus className="text-2xl text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 ">Create account</h3>
              <p className="text-gray-500">
                Creating an account allows you to unlock personalized features,
                manage your job applications, and stay updated on opportunities
                tailored just for you.
              </p>
            </div>
            <div className="absolute -right-[50%] top-0 hidden lg:block">
              <img src={arrow1} alt="" />
            </div>
          </div>

          <div
            className={
              theme === "dark"
                ? "flex flex-col justify-center items-center p-6 rounded-2xl max-w-xs gap-3 bg-slate-700 bg-opacity-50 text-slate-200"
                : "flex flex-col justify-center items-center max-w-xs gap-3 bg-white p-6 rounded-2xl"
            }
          >
            <div className="p-6 rounded-full bg-[#0A65CC] flex justify-center items-center">
              <SiLibreofficewriter className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 ">Build Resume</h3>
              <p className="text-gray-500">
                Utilize our resume builder to easily craft a professional and
                eye-catching resume that highlights your skills and experiences,
                making you stand out to potential employers.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center max-w-xs gap-3 relative">
            <div className="p-6 rounded-full bg-white flex justify-center items-center">
              <FaSearch className="text-2xl text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 ">Find suitable job</h3>
              <p className="text-gray-500">
                Explore our platform to find suitable job opportunities tailored
                to your skills and aspirations, connecting you with employers
                looking for talent like yours.
              </p>
            </div>
            <div className="absolute -right-[50%] top-0 hidden lg:block">
              <img src={arrow1} alt="" />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center max-w-xs gap-3">
            <div className="p-6 rounded-full bg-white flex justify-center items-center">
              <FaClipboardCheck className="text-2xl text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 ">Apply job</h3>
              <p className="text-gray-500">
                Apply to jobs effortlessly with our streamlined application
                process, making it easy for you to showcase your skills and land
                your dream position.
              </p>
            </div>
          </div>

          {/* arrow section */}
          <div className="absolute hidden lg:block">
            <img src={arrow2} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
