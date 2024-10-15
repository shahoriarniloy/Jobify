import React from "react";
import ResumeForm from "./ResumeForm";
import Resume from "./Resume";

const ResumeBuilder = () => {
  return (
    <div className="flex lg:flex-row md:flex-row flex-col gap-6">
      <ResumeForm></ResumeForm>
      <Resume></Resume>
    </div>
  );
};

export default ResumeBuilder;
