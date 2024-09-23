import { CiLocationOn } from "react-icons/ci";
import { LuDot } from "react-icons/lu";

const JobCardGrid = ({ job }) => {
  const { company_name, featured, location, position, job_type, salaryRange } =
    job;
  return (
    <div>
      <div className="md:p-8 p-4 border-2 rounded-lg ">
        {/* image section */}
        <div className="flex mb-6">
          <div>
            <img className="w-14 h-14" src={company_icon} alt="icon" />
          </div>
          <div className="ml-4 items-center gap-2">
            <div className="flex items-center">
              <p className="font-semibold">{company_name}</p>{" "}
              {featured && (
                <p className="text-xs text-red-400 bg-red-100 font-semibold my-auto py-1 px-3 rounded-full ml-2">
                  Featured
                </p>
              )}
            </div>
            <div className="flex items-center gap-1 mt-2">
              <CiLocationOn className="text-gray-500 text-xl font-bold" />
              <p className="text-gray-400">{location}</p>
            </div>
          </div>
        </div>
        {/* position */}
        <div className="">
          <p className="text-lg font-semibold">{position}</p>
          <div className="flex items-center gap-1 mt-1">
            <p className="text-gray-400">{job_type}</p>
            <p className="text-gray-400">
              <LuDot />
            </p>
            <p className="text-gray-400">{salaryRange}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCardGrid;
