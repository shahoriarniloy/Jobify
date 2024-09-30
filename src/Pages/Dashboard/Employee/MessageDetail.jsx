import  { useEffect, useState } from "react";
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
  console.log(otherPartyName);

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
    <div className="container mx-auto lg:px-36">
      <div className="flex items-center mb-4">
        <img
          src={otherPartyPhoto || "default-avatar.png"} 
          alt={otherPartyName}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <h1 className="text-2xl font-bold">{otherPartyName}</h1>
      </div>

      {messages.length === 0 ? (
        <div className="text-gray-500">No messages found.</div>
      ) : (
        <div className="mb-4" style={{ maxHeight: "400px", overflowY: "auto" }}>
          {messages.map((message, index) => {
            const isSameSender = index > 0 && messages[index - 1].senderEmail === message.senderEmail;
            const isLastMessageFromSender = index === messages.length - 1 || messages[index + 1].senderEmail !== message.senderEmail;
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
                {!isSameSender && (
                  <div className="chat-header">
                    {isCurrentUser ? currentUser.name : message.senderName}
                    <time className="text-xs opacity-50 ml-2">
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  </div>
                )}
                <div className="chat-bubble">
                  {message.message}
                </div>
                {isLastMessageFromSender && isCurrentUser && (
                  <div className="chat-footer opacity-50">Sent</div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded-l-lg"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-500 text-white rounded-r-lg flex items-center"
        >
          <FaPaperPlane className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MessageDetail;
