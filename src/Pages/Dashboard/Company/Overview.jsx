import { useState, useEffect } from "react";
import ButtonWithIcon from "../../../Shared/ButtonWithIcon";
import MyJob from "../Company/MyJob";
import { useSelector } from "react-redux";
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import { Link } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineCheckCircle,
  AiOutlineFileDone,
} from "react-icons/ai";
import { BiTask } from "react-icons/bi";

const CompanyDashboard = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [company, setCompany] = useState({});
  const [jobStats, setJobStats] = useState({
    totalApplicants: 0,
    interviewsScheduled: 0,
    offersExtended: 0,
    jobsFilled: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        if (!currentUser?.email) {
          throw new Error("User not found");
        }
        setLoading(true);

        const companyResponse = await axiosSecure.get(
          `/companies/${currentUser.email}`
        );
        setCompany(companyResponse.data);

        const statsResponse = await axiosSecure.get(
          `/jobs/dashboard/company/${currentUser.email}`
        );

        const jobs = statsResponse.data;

        const totalApplicants = jobs.reduce(
          (total, job) => total + job.applicationsCount,
          0
        );
        const interviewsScheduled = jobs.reduce(
          (total, job) => total + job.statusCounts.InterviewScheduled,
          0
        );
        const offersExtended = jobs.reduce(
          (total, job) => total + job.statusCounts.Hired,
          0
        );
        const jobsFilled = jobs.reduce(
          (total, job) => total + job.statusCounts.Hired,
          0
        );

        setJobStats({
          totalApplicants,
          interviewsScheduled,
          offersExtended,
          jobsFilled,
        });
      } catch (error) {
        // console.error("Error fetching company or job data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.email) {
      fetchCompanyData();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          Hello, {company?.company_name || "Company"}
        </h2>
        <p className="text-sm">
          Here is your company overview and recent activities
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-[#9ecbe7] rounded-lg flex items-center gap-4">
          <AiOutlineUser size={32} className="text-blue-700" />
          <div>
            <h4 className="text-lg font-bold text-blue-700">
              Total Applicants
            </h4>
            <p className="text-2xl text-blue-700">{jobStats.totalApplicants}</p>
          </div>
        </div>
        <div className="p-4 bg-[#ecaaaa] rounded-lg flex items-center gap-4">
          <AiOutlineCheckCircle size={32} className="text-red-700" />
          <div>
            <h4 className="text-lg font-bold text-red-700">
              Interviews Scheduled
            </h4>
            <p className="text-2xl text-red-700">
              {jobStats.interviewsScheduled}
            </p>
          </div>
        </div>
        <div className="p-4 bg-[#c2e9ab] rounded-lg flex items-center gap-4">
          <AiOutlineFileDone size={32} className="text-green-700" />
          <div>
            <h4 className="text-lg font-bold text-green-700">
              Offers Extended
            </h4>
            <p className="text-2xl  text-green-700 ">
              {jobStats.offersExtended}
            </p>
          </div>
        </div>
        <div className="p-4 bg-[#c3b1df] rounded-lg flex items-center gap-4">
          <BiTask size={32} className="text-purple-700" />
          <div>
            <h4 className="text-lg font-bold text-purple-700 ">Jobs Filled</h4>
            <p className="text-2xl text-purple-700">{jobStats.jobsFilled}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center bg-[#7093d9] p-8 rounded-lg mt-6">
        <div className="flex items-center gap-6">
          <img
            className="w-16 h-16 rounded-full"
            src={company?.company_logo || "default-logo.png"}
            alt="Company Logo"
          />
          <div className="text-white">
            <h2 className="text-xl font-semibold">
              {company?.company_name || "Your company profile is incomplete."}
            </h2>
            <p>
              {company?.company_description ||
                "Complete your profile to attract more applicants."}
            </p>
          </div>
        </div>
        <Link to="/dashboard/EmployeeSettings">
          <button>
            <ButtonWithIcon
              btnName={"Edit Profile"}
              customStyle={"text-[#E05151] bg-white"}
            />
          </button>
        </Link>
      </div>

      <div>
        <div className="flex items-center justify-between mt-8">
          <h3 className="font-bold">Recent Job Postings</h3>
          <Link to="/dashboard/myJob">
            <button className="text-lg">
              <ButtonWithIcon btnName={"View All Jobs"} />
            </button>
          </Link>
        </div>
      </div>

      <MyJob />
    </>
  );
};

export default CompanyDashboard;
