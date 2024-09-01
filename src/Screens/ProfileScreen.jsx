import React from "react";
import HomeHero from "../Components/HomeHero";
import TradingHistory from "./TradingHistory";
const ProfileScreen = () => {
  return (
    <div>
      <div className="border-b">
        <HomeHero />
      </div>
      <div className="">
        <TradingHistory />
      </div>
    </div>
  );
};

export default ProfileScreen;
