import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next"; // Import useTranslation
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { useQuery } from "@tanstack/react-query";
import DashboardLoader from "../../../Shared/DashboardLoader";
import { Helmet } from "react-helmet";

const PostJob = () => {
  const { t } = useTranslation(); // Initialize useTranslation
  const { currentUser } = useCurrentUser();
  const [subCategories, setSubCategories] = useState([]);

  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    experience: "",
    salaryRange: "",
    location: "",
    education: "",
    jobType: "",
    vacancy: "",
    deadline: "",
    jobLevel: "",
    jobDescription: "",
    responsibilities: [],
    jobCategory: "",
    jobSubCategory: "",
    posted: new Date().toISOString().split("T")[0],
  });

  // Load all categories
  const { data: categories, isLoading } = useQuery({
    queryKey: ["load category"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/jobCategories`);
      return data;
    },
  });
  // Load company info
  const { data, isLoading: loadingCom } = useQuery({
    queryKey: ["load company info"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/companies/${currentUser.email}`);
      return data;
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevJobData) => ({
      ...prevJobData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const sub = categories?.find((cate) => cate.name == jobData.jobCategory);
    setSubCategories(sub?.subcategories);
  }, [handleChange]);

  // post job
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = { jobInfo: jobData, companyInfo: data };

    try {
      const response = await axiosSecure.post("/postJob", newData);
      if (response?.status == 201) {
        Swal.fire({
          icon: "success",
          title: t("job_post_success"),
          text: t("job_post_created"),
        });

        setJobData({
          title: "",
          company: "",
          experience: "",
          salaryRange: "",
          location: "",
          education: "",
          jobType: "",
          vacancy: "",
          deadline: "",
          jobLevel: "",
          jobDescription: "",
          responsibilities: "",
          jobCategory: "",
          jobSubCategory: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: t("job_post_fail"),
          text: t("job_post_try_again"),
        });
      }
    } catch (error) {
      // console.error('Error:', error);
      Swal.fire({
        icon: "error",
        title: t("server_error"),
        text: t("server_error_message"),
      });
    }
  };
  if (loadingCom) return <DashboardLoader />;

  return (
    <div className="container pb-6 mx-auto  w-full">
      <Helmet>
        <title>Jobify - Post Job</title>
      </Helmet>
      <div>
        <h2 className="font-semibold text-3xl text-black mb-4">
          {t("post_job")}
        </h2>
        <p className="text-stone-500 mb-6">{t("fill_form")}</p>
        <div className="rounded p-6 mb-6">
          <div className="grid gap-6 text-sm grid-cols-1 lg:grid-cols-3">
            <form className="lg:col-span-3" onSubmit={handleSubmit}>
              <div className="grid gap-6 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-3">
                  <label htmlFor="company">{t("company")}</label>
                  <input
                    type="text"
                    name="company"
                    value={data?.company_name}
                    onChange={handleChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                    placeholder={t("company_name")}
                    disabled
                  />
                </div>
                <div className="md:col-span-5">
                  <label htmlFor="title">{t("job_title")}</label>
                  <input
                    type="text"
                    name="title"
                    value={jobData.title}
                    onChange={handleChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                    placeholder={t("add_job_title")}
                    required
                  />
                </div>
                <div className="md:col-span-3 text-black">
                  <label htmlFor="jobCategory">{t("job_category_label")}</label>
                  <select
                    required
                    name="jobCategory"
                    value={jobData.jobCategory}
                    onChange={handleChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                  >
                    <option value="">{t("select_category")}</option>
                    {categories?.map((category) => (
                      <option key={category?.name} value={category?.name}>
                        {category?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="jobSubCategory">
                    {t("job_sub_category_label")}
                  </label>
                  <select
                    required
                    name="jobSubCategory"
                    value={jobData?.jobSubCategory}
                    onChange={handleChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                    disabled={!subCategories?.length}
                  >
                    <option value="">{t("select_subcategory")}</option>
                    {subCategories?.map((subCategory, index) => (
                      <option key={index} value={subCategory.name}>
                        {subCategory.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="experience">{t("experience")}</label>
                  <select
                    required
                    name="experience"
                    value={jobData.experience}
                    onChange={handleChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                  >
                    <option value="">{t("select_experience")}</option>
                    <option value="Freshers">{t("freshers")}</option>
                    <option value="1-2 Years">{t("one_to_two_years")}</option>
                    <option value="2-4 Years">{t("two_to_four_years")}</option>
                    <option value="4-6 Years">{t("four_to_six_years")}</option>
                    <option value="6-8 Years">{t("six_to_eight_years")}</option>
                    <option value="8-10 Years">
                      {t("eight_to_ten_years")}
                    </option>
                    <option value="10-15 Years">
                      {t("ten_to_fifteen_years")}
                    </option>
                    <option value="15+ Years">{t("fifteen_plus_years")}</option>
                  </select>
                </div>

                <div className="md:col-span-5">
                  <div className="flex gap-4">
                    <div className="w-1/3">
                      <label htmlFor="salaryRange">{t("salary_range")}</label>
                      <select
                        required
                        name="salaryRange"
                        value={jobData.salaryRange}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                      >
                        <option value="">{t("select_salary_range")}</option>
                        <option value="$500-$1000">$500-$1000</option>
                        <option value="$1000-$2000">$1000-$2000</option>
                        <option value="$2000-$3000">$2000-$3000</option>
                        <option value="$3000-$4000">$3000-$4000</option>
                        <option value="$4000-$6000">$4000-$6000</option>
                        <option value="$6000-$8000">$6000-$8000</option>
                        <option value="$8000-$10000">$8000-$10000</option>
                        <option value="$10000-$15000">$10000-$15000</option>
                        <option value="$15000+">$15000+</option>
                      </select>
                    </div>

                    <div className="w-1/3">
                      <label htmlFor="location">{t("location")}</label>
                      <input
                        type="text"
                        name="location"
                        value={jobData.location}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                        placeholder={t("location")}
                        required
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="vacancy">{t("vacancy")}</label>
                      <input
                        type="number"
                        name="vacancy"
                        value={jobData.vacancy}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                        placeholder={t("placeholder_number_of_vacancies")}
                        required
                        min="1"
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 flex gap-4">
                  <div>
                    <label htmlFor="jobLevel">{t("job_level")}</label>
                    <select
                      required
                      name="jobLevel"
                      value={jobData.jobLevel}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                    >
                      <option value="">{t("select_job_level")}</option>
                      <option value="Entry Level">{t("entry_level")}</option>
                      <option value="Mid Level">{t("mid_level")}</option>
                      <option value="Expert Level">{t("expert_level")}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="deadline">
                      {t("application_deadline")}
                    </label>
                    <input
                      type="date"
                      name="deadline"
                      value={jobData.deadline}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-5">
                  <div className="flex gap-4 mb-4">
                    <div className="w-1/3">
                      <label htmlFor="education">{t("education")}</label>
                      <select
                        required
                        name="education"
                        value={jobData.education}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                      >
                        <option value="">{t("select_education")}</option>
                        <option value="High School">{t("high_school")}</option>
                        <option value="Intermediate">
                          {t("intermediate")}
                        </option>
                        <option value="Graduation">{t("graduation")}</option>
                        <option value="Bachelor Degree">
                          {t("bachelor_degree")}
                        </option>
                        <option value="Master Degree">
                          {t("master_degree")}
                        </option>
                      </select>
                    </div>

                    <div className="w-1/3">
                      <label htmlFor="jobType">{t("job_type")}</label>
                      <select
                        required
                        name="jobType"
                        value={jobData.jobType}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                      >
                        <option value="">{t("select_job_type")}</option>
                        <option value="All">{t("all")}</option>
                        <option value="Full Time">{t("full_time")}</option>
                        <option value="Part Time">{t("part_time")}</option>
                        <option value="Internship">{t("internship")}</option>
                        <option value="Remote">{t("remote")}</option>
                        <option value="Temporary">{t("temporary")}</option>
                        <option value="Contract Based">
                          {t("contract_based")}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5">
                  <label htmlFor="jobDescription">{t("job_description")}</label>
                  <textarea
                    name="jobDescription"
                    value={jobData.jobDescription}
                    onChange={handleChange}
                    className="h-20 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                    placeholder={t("enter_job_description")}
                    required
                  />
                </div>

                <div className="md:col-span-5">
                  <label htmlFor="responsibilities">
                    {t("responsibilities")}
                  </label>
                  <textarea
                    name="responsibilities"
                    value={jobData.responsibilities}
                    onChange={handleChange}
                    className="h-20 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                    placeholder={t("enter_job_responsibilities")}
                    required
                  />
                </div>

                <div className="md:col-span-5 text-right">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                  >
                    <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                    {t("post_job")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
