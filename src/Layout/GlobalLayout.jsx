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
    <section>
      <Navbar />
      <main className="container max-w-7xl mx-auto">
        <Outlet />
      </main>
      <button className="fixed right-5 bottom-5" onClick={toggleChat}>
        <img src={icon} alt="chat icon" />
      </button>
      {showChat && <ChatBox />}
      <Footer />
    </section>
  );
};

export default GlobalLayout;
