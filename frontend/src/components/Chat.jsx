import { authStoreManager } from "../store/store.js";
import { useEffect, useRef } from "react";
import MessageSender from "../components/MessageSender.jsx"
import HeaderChat from "../components/HeaderChat.jsx"



const Chat = () => {
  const {
    userAuth,
    messages,
    getMessages,
    selectedUser,
    realTimeSocketOpen,
    realTimeSocketOff
  } = authStoreManager()
 
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    realTimeSocketOpen();

    return () => realTimeSocketOff();
  }, [selectedUser._id, getMessages, realTimeSocketOpen, realTimeSocketOff]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <HeaderChat />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#d3f7f8]/80" >
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === userAuth._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === userAuth._id
                      ? userAuth.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">

            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageSender />
    </div>
  );
};
export default Chat;