import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import { useSelector } from "react-redux";

const PostJob = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

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
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosSecure.get(
          `/companies/${currentUser.email}`
        );

        const userData = response.data;

        if (userData) {
          setJobData((prevJobData) => ({
            ...prevJobData,
            company: userData.company_name,
          }));
        }
      } catch (error) {
        // console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [currentUser.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
      hrEmail: currentUser?.email,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { responsibilities, ...rest } = jobData;

    const newJobData = {
      ...rest,
      responsibilities: responsibilities.split("\n"),
      posted: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await axiosSecure.post("/postJob", newJobData);
      if (response?.status == 201) {
        Swal.fire({
          icon: "success",
          title: "Job posted successfully!",
          text: "The job listing has been created and posted on the platform.",
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
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to post job",
          text: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      // console.error('Error:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was a problem with the server.",
      });
    }
  };

  return (
    <div className="container pb-6 mx-auto  w-full">
      <div>
        <h2 className="font-semibold text-3xl text-black mb-4">Post a Job</h2>
        <p className="text-stone-500 mb-6">
          Fill Up This Form to Post a Job on The Platform.
        </p>
        <div className="rounded p-6 mb-6">
          <div className="grid gap-6 text-sm grid-cols-1 lg:grid-cols-3">
            <form className="lg:col-span-3" onSubmit={handleSubmit}>
              <div className="grid gap-6 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-5">
                  <label htmlFor="title">Job Title</label>
                  <input
                    type="text"
                    name="title"
                    value={jobData.title}
                    onChange={handleChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                    placeholder="Add job title"
                    required
                  />
                </div>

                <div className="md:col-span-3">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={jobData.company}
                    onChange={handleChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                    placeholder="Company name"
                    disabled
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="experience">Experience</label>
                  <select
                    required
                    name="experience"
                    value={jobData.experience}
                    onChange={handleChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                  >
                    <option value="">Select Experience</option>
                    <option value="Freshers">Freshers</option>
                    <option value="1-2 Years">1-2 Years</option>
                    <option value="2-4 Years">2-4 Years</option>
                    <option value="4-6 Years">4-6 Years</option>
                    <option value="6-8 Years">6-8 Years</option>
                    <option value="8-10 Years">8-10 Years</option>
                    <option value="10-15 Years">10-15 Years</option>
                    <option value="15+ Years">15+ Years</option>
                  </select>
                </div>

                <div className="md:col-span-5">
                  <div className="flex gap-4">
                    <div className="w-1/3">
                      <label htmlFor="salaryRange">Salary Range</label>
                      <select
                        required
                        name="salaryRange"
                        value={jobData.salaryRange}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                      >
                        <option value="">Select Salary Range</option>
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
                      <label htmlFor="location">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={jobData.location}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                        placeholder="Location"
                        required
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="vacancy">Vacancy</label>
                      <input
                        type="number"
                        name="vacancy"
                        value={jobData.vacancy}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                        placeholder="Number of vacancies"
                        required
                        min="1"
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 flex gap-4">
                  <div>
                    <label htmlFor="jobLevel">Job Level</label>
                    <select
                      required
                      name="jobLevel"
                      value={jobData.jobLevel}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                    >
                      <option value="">Select Job Level</option>
                      <option value="Entry Level">Entry Level</option>
                      <option value="Mid Level">Mid Level</option>
                      <option value="Expert Level">Expert Level</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="deadline">Application Deadline</label>
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
                      <label htmlFor="education">Education</label>
                      <select
                        required
                        name="education"
                        value={jobData.education}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                      >
                        <option value="">Select Education</option>
                        <option value="High School">High School</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Graduation">Graduation</option>
                        <option value="Bachelor Degree">Bachelor Degree</option>
                        <option value="Master Degree">Master Degree</option>
                      </select>
                    </div>
                    <div className="w-1/3">
                      <label htmlFor="jobType">Job Type</label>
                      <select
                        required
                        name="jobType"
                        value={jobData.jobType}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                      >
                        <option value="">Select Job Type</option>
                        <option value="All">All</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Remote">Remote</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Contract Based">Contract Based</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5">
                  <label htmlFor="jobDescription">Job Description</label>
                  <textarea
                    name="jobDescription"
                    value={jobData.jobDescription}
                    onChange={handleChange}
                    className="h-20 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                    placeholder="Enter job description"
                    required
                  />
                </div>

                <div className="md:col-span-5">
                  <label htmlFor="responsibilities">
                    Responsibilities (one per line)
                  </label>
                  <textarea
                    name="responsibilities"
                    value={jobData.responsibilities}
                    onChange={handleChange}
                    className="h-20 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                    placeholder="Enter job responsibilities (e.g., Collect and test water samples)"
                    required
                  />
                </div>

                <div className="md:col-span-5 text-right">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                  >
                    <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                    Post Job
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
