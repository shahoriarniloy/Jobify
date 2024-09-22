import socialLogo from "../../assets/image/CompanyDetails/instagram_logo.png";
import { FaArrowRight, FaLink } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { IoBookmarkOutline } from "react-icons/io5";

const SingleJob = () => {
  return (
    <div>
      <header className="container mx-auto md:mt-28 flex justify-between">
        {/* left side */}
        <div className="flex gap-5">
          <div>
            <img className="rounded-full" src={socialLogo} alt="" />
          </div>
          <div className="items-center justify-center my-auto">
            <div className="flex ">
              <h2 className="font-bold">Senior UX Designer</h2>
              <p className="text-xs text-red-400 bg-red-100 font-semibold my-auto py-1 px-3 rounded-full ml-2">
                Featured
              </p>
              <p className="text-xs text-blue-400 bg-blue-100 font-semibold my-auto py-1 px-3 rounded-full ml-2">
                Full - time
              </p>
            </div>
            <div className="flex ">
              <p className="flex items-center gap-2 ">
                <FaLink className="text-blue-400" />
                https://instagram.com
              </p>
              <p className="flex items-center gap-2 mx-2">
                <FiPhone className="text-blue-400" />
                https://instagram.com
              </p>
              <p className="flex items-center gap-2 mx-2">
                <TfiEmail className="text-blue-400" />
                https://instagram.com
              </p>
            </div>
          </div>
        </div>

        {/* right side */}
        <div>
          <div className="flex items-center gap-3">
            <div className="p-5 bg-blue-100 rounded-md">
              <IoBookmarkOutline className="text-blue-600" />
            </div>
            <div className="items-center">
              <button className="flex items-center gap-3 px-16 py-4 rounded-md bg-blue-700 text-white ">
                Apply now <FaArrowRight />{" "}
              </button>
            </div>
          </div>
          <div className=" my-3 text-right ">Job expire in: <span className="text-red-500">asd</span></div>
        </div>
      </header>
    </div>
  );
};

export default SingleJob;
