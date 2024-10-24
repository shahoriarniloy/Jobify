import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axiosSecure from "../../../../Hooks/useAxiosSecure";
import { useSelector } from "react-redux";
import { FaPaperPlane } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const MessageDetail = () => {
  const { t } = useTranslation(); // Destructure useTranslation
  const { otherPartyEmail } = useParams();
  const { state } = useLocation();
  const { otherPartyName, otherPartyPhoto } = state || {};
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { currentUser } = useCurrentUser();
  const loading = useSelector((state) => state.user.loading);
  const theme = useSelector((state) => state.theme.theme);

  const fetchMessages = async () => {
    if (!currentUser) return;

    try {
      const response = await axiosSecure.get(
        `/individual-messages?email=${currentUser.email}&otherPartyEmail=${otherPartyEmail}`
      );
      setMessages(response.data);
    } catch (error) {
      // console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [currentUser, otherPartyEmail]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const messageData = {
        senderEmail: currentUser.email,
        receiverEmail: otherPartyEmail,
        message: newMessage,
        createdAt: new Date().toISOString(),
        senderName: currentUser?.displayName,
        senderPhoto: currentUser?.photoURL,
      };

      await axiosSecure.post("/sendMessage", messageData);

      setNewMessage("");
      fetchMessages();
    } catch (error) {
      // console.error("Error sending message:", error);
    }
  };

  if (loading) {
    return <div>{t("loading")}</div>; // Loading text translated
  }

  return (
    <div className="container mx-auto bg-white rounded-xl text-sm">
      <div className="flex items-center mb-4 py-2 border rounded-t-lg px-4">
        <img
          src={otherPartyPhoto || "default-avatar.png"}
          alt={otherPartyName}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <h1
          className={
            theme === "dark "
              ? "text-2xl font-bold roboto-regular text-black"
              : "text-2xl font-bold roboto-regular"
          }
        >
          {otherPartyName}
        </h1>
      </div>

      {messages.length === 0 ? (
        <div className="text-gray-500 text-center flex justify-center items-center">
          {t("no_messages_found")} {/* Translated text for no messages */}
        </div>
      ) : (
        <div
          className="mb-4 lg:px-36 md:px-24 px-12"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {messages.map((message, index) => {
            const isSameSender =
              index > 0 &&
              messages[index - 1].senderEmail === message.senderEmail;
            const isCurrentUser = message.senderEmail === currentUser.email;

            return (
              <div
                key={message._id}
                className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`}
              >
                {!isSameSender && (
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={
                          isCurrentUser
                            ? currentUser.photoURL
                            : message.senderPhoto
                        }
                        alt={
                          isCurrentUser ? currentUser.name : message.senderName
                        }
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center">
                  {isCurrentUser && (
                    <time className="text-xs text-gray-500 mr-2">
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  )}

                  <div className="chat-bubble bg-blue-500 text-white">
                    {message.message}
                  </div>

                  {!isCurrentUser && (
                    <time className="text-xs text-gray-500 ml-2">
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-center px-24">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded-l-lg"
          placeholder={t("type_your_message")} // Translated placeholder
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-white text-blue-500 rounded-r-lg flex items-center mb-6"
        >
          <FaPaperPlane className="w-6 h-6 mt-4" />
        </button>
      </div>
    </div>
  );
};

export default MessageDetail;
