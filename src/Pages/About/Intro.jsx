import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";



const Intro = () => {
  const { t } = useTranslation(); // Initialize the translation function
  const theme = useSelector((state) => state.theme.theme);
  return (
    <section className="py-8">
      <div className="container mx-auto px-6 text-center mb-12">
        <h2 className={theme === "dark"? "text-4xl font-bold text-white " : "text-4xl font-bold text-black "}>{t("about_jobify")}</h2>
        <p className={theme === "dark"? " text-slate-300 mt-4 text-lg  mx-auto" : "mt-4 text-lg  mx-auto " }>
          {t("jobify_intro_description")}
        </p>
      </div>
    </section>
  );
};

export default Intro;
