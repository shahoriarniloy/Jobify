import React, { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { useTranslation } from "react-i18next";

const CandidatesFilter = () => {
  const { t } = useTranslation();
  const [radius, setRadius] = useState(40);
  const [isRangeVisible, setIsRangeVisible] = useState(false);
  const [isLevelVisible, setIsLevelVisible] = useState(false);
  const [isExperienceVisible, setIsExperienceVisible] = useState(false);
  const [isEducationVisible, setIsEducationVisible] = useState(false);
  const [isGenderVisible, setIsGenderVisible] = useState(false);

  const handleRadiusChange = (e) => {
    setRadius(e.target.value);
  };

  const toggleRangeVisibility = () => {
    setIsRangeVisible(!isRangeVisible);
  };
  const toggleLevelVisibility = () => {
    setIsLevelVisible(!isLevelVisible);
  };
  const toggleExperienceVisibility = () => {
    setIsExperienceVisible(!isExperienceVisible);
  };
  const toggleEducationVisibility = () => {
    setIsEducationVisible(!isEducationVisible);
  };
  const toggleGenderVisibility = () => {
    setIsGenderVisible(!isGenderVisible);
  };

  return (
    <div className="border-2 rounded-lg p-4">
      <div>
        <div className="flex items-center justify-between mt-4">
          <h2 className="font-bold mb-4 text-lg">{t("candidate_level")}</h2>
          <button onClick={toggleLevelVisibility} className="focus:outline-none">
            <MdArrowDropDown
              className={`transition-transform ${
                isLevelVisible ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
        {isLevelVisible && (
          <div className="">
            <div className="form-control mb-2">
              <label className="flex gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-600"
                  defaultChecked
                />
                <span className="label-text">{t("entry_level")}</span>
              </label>
            </div>
            <div className="form-control mb-2">
              <label className="flex gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-600"
                  defaultChecked
                />
                <span className="label-text">{t("mid_level")}</span>
              </label>
            </div>
            <div className="form-control mb-4">
              <label className="flex gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-600"
                  defaultChecked
                />
                <span className="label-text">{t("expert_level")}</span>
              </label>
            </div>
          </div>
        )}
      </div>
      <hr />

      <div>
        <div className="flex items-center justify-between mt-4">
          <h2 className="font-bold mb-4 text-lg ">{t("experience")}</h2>
          <button onClick={toggleExperienceVisibility} className="focus:outline-none">
            <MdArrowDropDown
              className={`transition-transform ${
                isExperienceVisible ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
        {isExperienceVisible && (
          <div className="">
            <div className="form-control">
              {[
                "freshers",
                "1_2_years",
                "2_4_years",
                "4_6_years",
                "6_8_years",
                "8_10_years",
                "10_15_years",
                "15_plus_years"
              ].map((label, index) => (
                <label key={index} className="flex gap-2 cursor-pointer mb-2">
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio checked:bg-blue-600"
                    defaultChecked
                  />
                  <span className="label-text">{t(label)}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      <hr />

      <div>
        <div className="flex items-center justify-between mt-4">
          <h2 className="font-bold mb-4 text-lg ">{t("education")}</h2>
          <button onClick={toggleEducationVisibility} className="focus:outline-none">
            <MdArrowDropDown
              className={`transition-transform ${
                isEducationVisible ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
        {isEducationVisible && (
          <div className="">
            <div className="form-control">
              {[
                "all",
                "high_school",
                "intermediate",
                "graduation",
                "master_degree"
              ].map((label, index) => (
                <label key={index} className="flex gap-2 cursor-pointer mb-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-primary "
                  />
                  <span className="label-text">{t(label)}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      <hr />

      <div>
        <div className="flex items-center justify-between mt-4">
          <h2 className="font-bold mb-4 text-lg">{t("gender")}</h2>
          <button onClick={toggleGenderVisibility} className="focus:outline-none">
            <MdArrowDropDown
              className={`transition-transform ${
                isGenderVisible ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
        {isGenderVisible && (
          <div className="">
            <div className="form-control ">
              {["male", "female", "others"].map((label, index) => (
                <label key={index} className="flex gap-2 cursor-pointer mb-2">
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio checked:bg-blue-600"
                    defaultChecked
                  />
                  <span className="label-text">{t(label)}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidatesFilter;
