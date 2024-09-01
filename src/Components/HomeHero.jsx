import React, { useState } from "react";
import { FcApproval, FcDisapprove } from "react-icons/fc";
import { FaAngleDown } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { toast } from "react-toastify";

const HomeHero = () => {
  const { auth, currentAccount } = useAuth();
  const userData = auth.user;
  const verified = userData.verified;
  const name = userData.name || "No Username";

  const GetLetters = (name) => {
    return name
      .split(" ")
      .slice(0, 2) // Get the first 2 words
      .map((word) => word.charAt(0))
      .join("");
  };

  const formatTimeStamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div>
      <div className="py-6 shadow rounded-md bg-primaryblue-50 p-5 mt-8">
        <div className="flex items-center justify-between">
          <div className="pb-4 flex items-center gap-4">
            <span className="font-bold bg-primary text-lg text-white p-3 rounded-full">
              {GetLetters(name)}
            </span>
            <h3 className="text-2xl font-semibold ">{userData.email}</h3>
          </div>
          <div className="pr-14">
            <div className="text-2xl font-bold text-primary">
              {currentAccount}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-16">
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Identity Verification</span>
            <span
              className={`text-base font-bold ${
                verified ? "text-primary" : "text-red-600"
              }`}
            >
              {verified ? (
                <div className="flex items-center gap-1">
                  <span>Verified</span>
                  <FcApproval />
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <span>Not Verified</span>
                  <FcDisapprove className="text-xl" />
                </div>
              )}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Time Zone</span>
            <span className="text-base font-semibold text-primary">
              {auth.user.timezone}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Last Login</span>
            <span className="text-base font-semibold text-primary">
              {formatTimeStamp(userData.lastLogin)}
            </span>
          </div>
          {/* <div className="flex flex-col">
            <span className="text-sm text-gray-400">Currency</span>
            <button className=" text-primary text-base font-semibold flex gap-3 items-center">
              <span>USD</span>
              <FaAngleDown />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
