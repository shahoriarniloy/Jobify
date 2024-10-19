import React from "react";
import { ImPen } from "react-icons/im";
import { FaCode, FaDatabase } from "react-icons/fa6";
import { FcAdvertising } from "react-icons/fc";
import { MdVideoSettings } from "react-icons/md";
import { IoMusicalNotesSharp } from "react-icons/io5";
import { RiBarChartFill } from "react-icons/ri";
import { PiFirstAidKitFill } from "react-icons/pi";
import { useSelector } from "react-redux";

const PopularCategory = () => {
  const theme = useSelector((state) => state.theme.theme);

  const allCategories = [
    {
      icon: <ImPen />,
      name: "Graphics & Design",
      totalJobs: 5,
    },
    {
      icon: <FaCode />,
      name: "Code & Programming",
      totalJobs: 3,
    },
    {
      icon: <FcAdvertising />,
      name: "Digital Marketing",
      totalJobs: 5,
    },
    {
      icon: <MdVideoSettings />,
      name: "Video & Animation",
      totalJobs: 6,
    },
    {
      icon: <IoMusicalNotesSharp />,
      name: "Music & Audio",
      totalJobs: 4,
    },
    {
      icon: <RiBarChartFill />,
      name: "Account & Finance",
      totalJobs: 3,
    },
    {
      icon: <PiFirstAidKitFill />,
      name: "Health & Care",
      totalJobs: 5,
    },
    {
      icon: <FaDatabase />,
      name: "Data & Science",
      totalJobs: 4,
    },
  ];

  return (
    // hare you assign bg color😍😍😍 for your kind information
    <div>
      <div className="container mx-auto py-24">
        {/* header */}
        <h1
          className={
            theme === "dark"
              ? "text-3xl font-semibold mb-2 tracking-wider text-slate-200 text-center"
              : "text-3xl font-semibold mb-2 tracking-wider text-black text-center"
          }
        >
          Popular Categories
        </h1>

        {/* carts */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 md:mt-16">
          {allCategories.map((category) => (
            <div className="flex items-center gap-4">
              <div className="p-2 md:p-4 text-sm md:text-xl bg-[#e7f0fa] rounded-xl flex items-center justify-center w-fit link-color">
                {category.icon}
              </div>
              <div>
                <h1 className="cursor-pointer hover:text-blue-500 text-sm md:text-base">
                  {category.name}
                </h1>
                <p className="text-[#5E6670] text-xs md:text-sm">
                  {category.totalJobs} Open Position
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCategory;