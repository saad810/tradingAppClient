import React, { useState, useRef } from "react";
import useInput from "../hooks/useInput";
import { toast } from "react-toastify";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import useAuth from "../hooks/useAuth";

const VerifyOTP = () => {
  const [email, emailAtribs, resetEmail] = useInput("");
  const [otp, setOtp] = useState("");
  const [inputOtp, inputOtpAtribs, resetInputOtp] = useInput(""); // For user input OTP
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const form = useRef();

  const generateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(newOtp);
    return newOtp;
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    const generatedOtp = generateOtp();

    // Log the email to ensure it's the one you expect
    console.log("Sending OTP to:", email);

    const templateParams = {
      user_email: email, // Use the email entered by the user
      message: generatedOtp,
      from_name: "Syntho Next",
      to_name: auth.user.name || "User",
    };

    try {
      const emailResponse = await emailjs.send(
        "service_vhq02r9",
        "template_aob5t88",
        templateParams,
        "pjzs6nn86Dbi-DcX6"
      );

      console.log("EmailJS SUCCESS!", emailResponse.status, emailResponse.text);
      setIsOtpSent(true);

      try {
        const response = await axios.post(
          "/users/save-otp",
          JSON.stringify({ email, otp: generatedOtp }), // Use the user-entered email here
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data);
        toast.success("OTP sent and saved successfully", {
          autoClose: 2000,
        });
      } catch (error) {
        console.error("Error during OTP verification:", error);
        toast.error("Failed to save OTP", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log("EmailJS FAILED...", error.text);
      toast.error("Failed to send OTP", {
        autoClose: 2000,
      });
    }
  };

  // const sendEmail = async (e) => {
  //   e.preventDefault();
  //   const generatedOtp = generateOtp();

  //   const templateParams = {
  //     user_email: email,
  //     message: generatedOtp,
  //   };

  //   try {
  //     const emailResponse = await emailjs.send(
  //       "service_vhq02r9",
  //       "template_aob5t88",
  //       templateParams,
  //       "pjzs6nn86Dbi-DcX6"
  //     );

  //     console.log("SUCCESS!", emailResponse.status, emailResponse.text);
  //     setIsOtpSent(true);

  //     try {
  //       const response = await axios.post(
  //         "/users/save-otp",
  //         JSON.stringify({ email: auth.user.email, otp: generatedOtp }),
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       console.log(response.data);
  //       toast.success("OTP sent and saved successfully", {
  //         autoClose: 2000,
  //       });
  //     } catch (error) {
  //       console.error("Error during OTP verification:", error);
  //       toast.error("Failed to verify OTP ", {
  //         autoClose: 2000,
  //       });
  //     }
  //   } catch (error) {
  //     console.log("FAILED...", error.text);
  //     toast.error("Failed to send OTP", {
  //       autoClose: 2000,
  //     });
  //   }
  // };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/users/verify",
        JSON.stringify({ email: auth.user.email, otp: inputOtp }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      setAuth({
        ...auth,
        user: { ...auth.user, isVerified: true, realTradeAllowed: true },
      });
      toast.success("OTP verified successfully", {
        autoClose: 2000,
      });
      navigate("/auth");
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast.error("Failed to verify OTP", {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="max-w-xs mx-auto">
      <h3 className="font-bold text-3xl py-1">Verify Your Email</h3>
      <span className="font-medium text-base">
        Enter your email to receive OTP
      </span>
      <form>
        <div>
          <div className="mt-4">
            <label htmlFor="email" className="font-semibold text-base">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...emailAtribs}
              className="w-full mt-1 p-2 rounded bg-bgOne"
              placeholder="Enter a valid email"
            />
          </div>
          {isOtpSent && (
            <div className="mt-4">
              <label htmlFor="otp" className="font-semibold text-base">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                {...inputOtpAtribs}
                className="w-full mt-1 p-2 rounded bg-bgOne"
                placeholder="Enter the OTP"
                disabled={!isOtpSent}
              />
            </div>
          )}
          <div className="mt-2">
            <span className="text-sm">
              Already have an account?{" "}
              <Link to="login" className="text-primary font-semibold">
                Login
              </Link>
            </span>
          </div>
          <div className="mt-8">
            {isOtpSent ? (
              <button
                type="submit"
                className="w-full p-2 rounded bg-primary text-white font-semibold text-xl"
                onClick={handleVerifyOtp}
              >
                Verify OTP
              </button>
            ) : (
              <button
                type="submit"
                onClick={sendEmail}
                className="w-full p-2 rounded bg-primary text-white font-semibold text-xl"
              >
                Send OTP
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerifyOTP;
