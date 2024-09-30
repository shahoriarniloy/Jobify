import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import useCurrentUser from "../../../Hooks/useCurrentUser";

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const { currentUser, loading } = useCurrentUser();

  useEffect(() => {
    const fetchMessages = async () => {
      if (loading || !currentUser) return;

      try {
        const response = await axiosSecure.get(`/conversations?email=${currentUser.email}`);
        console.log("Fetched messages:", response.data);
        const allMessages = response.data;

        const groupedMessages = {};

        allMessages.forEach((message) => {
          const otherPartyEmail = message.senderEmail === currentUser.email
            ? message.receiverEmail
            : message.senderEmail;

          if (!groupedMessages[otherPartyEmail]) {
            groupedMessages[otherPartyEmail] = {
              otherPartyEmail,
              otherPartyName: message.senderEmail === currentUser.email ? message.receiverName : message.senderName,
              otherPartyPhoto: message.senderEmail === currentUser.email ? message.receiverPhoto : message.senderPhoto,
              messages: [],
              lastMessage: message.message,
              updatedAt: message.createdAt,
            };
          } else {
            groupedMessages[otherPartyEmail].messages.push(message);
          }

          if (new Date(message.createdAt) > new Date(groupedMessages[otherPartyEmail].updatedAt)) {
            groupedMessages[otherPartyEmail].lastMessage = message.message;
            groupedMessages[otherPartyEmail].updatedAt = message.createdAt;
          }
        });

        setConversations(Object.values(groupedMessages));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [currentUser, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Your Messages</h1>

      {conversations.length === 0 ? (
        <div className="text-gray-500">No conversations found.</div>
      ) : (
        <div className="space-y-4">
          {conversations.map((conversation, index) => (
            <Link
              key={conversation.otherPartyEmail || index} 
              to={`/dashboard/messages/${conversation.otherPartyEmail}`}
              state={{ otherPartyName: conversation.otherPartyName, otherPartyPhoto: conversation.otherPartyPhoto }}
              className="flex items-start bg-white p-4 rounded-lg shadow hover:bg-gray-100 transition duration-200 ease-in-out"
            >
              <img
                src={conversation.otherPartyPhoto || "default-avatar.png"}
                alt={conversation.otherPartyName || "Unknown"}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold truncate">{conversation.otherPartyName || "Unknown"}</h2>
                <p className="text-gray-500 text-sm truncate w-1/2">{conversation.lastMessage || "No message available"}</p>
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
  );
};

export default Messages;
