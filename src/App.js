import React from "react";
import { Routes, Route } from "react-router-dom";
// import AuthScreen from "./Screens/AuthScreen";
import Login from "./Forms/Login";
import Signup from "./Forms/Signup";
import AuthLayout from "./Layout/AuthLayout";
import GlobalLayout from "./Layout/GlobalLayout";
import UserHome from "./Screens/UserHome";
import TradingChartsScreen from "./Screens/TradingChartsScreen";
import MarketsScreen from "./Screens/MarketsScreen";
import AdminDashBoard from "./Screens/admin/AdminDashBoard";
import RequireAuth from "./utils/RequireAuth";
import TradingHistory from "./Screens/TradingHistory";
import VerifyOTP from "./Forms/VerifyOTP";
import ProfileScreen from "./Screens/ProfileScreen";
// import Chat from "./Components/Chat";
const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="/privacy-policy" element={<h1>Privacy</h1>} />
      <Route path="/terms" element={<h1>Terms</h1>} />
      {/* <Route element={<RequireAuth />}> */}
      <Route path="/" element={<GlobalLayout />}>
        <Route path="" element={<UserHome />} />
        <Route path="profile" element={<ProfileScreen />} />
        <Route path="verify" element={<VerifyOTP />} />
        <Route path="markets" element={<MarketsScreen />} />
        <Route path="markets/:symbol" element={<TradingChartsScreen />} />
        <Route path="history" element={<TradingHistory />} />
      </Route>
      <Route path="admin">
        <Route path="" element={<AdminDashBoard />} />
      </Route>
      {/* </Route> */}
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default App;
