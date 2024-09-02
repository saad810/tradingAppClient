import React from "react";
import hero from "./assets/8asdas52 1 (1).png";
import bgImage from "./assets/candlesticks-bg.png";
import fontBrand from "./assets/Group.png";
import { useNavigate } from "react-router-dom";
import FAQSection from "../Components/FAQSection";
import AboutUs from "../Components/AboutUs";
const MainLandingPage = () => {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/auth/signup");
  };
  return (
    <div>
      <div
        className="relative h-screen w-full bg-cover bg-center flex"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        {/* Left Side: MacBook Image */}
        <div className="flex items-center justify-center w-full md:w-1/2 p-4">
          <img
            src={hero}
            alt="MacBook"
            className="max-w-full max-h-3/4 object-contain" // Ensures the image maintains its aspect ratio
          />
        </div>

        {/* Right Side: Text and Button */}
        <div className="flex items-center justify-center w-full p-8 md:w-1/2">
          <div className="flex flex-col items-start w-full max-w-2xl">
            <img src={fontBrand} alt="Brand Logo" className="mb-4" />
            <h1 className="text-5xl font-bold leading-snug">
              Simplify your trading, amplify your returns.
            </h1>

            <button
              onClick={navigateLogin}
              className="mt-6 px-6 py-4 bg-primary text-white text-lg rounded hover:bg-primaryblue-950 transition"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
      <div>
        <AboutUs />
      </div>
      <div>
        <FAQSection />
      </div>
    </div>
  );
};

export default MainLandingPage;
