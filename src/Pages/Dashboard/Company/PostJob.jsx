import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    experience: '',
    salaryRange: '',
    location: '',
    education: '',
    jobType: '',
    vacancy: '',
    deadline: '',
    jobLevel: '', // Added job level state
    jobDescription: '',
    responsibilities: '',
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/postJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        // Show SweetAlert2 popup on success
        Swal.fire({
          icon: 'success',
          title: 'Job posted successfully!',
          text: 'The job listing has been created and posted on the platform.',
        });

        // Optionally clear the form fields after successful submission
        setJobData({
          title: '',
          company: '',
          experience: '',
          salaryRange: '',
          location: '',
          education: '',
          jobType: '',
          vacancy: '',
          deadline: '',
          jobLevel: '',
          jobDescription: '',
          responsibilities: '',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to post job',
          text: 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was a problem with the server.',
      });
    }
  };

  return (
    <div className="container max-w-screen-lg mx-auto py-6">
      <div>
        <h2 className="font-semibold text-3xl text-black mb-4">Post a job</h2>
        <p className="text-gray-700 mb-6">Fill up this form to post a job on the platform.</p>
        <div className="rounded p-6 mb-6">
          <div className="grid gap-6 text-sm grid-cols-1 lg:grid-cols-3">
            <form className="lg:col-span-2" onSubmit={handleSubmit}>
              <div className="grid gap-6 text-sm grid-cols-1 md:grid-cols-5">
                {/* Job Title */}
                <div className="md:col-span-5">
                  <label htmlFor="tittle">Job Title</label>
                  <input
                    type="text"
                    name="title"
                    value={jobData.title}
                    onChange={handleChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                    placeholder="Add job title, role, vacancies etc"
                  />
                </div>

                {/* Company */}
                <div className="md:col-span-3">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={jobData.company}
                    onChange={handleChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                    placeholder="Company name"
                  />
                </div>

                {/* Experience */}
                <div className="md:col-span-2">
                  <label htmlFor="experience">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={jobData.experience}
                    onChange={handleChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                    placeholder="Experience"
                  />
                </div>

                {/* Salary Range & Location */}
                <div className="md:col-span-5">
                  <div className="flex gap-4">
                    <div className="w-1/3">
                      <label htmlFor="salaryRange">Salary Range</label>
                      <input
                        type="text"
                        name="salaryRange"
                        value={jobData.salaryRange}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                        placeholder="Salary Range"
                      />
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
                      />
                    </div>
                  </div>
                </div>

                {/* Job Level */}
                <div className="md:col-span-2">
                  <label htmlFor="jobLevel">Job Level</label>
                  <input
                    type="text"
                    name="jobLevel"
                    value={jobData.jobLevel}
                    onChange={handleChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                    placeholder="Job Level (e.g., Junior, Mid, Senior)"
                  />
                </div>

                {/* Advanced Information */}
                <div className="md:col-span-5">
                  <div className="flex gap-4 mb-4">
                    <div className="w-1/3">
                      <label htmlFor="education">Education</label>
                      <input
                        type="text"
                        name="education"
                        value={jobData.education}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                        placeholder="Education"
                      />
                    </div>
                    <div className="w-1/3">
                      <label htmlFor="jobType">Job Type</label>
                      <input
                        type="text"
                        name="jobType"
                        value={jobData.jobType}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                        placeholder="Job Type"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-5">
                  <label htmlFor="jobDescription">Job Description</label>
                  <textarea
                    name="jobDescription"
                    value={jobData.jobDescription}
                    onChange={handleChange}
                    className="h-20 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                    placeholder="Enter job description"
                  />
                </div>

                {/* Responsibilities */}
                <div className="md:col-span-5">
                  <label htmlFor="responsibilities">Responsibilities</label>
                  <textarea
                    name="responsibilities"
                    value={jobData.responsibilities}
                    onChange={handleChange}
                    className="h-20 border mt-1 rounded px-4 w-full bg-gray-50 p-2"
                    placeholder="Enter job responsibilities"
                  />
                </div>

                <div className="md:col-span-5 text-right">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
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
