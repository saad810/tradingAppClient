import React, { useState, useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa6";
import io from "socket.io-client";
import axios from "axios";
import { IoMdSend } from "react-icons/io";

const socket = io("http://localhost:3500"); // Replace with your server URL if different

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [startNew, setStartNew] = useState(false);
  const [user, setUser] = useState({
    _id: "123",
    username: "johndoe",
  });
  const messagesEndRef = useRef(null); // Reference for scrolling to the bottom

  useEffect(() => {
    // Listen for incoming messages
    const handleMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on("message", handleMessage);
    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    if (message.trim()) {
      socket.emit("sendMessage", { sender: user._id, text: message });
      setMessage("");
    }
  };

  const startNewChat = () => {
    setStartNew(true);
  };

  return (
    <div className="fixed right-8 bottom-20 w-64 rounded-lg shadow-lg mt-2 bg-primaryblue-50">
      <div className="h-full flex flex-col">
        <div className="bg-primary text-white text-center py-2 rounded-t-lg">
          Chat with us
        </div>
        <div className="flex-1 overflow-y-auto p-2 max-h-72 min-h-72">
          {/* Chat messages */}
          {messages.map((msg, index) => (
            <div className="flex gap-2 items-center mb-2" key={index}>
              <div className="bg-primary text-white p-2 rounded-lg">
                {msg.text}
              </div>
              <FaArrowRight />
            </div>
          ))}
          {/* Scroll target */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input form */}
        {startNew ? (
          <form onSubmit={sendMessage}>
            <div className="flex items-center gap-2 py-2 px-1">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here"
                className="w-full py-2 px-2 text-sm rounded bg-white"
              />
              <button
                type="submit"
                className="bg-primary text-white text-center p-2 rounded-full"
              >
                <IoMdSend />
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={startNewChat}
            type="button"
            className="bg-primary text-white text-center py-4 rounded-b-lg"
          >
            Start a new chat
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
