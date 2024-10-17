import React from "react";
import MessageDetail from "./MessageDetail";
import Messages from "./Messages";

const Inbox = () => {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Messages</h1>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <div className="hidden lg:block">
            <Messages></Messages>
          </div>
          <div className="lg:col-span-2">
            <MessageDetail></MessageDetail>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
