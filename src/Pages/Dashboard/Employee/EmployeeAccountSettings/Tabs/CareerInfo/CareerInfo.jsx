import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "./../../../../../../Hooks/UseAxiosSecure";
import "react-quill/dist/quill.snow.css";
import useCurrentUser from "./../../../../../../Hooks/useCurrentUser";
import { toast } from "react-toastify";

const CareerInfo = () => {
  const { currentUser } = useCurrentUser();
  const [description, setDescription] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [popUpClose, setPopUpClose] = useState(false);
  const [inputDegree, setInputDegree] = useState("");

  const { data: schools, isLoading } = useQuery({
    queryKey: ["School Name", inputValue],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/school-name?name=${inputValue}`);
      return data;
    },
    enabled: inputValue.length > 2,
    staleTime: 5 * 60 * 1000,
  });
  let uniqueSchools = schools
    ? Array.from(new Set(schools.map((school) => school.name)))
    : [];
  const handleInputChange = (e) => {
    const query = e.target.value;
    setInputValue(query);
    setPopUpClose(false);
  };
  const handleSuggestionClick = (schoolName) => {
    setInputValue(schoolName);
    setPopUpClose(true);
  };
  const { data: degrees } = useQuery({
    queryKey: ["loadedDegree"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/degrees`);
      return data;
    },
  });
  const { data: fields, refetch } = useQuery({
    queryKey: ["loadedFields"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/field?field=${inputDegree}`);
      return data;
    },
  });
  useEffect(() => {
    refetch();
  }, [inputDegree]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const field = form.filedOfStudy.value;
    const startDate = form.startDate.value;
    const endDate = form.endDate.value;
    const cgpa = form.cgpa.value;

    console.log(currentUser.currentUser);

    const data = {
      schoolName: inputValue,
      degree: inputDegree,
      field,
      startDate,
      endDate,
      cgpa,
      description,
      userEmail: currentUser?.currentUser.email,
    };

    try {
      const response = await axiosSecure.post("/profile-updating", data);

      if (response.status === 200) {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.warn("Error updating profile");
    }
  };

  return (
    <div className="p-4 md:p-8">
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <label className="font-bold" htmlFor="schoolName">
              School
            </label>
            <input
              required
              type="text"
              name="schoolName"
              id="schoolName"
              className="border mt-2 border-gray-300 p-2 rounded w-full"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type a school name..."
            />

            {!isLoading && uniqueSchools.length > 0 && (
              <ul
                className={`${
                  popUpClose ? "hidden" : "absolute"
                } z-10  border border-gray-300 rounded mt-2 bg-white shadow-lg max-h-60 overflow-auto`}
              >
                {uniqueSchools.map((schoolName, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSuggestionClick(schoolName)}
                  >
                    {schoolName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label className="font-bold" htmlFor="industryType">
              Degree
            </label>
            <select
              name="degree"
              required
              className="border mt-2 border-gray-300 p-2 rounded w-full"
              onChange={(e) => setInputDegree(e.target.value)}
            >
              <option value="default">Choose your degree</option>

              {degrees?.map((degree) => (
                <option key={degree._id} value={degree?.degree}>
                  {degree.degree}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-bold" htmlFor="industryType">
              Field of Study
            </label>
            <select
              name="filedOfStudy"
              required
              className="border mt-2 border-gray-300 p-2 rounded w-full"
            >
              <option value="">Choose your Field</option>

              {fields &&
                fields?.fields.map((field, idx) => (
                  <option key={idx} value={field}>
                    {field}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="font-bold" htmlFor="startDate">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              required
              className="border mt-2 border-gray-300 p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="font-bold" htmlFor="endDate">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              required
              className="border mt-2 border-gray-300 p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="font-bold" htmlFor="cgpa">
              C-GPA
            </label>
            <div className="relative mt-2">
              <input
                type="text"
                name="cgpa"
                required
                className="border border-gray-300 p-2 rounded w-full" // Padding for icon
                placeholder="Enter your C-GPA"
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="font-bold" htmlFor="companyVision">
            Description
          </label>
          <div className="quill-wrapper relative border rounded-lg mt-2">
            <ReactQuill
              required
              value={description}
              onChange={(value) => setDescription(value)}
              placeholder="Write down your biography here. Let the employers know who you are..."
              modules={{
                toolbar: [
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link"],
                ],
              }}
              formats={[
                "bold",
                "italic",
                "underline",
                "list",
                "bullet",
                "link",
              ]}
              className="custom-quill-editor"
              style={{ direction: "ltr" }}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn bg-blue-600 text-white mt-4 md:mt-8 px-6 py-3 rounded-lg w-full md:w-auto"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default CareerInfo;
