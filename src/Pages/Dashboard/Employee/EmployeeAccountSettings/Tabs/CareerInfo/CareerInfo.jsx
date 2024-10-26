import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "./../../../../../../Hooks/UseAxiosSecure";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next"; // Importing useTranslation
import useCurrentUser from "../../../../../../Hooks/useCurrentUser";

const CareerInfo = () => {
  const { t } = useTranslation(); // Destructuring useTranslation
  const { currentUser } = useCurrentUser();
  const [description, setDescription] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [popUpClose, setPopUpClose] = useState(false);
  const [inputDegree, setInputDegree] = useState("");
 
  const theme = useSelector((state) => state.theme.theme);


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

    const data = {
      schoolName: inputValue,
      degree: inputDegree,
      field,
      startDate,
      endDate,
      cgpa,
      description,
      userEmail: currentUser?.email,
    };

    try {
      const response = await axiosSecure.post("/profile-updating", data);

      if (response.status === 200) {
        toast.success(t("profile_updated_successfully"));
      }
    } catch (error) {
      toast.warn(t("error_updating_profile"));
    }
  };

  return (
    <div className="p-4 md:p-8">
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <label className="font-bold" htmlFor="schoolName">
              {t("school")}
            </label>
            <input
              required
              type="text"
              name="schoolName"
              id="schoolName"
              className={ theme === "dark"? "border mt-2 bg-slate-900 border-slate-600 text-slate-300 p-2 rounded w-full" : "border mt-2 border-gray-300 p-2 rounded w-full"}
              value={inputValue}
              onChange={handleInputChange}
              placeholder={t("type_a_school_name")}
            />

            {!isLoading && uniqueSchools.length > 0 && (
              <ul
                className={`${popUpClose ? "hidden" : "absolute"
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
            <label className="font-bold" htmlFor="degree">
              {t("degree")}
            </label>
            <select
              name="degree"
              required
              className={theme === "dark"? "border mt-2 bg-slate-900 text-slate-300 border-gray-300 p-2 rounded w-full" : "border mt-2 border-gray-300 p-2 rounded w-full" }
              onChange={(e) => setInputDegree(e.target.value)}
            >
              <option value="default">{t("choose_your_degree")}</option>

              {degrees?.map((degree) => (
                <option key={degree._id} value={degree?.degree}>
                  {degree.degree}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold" htmlFor="filedOfStudy">
              {t("field_of_study")}
            </label>
            <select
              name="filedOfStudy"
              required
              className={ theme === "dark"? "border mt-2 bg-slate-900 text-slate-300 border-gray-300  p-2 rounded w-full" : "border mt-2 border-gray-300 p-2 rounded w-full"}
            >
              <option value="">{t("choose_your_field")}</option>

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
              {t("start_date")}
            </label>
            <input
              type="date"
              name="startDate"
              required
              className={ theme === "dark" ? "border mt-2 bg-slate-900 text-slate-300 border-gray-300 p-2 rounded w-full" : "border mt-2 border-gray-300 p-2 rounded w-full"}
            />
          </div>

          <div>
            <label className="font-bold" htmlFor="endDate">
              {t("end_date")}
            </label>
            <input
              type="date"
              name="endDate"
              required
              className={ theme === "dark" ? "border mt-2 bg-slate-900 text-slate-300 border-gray-300 p-2 rounded w-full" : "border mt-2 border-gray-300 p-2 rounded w-full"}
            />
          </div>

          <div>
            <label className="font-bold" htmlFor="cgpa">
              {t("cgpa")}
            </label>
            <div className="relative mt-2">
              <input
                type="text"
                name="cgpa"
                required
                className={ theme === "dark" ? "border mt-2 bg-slate-900 text-slate-300 border-gray-300 p-2 rounded w-full" : "border mt-2 border-gray-300 p-2 rounded w-full"}
                placeholder={t("enter_your_cgpa")}
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="font-bold" htmlFor="description">
            {t("description")}
          </label>
          <div className="quill-wrapper relative border rounded-lg mt-2">
            <ReactQuill
              required
              value={description}
              onChange={(value) => setDescription(value)}
              placeholder={t("write_down_your_biography")}
              modules={{
                toolbar: [
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link"],
                ],
              }}
              formats={["bold", "italic", "underline", "list", "bullet", "link"]}
              className="custom-quill-editor text-white"
              style={{ direction: "ltr" }}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn bg-blue-600 text-white mt-4 md:mt-8 px-6 py-3 rounded-lg w-full md:w-auto"
        >
          {t("save_changes")}
        </button>
      </form>
    </div>
  );
};

export default CareerInfo;
