import React from "react";
import { Routes, Route } from "react-router-dom";
// import AuthScreen from "./Screens/AuthScreen";
import Login from "./Forms/Login";
import Signup from "./Forms/Signup";
import AuthLayout from "./Layout/AuthLayout";
import GlobalLayout from "./Layout/GlobalLayout";
import UserHome from "./Screens/UserHome";
import TradingChartsScreen from "./Screens/TradingChartsScreen";
import TicksComponent from "./Components/TicksComponent";
import MarketsScreen from "./Screens/MarketsScreen";
// import Chat from "./Components/Chat";
const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="/" element={<GlobalLayout />}>
        <Route path="" element={<UserHome />} />
        <Route path="trade" element={<MarketsScreen />} />
        <Route path="trade/:symbol" element={<TradingChartsScreen />} />

      </Route>
    </Routes>
  );
};

export default App;
