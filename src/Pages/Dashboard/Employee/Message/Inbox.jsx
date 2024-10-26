import React from "react";
import MessageDetail from "./MessageDetail";
import Messages from "./Messages";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { Helmet } from "react-helmet";

const Inbox = () => {
  const { t } = useTranslation(); // Destructure useTranslation
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className={theme === "dark" ? "text-slate-600" : "bg-secondary"}>
       <Helmet>
        <title>Jobify - Inbox</title>
      </Helmet>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold ">{t("your_messages")}</h1>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <div className="hidden lg:block">
            <Messages />
          </div>
          <div className="lg:col-span-2 mt-8">
            <MessageDetail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
