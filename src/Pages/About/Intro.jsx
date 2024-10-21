import { useTranslation } from "react-i18next";

const Intro = () => {
  const { t } = useTranslation(); // Initialize the translation function
  return (
    <section className="py-8">
      <div className="container mx-auto px-6 text-center mb-12">
        <h2 className="text-4xl font-bold text-black ">{t("about_jobify")}</h2>
        <p className="mt-4 text-lg  mx-auto ">
          {t("jobify_intro_description")}
        </p>
      </div>
    </section>
  );
};

export default Intro;
