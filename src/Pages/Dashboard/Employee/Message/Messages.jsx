import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const Messages = () => {
  const { t } = useTranslation(); // Destructure useTranslation
  const [conversations, setConversations] = useState([]);
  const { currentUser } = useCurrentUser();
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUser) return;

      try {
        const response = await axiosSecure.get(
          `/conversations?email=${currentUser.email}`
        );
        const allMessages = response.data;

        const groupedMessages = {};

        allMessages.forEach((message) => {
          const otherPartyEmail =
            message.senderEmail === currentUser.email
              ? message.receiverEmail
              : message.senderEmail;

          if (!groupedMessages[otherPartyEmail]) {
            groupedMessages[otherPartyEmail] = {
              otherPartyEmail,
              otherPartyName:
                message.senderEmail === currentUser.email
                  ? message.receiverName
                  : message.senderName,
              otherPartyPhoto:
                message.senderEmail === currentUser.email
                  ? message.receiverPhoto
                  : message.senderPhoto,
              messages: [],
              lastMessage: message.message,
              updatedAt: message.createdAt,
            };
          } else {
            groupedMessages[otherPartyEmail].messages.push(message);
          }

          if (
            new Date(message.createdAt) >
            new Date(groupedMessages[otherPartyEmail].updatedAt)
          ) {
            groupedMessages[otherPartyEmail].lastMessage = message.message;
            groupedMessages[otherPartyEmail].updatedAt = message.createdAt;
          }
        });

        setConversations(Object.values(groupedMessages));
      } catch (error) {
        // console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [currentUser]);

  return (
    <div className={theme === "dark" ? "" : "bg-secondary"}>
       <Helmet>
        <title>Jobify - Messages</title>
      </Helmet>
      <div className="container mx-auto pt-8 min-h-screen">
        {conversations.length === 0 ? (
          <div className="text-gray-500">{t("no_conversations_found")}</div>
        ) : (
          <div className="space-y-4">
            {conversations.map((conversation, index) => (
              <Link
                key={conversation.otherPartyEmail || index}
                to={`/inbox/${conversation.otherPartyEmail}`}
                state={{
                  otherPartyName: conversation.otherPartyName,
                  otherPartyPhoto: conversation.otherPartyPhoto,
                }}
                className="flex items-start bg-white p-4 rounded-lg shadow hover:bg-gray-100 transition duration-200 ease-in-out"
              >
                <img
                  src={conversation.otherPartyPhoto || "default-avatar.png"}
                  alt={conversation.otherPartyName || t("unknown")}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <h2
                    className={`text-lg font-semibold truncate ${
                      theme === "dark" ? "text-slate-700" : ""
                    }`}
                  >
                    {conversation.otherPartyName || t("unknown")}
                  </h2>
                  <p className="text-gray-500 text-sm truncate w-1/2">
                    {conversation.lastMessage || t("no_message_available")}
                  </p>
                  <span className="text-sm text-gray-400 mt-1 block">
                    {new Date(conversation.updatedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
