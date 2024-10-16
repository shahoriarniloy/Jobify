import React, { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";

const CandidatesFilter = () => {
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
          <h2 className="font-bold mb-4 text-lg">Candidate Level</h2>
          <button
            onClick={toggleLevelVisibility}
            className="focus:outline-none"
          >
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
                <span className="label-text ">Entry Level</span>
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
                <span className="label-text">Mid Level</span>
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
                <span className="label-text">Expert Level</span>
              </label>
            </div>
          </div>
        )}
      </div>
      <hr />
      {/* Experience */}

      <div>
        <div className="flex items-center justify-between mt-4">
          <h2 className="font-bold mb-4 text-lg ">Experience</h2>
          <button
            onClick={toggleExperienceVisibility}
            className="focus:outline-none"
          >
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
              <label className="flex gap-2 cursor-pointer  mb-2">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-600"
                  defaultChecked
                />
                <span className="label-text ">Freshers</span>
              </label>
              <label className="flex gap-2 cursor-pointer  mb-2">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-600"
                  defaultChecked
                />
                <span className="label-text">1-2 years</span>
              </label>
              <label className="flex gap-2 cursor-pointer mb-2">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-600"
                  defaultChecked
                />
                <span className="label-text">2-4 years</span>
              </label>
              <label className="flex gap-2 cursor-pointer mb-2">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-600"
                  defaultChecked
                />
                <span className="label-text ">4-6 years</span>
              </label>
              <label className="flex gap-2 cursor-pointer mb-2">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-600"
                  defaultChecked
                />
                <span className="label-text ">6-8 years</span>
              </label>
              <label className="flex gap-2 cursor-pointer mb-2">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-600"
                  defaultChecked
                />
                <span className="label-text">8-10 years</span>
              </label>
              <label className="flex gap-2 cursor-pointer mb-2">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-600"
                  defaultChecked
                />
                <span className="label-text">10-15 years</span>
              </label>
              <label className="flex gap-2 cursor-pointer mb-4">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-600"
                  defaultChecked
                />
                <span className="label-text">15+ years</span>
              </label>
            </div>
          </div>
        )}
      </div>
      <hr />

      <div>
        <div className="flex items-center justify-between mt-4">
          <h2 className="font-bold mb-4 text-lg ">Education</h2>
          <button
            onClick={toggleEducationVisibility}
            className="focus:outline-none"
          >
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
              <label className="flex gap-2 cursor-pointer  mb-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary "
                />

                <span className="label-text ">All</span>
              </label>
              <label className="flex gap-2 cursor-pointer  mb-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary "
                />

                <span className="label-text ">High School </span>
              </label>
              <label className="flex gap-2 cursor-pointer  mb-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary "
                />

                <span className="label-text ">Intermediate</span>
              </label>
              <label className="flex gap-2 cursor-pointer  mb-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary "
                />

                <span className="label-text ">Graduation</span>
              </label>
              <label className="flex gap-2 cursor-pointer  mb-4">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary "
                />

                <span className="label-text ">Master Degree</span>
              </label>
              {/* <label className="flex gap-2 cursor-pointer  mb-2">
                        
                        <input type="radio" name="radio-10" className="radio checked:bg-blue-600" defaultChecked />
                        <span className="label-text">1-2 years</span>
                    </label>
                    <label className="flex gap-2 cursor-pointer mb-2">
                        
                        <input type="radio" name="radio-10" className="radio checked:bg-blue-600" defaultChecked />
                        <span className="label-text">2-4 years</span>
                    </label> */}
            </div>
          </div>
        )}
      </div>
      <hr />

      <div>
        <div className="flex items-center justify-between mt-4">
          <h2 className="font-bold mb-4 text-lg">Gender</h2>
          <button
            onClick={toggleGenderVisibility}
            className="focus:outline-none"
          >
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
              <label className="flex gap-2 cursor-pointer mb-2">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-600"
                  defaultChecked
                />
                <span className="label-text ">Male</span>
              </label>
              <label className="flex gap-2 cursor-pointer mb-2">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-600"
                  defaultChecked
                />
                <span className="label-text">Female</span>
              </label>
              <label className="flex gap-2 cursor-pointer mb-4">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-600"
                  defaultChecked
                />
                <span className="label-text">Others</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidatesFilter;
