import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import icon from "./icon.png";
import ChatBox from "../Components/ChatBox";
import Footer from "../Components/Footer";

const GlobalLayout = () => {
  const [showChat, setShowChat] = useState(false);
  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <section className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container max-w-7xl mx-auto">
        <Outlet />
      </main>
      <button 
        className="fixed right-5 bottom-5 p-2 bg-white rounded-full shadow-lg transition-transform transform hover:scale-105" 
        onClick={toggleChat}
      >
        <img src={icon} alt="chat icon" className="w-12 h-12 md:w-16 md:h-16" />
      </button>
      {showChat && <ChatBox />}
      <Footer />
    </section>
  );
};

export default GlobalLayout;
