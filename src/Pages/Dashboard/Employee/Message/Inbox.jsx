import React from "react";
import MessageDetail from "./MessageDetail";
import Messages from "./Messages";

const Inbox = () => {
  return (
    <div>
      <Messages></Messages>
      <MessageDetail></MessageDetail>
    </div>
  );
};

export default Inbox;
