import React from "react";
import useAuth from "../hooks/useAuth";
import DemoTrading from "../Components/Trades/DemoTrading";
const TradingChartsScreen = () => {
  const { auth } = useAuth();

  return (
    <div>
      {auth && auth.user.demoAllowed ? <DemoTrading /> : <h1>Not Allowed</h1>}
    </div>
  );
};

export default TradingChartsScreen;
