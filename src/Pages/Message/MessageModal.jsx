import React from 'react';

const MessageModal = ({ isOpen, onClose, messages = [], newMessage, setNewMessage, sendMessage, recipient }) => {
    if (!isOpen) return null; // Don't render if the modal isn't open

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"> {/* Modal backdrop */}
            <div className="bg-white rounded-lg shadow-lg p-4 relative w-11/12 max-w-md"> {/* Modal box */}
                <button onClick={onClose} className="absolute right-2 top-2 text-xl">✖</button>
                <h2 className="text-lg font-bold mb-2">{recipient.receiverName}</h2>
                <div className="overflow-y-auto max-h-60 mb-4">
                    {messages.length === 0 ? (
                        <div className="text-center text-gray-500">No messages yet.</div>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={index} className={`chat ${msg.senderEmail === recipient.senderEmail ? 'chat-end' : 'chat-start'}`}>
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="User avatar"
                                            src={msg.senderEmail === recipient.senderEmail ? recipient.senderPhoto : recipient.receiverPhoto}
                                        />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    {msg.senderEmail === recipient.senderEmail ? recipient.senderName : recipient.receiverName}
                                    <time className="text-xs opacity-50">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
                                </div>
                                <div className="chat-bubble">{msg.message}</div>
                                <div className="chat-footer opacity-50">{msg.senderEmail === recipient.senderEmail ? 'Sent' : 'Delivered'}</div>
                            </div>
                        ))
                    )}
                </div>
                <textarea
                    className="w-full border rounded p-2 mb-2"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage} className="btn btn-primary mt-2">Send</button>
            </div>
        </div>
    );
};

export default MessageModal;
