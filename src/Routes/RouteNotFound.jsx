import { useTranslation } from "react-i18next";

const RouteNotFound = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1 className="flex justify-center items-center text-red-600">
        {t("page_not_found")}
      </h1>
    </div>
  );
};

export default RouteNotFound;
