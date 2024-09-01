import React, { useState } from "react";
import { FaUser, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";
const SideBar = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const navigateLogin = () => {
    navigate("/auth");
  };
  const handleLogout = () => {
    logout();
    navigate("/auth");
  };
  return (
    <div class="w-72 bg-bgOne p-6 z-10 fixed left-0 top-14 h-screen">
      <>
        {auth && auth.user.id ? (
          <>
            <div class="flex flex-col items-start mb-6">
              <img
                src="https://via.placeholder.com/100"
                alt="User Avatar"
                class="w-24 h-24 mb-4"
              />
              <h3 class="text-xl font-semibold text-teal-900">
                {auth.user.name || "No Username"}
              </h3>
              <p class="text-gray-600">{auth.user.email}</p>
            </div>

            <ul class="space-y-4">
              <li class="flex items-center space-x-2">
                <span class="text-2xl">
                  <FaUser />
                </span>
                <a href="#" class="text-lg font-medium">
                  My profile
                </a>
              </li>
              <hr class="border-gray-400" />

              <li class="flex items-center space-x-2">
                <span class="text-2xl">
                  <FaSearch />
                </span>
                <Link to="/history" class="text-lg font-medium">
                  Trade History
                </Link>
              </li>
              <hr class="border-gray-400" />

              <li
                class="flex items-center space-x-2 cursor-pointer"
                onClick={handleLogout}
              >
                <span class="text-2xl">
                  <FaSignOutAlt />
                </span>
                <a href="#" class="text-lg font-medium">
                  Log Out
                </a>
              </li>
              <hr class="border-gray-400" />
            </ul>
          </>
        ) : (
          <div class="flex flex-col items-start mb-6">
            <h3 className="text-lg font-semibolf text-primary">
              Log In to continue
            </h3>
            <button
              className="px-4 py-2 bg-primary text-white font-medium rounded mt-4"
              onClick={navigateLogin}
            >
              Log in
            </button>
          </div>
        )}
      </>
    </div>
  );
};

export default SideBar;
