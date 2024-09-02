import React, { useState } from "react";
import useInput from "../hooks/useInput";
import { toast } from "react-toastify";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
const Login = () => {
  const [email, emailAtribs, resetEmail] = useInput("");
  const [password, passwordAtribs, resetPassword] = useInput("");
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // const path = location.state?.from?.path || "/";
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const user = {
        email,
        password,
      };
      const response = await axios.post("/auth", JSON.stringify(user), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // This should be part of the same configuration object
      });

      // console.log(response.data);
      const updatedAuth = {
        ...response.data,
        currAccType: "demo",
      };
      console.log("update auth", updatedAuth);
      setAuth(updatedAuth);
      toast.success("Login Successful", {
        autoClose: 2000,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Login Failed", {
        autoClose: 2000,
      });
    }
    resetEmail();
    resetPassword();
  };
  return (
    <div className="">
      <h3 className="font-bold text-3xl py-1">Welcome</h3>
      <span className="font-medium text-base">Create Account to Continue</span>
      <form action="" onSubmit={handleSubmit}>
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
              placeholder="Enter a valid email "
            />
          </div>
          <div className="mt-2">
            <label htmlFor="email" className="font-semibold text-base">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...passwordAtribs}
              className="w-full mt-1  p-2 rounded bg-bgOne"
              placeholder="Enter a valid email"
            />
          </div>
          <div className="mt-2">
            <span className="text-sm ">
              Dont have an account{" "}
              <Link to="signup" className="text-primary font-semibold">
                Register
              </Link>
            </span>
          </div>
          <div className="mt-8">
            <button className="w-full p-2 rounded bg-primary text-white font-semibold text-xl">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
