import React, { useState } from "react";
import useInput from "../hooks/useInput";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, emailAtribs, resetEmail] = useInput("");
  const [password, passwordAtribs, resetPassword] = useInput("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    resetEmail();
    resetPassword();
  };
  return (
    <div className="">
      <h3 className="font-bold text-3xl py-1">Welcome</h3>
      <span className="font-medium text-base">Create Account to Continue</span>
      <form action="" onClick={handleSubmit}>
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
              <Link to="signup" className="text-primary font-semibold">Register</Link>
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
