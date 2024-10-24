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
import DashboardLoader from "../../../Shared/DashboardLoader";
import { useTranslation } from "react-i18next"; // Import useTranslation

const CompanyDashboard = () => {
  const { t } = useTranslation(); // Destructure t from useTranslation
  const { currentUser } = useCurrentUser();
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
    return <DashboardLoader />;
  }

  return (
    <>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          {t("hello_message", { company_name: company?.company_name || t("default_company_name") })}
        </h2>
        <p className="text-sm">{t("company_overview_message")}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-[#9ecbe7] rounded-lg flex items-center gap-4">
          <AiOutlineUser size={32} className="text-blue-700" />
          <div>
            <h4 className="text-lg font-bold text-blue-700">
              {t("total_applicants")}
            </h4>
            <p className="text-2xl text-blue-700">{jobStats.totalApplicants}</p>
          </div>
        </div>
        <div className="p-4 bg-[#ecaaaa] rounded-lg flex items-center gap-4">
          <AiOutlineCheckCircle size={32} className="text-red-700" />
          <div>
            <h4 className="text-lg font-bold text-red-700">
              {t("interviews_scheduled")}
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
              {t("offers_extended")}
            </h4>
            <p className="text-2xl text-green-700">
              {jobStats.offersExtended}
            </p>
          </div>
        </div>
        <div className="p-4 bg-[#c3b1df] rounded-lg flex items-center gap-4">
          <BiTask size={32} className="text-purple-700" />
          <div>
            <h4 className="text-lg font-bold text-purple-700">{t("jobs_filled")}</h4>
            <p className="text-2xl text-purple-700">{jobStats.jobsFilled}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center bg-[#7093d9] p-8 rounded-lg mt-6">
        <div className="flex items-center gap-6">
          <img
            className="w-16 h-16 rounded-full"
            src={company?.company_logo || "default-logo.png"}
            alt={t("company_logo_alt")}
          />
          <div className="text-white">
            <h2 className="text-xl font-semibold">
              {company?.company_name || t("incomplete_profile_message")}
            </h2>
            <p>
              {company?.company_description ||
                t("complete_profile_message")}
            </p>
          </div>
        </div>
        <Link to="/dashboard/company-settings">
          <button>
            <ButtonWithIcon
              btnName={t("edit_profile")}
              customStyle={"text-[#E05151] bg-white"}
            />
          </button>
        </Link>
      </div>

      <div>
        <div className="flex items-center justify-between mt-8">
          <h3 className="font-bold">{t("recent_job_postings")}</h3>
          <Link to="/dashboard/myJob">
            <button className="text-lg">
              <ButtonWithIcon btnName={t("view_all_jobs")} />
            </button>
          </Link>
        </div>
      </div>

      <MyJob />
    </>
  );
};

export default CompanyDashboard;
