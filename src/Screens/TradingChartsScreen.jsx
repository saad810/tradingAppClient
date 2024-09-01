import React from "react";
import useAuth from "../hooks/useAuth";
import DemoTrading from "../Components/Trades/DemoTrading";
import RealTrading from "../Components/Trades/RealTrading"; // Assuming you have a RealTrading component

const TradingChartsScreen = () => {
  const { auth, currentAccount } = useAuth();

  return (
    <div>
      {currentAccount === "demo" ? (
        auth && auth.user.demoAllowed ? <DemoTrading /> : null // Render demo trading component if in demo mode
      ) : (
        <RealTrading /> // Render real trading component if in real mode
      )}
    </div>
  );
};

export default TradingChartsScreen;
