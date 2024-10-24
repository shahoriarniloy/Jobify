import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";



const WhyChooseUs = () => {
  const { t } = useTranslation(); // Initialize the translation function
  const theme = useSelector((state) => state.theme.theme);
  return (
    <section>
      <div className="container mx-auto px-6 text-center">
        <h2 className={theme === "dark"? "text-4xl font-bold text-white" : "text-4xl font-bold text-black"}>{t("why_choose_us")}</h2>
        <p className={theme === "dark"? "mt-4 text-lg text-slate-300 mx-auto" : "mt-4 text-lg text-gray-600 mx-auto"}>
          {t("why_choose_us_description")} <strong>Jobify</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          <div className={theme === "dark"? "p-6 bg-slate-700 bg-opacity-50 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl" : "p-6 bg-white  rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl"}>
            <h3 className={theme === "dark"? "text-2xl font-semibold text-white" : "text-2xl font-semibold text-black"}>
              {t("experienced_professionals")}
            </h3>
            <p className={theme === "dark"? "mt-4 text-slate-300" : "mt-4 text-gray-600"}>
              {t("experienced_professionals_description")}
            </p>
          </div>

          <div className={theme === "dark"? "p-6 bg-slate-700 bg-opacity-50 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl" : "p-6 bg-white  rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl"}>
            <h3 className={theme === "dark"? "text-2xl font-semibold text-white" : "text-2xl font-semibold text-black"}>
              {t("cutting_edge_technology")}
            </h3>
            <p className={theme === "dark"? "mt-4 text-slate-300" : "mt-4 text-gray-600"}>
              {t("cutting_edge_technology_description")}
            </p>
          </div>

          <div className={theme === "dark"? "p-6 bg-slate-700 bg-opacity-50 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl" : "p-6 bg-white  rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl"}>
            <h3 className={theme === "dark"? "text-2xl font-semibold text-white" : "text-2xl font-semibold text-black"}>
              {t("user_centric_approach")}
            </h3>
            <p className={theme === "dark"? "mt-4 text-slate-300" : "mt-4 text-gray-600"}>
              {t("user_centric_approach_description")}
            </p>
          </div>

          <div className={theme === "dark"? "p-6 bg-slate-700 bg-opacity-50 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl" : "p-6 bg-white  rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl"}>
            <h3 className={theme === "dark"? "text-2xl font-semibold text-white" : "text-2xl font-semibold text-black"}>
              {t("innovation_growth")}
            </h3>
            <p className={theme === "dark"? "mt-4 text-slate-300" : "mt-4 text-gray-600"}>
              {t("innovation_growth_description")}
            </p>
          </div>

          <div className={theme === "dark"? "p-6 bg-slate-700 bg-opacity-50 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl" : "p-6 bg-white  rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl"}>
            <h3 className={theme === "dark"? "text-2xl font-semibold text-white" : "text-2xl font-semibold text-black"}>
              {t("trusted_by_industry_leaders")}
            </h3>
            <p className={theme === "dark"? "mt-4 text-slate-300" : "mt-4 text-gray-600"}>
              {t("trusted_by_industry_leaders_description")}
            </p>
          </div>

          <div className={theme === "dark"? "p-6 bg-slate-700 bg-opacity-50 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl" : "p-6 bg-white  rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl"}>
            <h3 className={theme === "dark"? "text-2xl font-semibold text-white" : "text-2xl font-semibold text-black"}>
              {t("comprehensive_job_solutions")}
            </h3>
            <p className={theme === "dark"? "mt-4 text-slate-300" : "mt-4 text-gray-600"}>
              {t("comprehensive_job_solutions_description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
