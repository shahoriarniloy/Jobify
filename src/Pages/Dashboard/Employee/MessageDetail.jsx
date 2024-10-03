import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axiosSecure from "../../../Hooks/useAxiosSecure";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { FaPaperPlane } from "react-icons/fa";

const MessageDetail = () => {
  const { otherPartyEmail } = useParams();
  const { state } = useLocation();  
  const { otherPartyName, otherPartyPhoto } = state || {};  
  const { currentUser, loading } = useCurrentUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async () => {
    if (loading || !currentUser) return;

    try {
      const response = await axiosSecure.get(`/individual-messages?email=${currentUser.email}&otherPartyEmail=${otherPartyEmail}`);
      setMessages(response.data);
      console.log('messages', response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [currentUser, loading, otherPartyEmail]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return; 
  
    try {
      const messageData = {
        senderEmail: currentUser.email,
        receiverEmail: otherPartyEmail,
        message: newMessage,
        createdAt: new Date().toISOString(),
        senderName: currentUser.name,
        senderPhoto: currentUser.photoURL,
      };
  
      await axiosSecure.post('/sendMessage', messageData);

      setNewMessage("");
      fetchMessages();  
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto bg-white rounded-xl h-full text-sm">
      <div className="flex items-center mb-4 py-2 border rounded-t-lg px-4">
        <img
          src={otherPartyPhoto || "default-avatar.png"} 
          alt={otherPartyName}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <h1 className="text-2xl font-bold roboto-regular">{otherPartyName}</h1>
      </div>

      {messages.length === 0 ? (
        <div className="text-gray-500">No messages found.</div>
      ) : (
        <div className="mb-4 lg:px-36 md:px-24 px-12" style={{ maxHeight: "400px", overflowY: "auto" }}>
          {messages.map((message, index) => {
            const isSameSender = index > 0 && messages[index - 1].senderEmail === message.senderEmail;
            const isCurrentUser = message.senderEmail === currentUser.email;

            return (
              <div key={message._id} className={`chat ${isCurrentUser ? 'chat-end' : 'chat-start'}`}>
                {!isSameSender && (
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={isCurrentUser ? currentUser.photoURL : message.senderPhoto}
                        alt={isCurrentUser ? currentUser.name : message.senderName}
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center">
                  {/* For current user, show time on the left */}
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

                  {/* For others, show time on the right */}
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
          placeholder="Type your message..."
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
