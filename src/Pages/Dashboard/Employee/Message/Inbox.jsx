import React from "react";
import MessageDetail from "./MessageDetail";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const Inbox = () => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className={theme === "dark" ? "text-slate-600" : "bg-secondary"}>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold ">Your Messages</h1>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <div className="hidden lg:block">
            <Messages></Messages>
          </div>
          <div className="lg:col-span-2 mt-8">
            <MessageDetail></MessageDetail>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
