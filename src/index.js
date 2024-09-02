import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./Context/AuthContext";
import TradingProvider from "./Context/TradingContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Load the Stripe publishable key from environment variables
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
console.log("Stripe Key:", process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      {" "}
      {/* Wrap your app in the Elements provider */}
      <AuthProvider>
        <TradingProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer />
        </TradingProvider>
      </AuthProvider>
    </Elements>
  </React.StrictMode>
);

// Performance measurement setup
reportWebVitals();
