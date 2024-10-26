import React from "react";
import { ImPen } from "react-icons/im";
import { FaCode, FaDatabase } from "react-icons/fa6";
import { FcAdvertising } from "react-icons/fc";
import { MdVideoSettings } from "react-icons/md";
import { IoMusicalNotesSharp } from "react-icons/io5";
import { RiBarChartFill } from "react-icons/ri";
import { PiFirstAidKitFill } from "react-icons/pi";
import { t } from "i18next";
import { useSelector } from "react-redux";

const PopularCategory = ({ categoryCounts }) => {
  const iconMapping = {
    FaPaintBrush: <ImPen />,
    FaCode: <FaCode />,
    FaBullhorn: <FcAdvertising />,
    FaVideo: <MdVideoSettings />,
    FaMusic: <IoMusicalNotesSharp />,
    FaBriefcase: <RiBarChartFill />,
    FaHeartbeat: <PiFirstAidKitFill />,
    FaDatabase: <FaDatabase />,
  };
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div>
      <div className="container mx-auto py-24">
        {/* header */}
        <h1
          className={
            theme === "dark"
              ? "text-3xl font-semibold mb-2 tracking-wider text-white text-center "
              : "text-3xl font-semibold mb-2 tracking-wider text-black text-center "
          }
        >
          {t("popular_categories")}
        </h1>

        {/* carts */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 md:mt-16">
          {categoryCounts?.length > 0 ? (
            categoryCounts.map((category) => (
              <div key={category.name} className="flex items-center gap-4">
                <div className="p-2 md:p-4 text-sm md:text-xl bg-[#e7f0fa] rounded-xl flex items-center justify-center w-fit link-color">
                  {iconMapping[category.icon]}
                </div>
                <div>
                  <h1 className="cursor-pointer hover:text-blue-500 text-sm md:text-base">
                    {category.name}
                  </h1>
                  <p className="text-[#5E6670] text-xs md:text-sm">
                    {category.count} Open Position
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No categories found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularCategory;
