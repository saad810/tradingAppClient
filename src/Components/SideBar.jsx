import React, { useState } from "react";
import { FaUser, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const SideBar = () => {
  const [auth, setAuth] = useState({ accessToken: "null" });
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/auth");
  };
  return (
    <div class="w-72 bg-bgOne p-6 z-10 fixed left-0 top-15 h-screen">
      <h2 class="text-xl font-semibold mb-6">SYNTHONEXT</h2>

      <>
        {auth.accessToken ? (
          <>
            <div class="flex flex-col items-start mb-6">
              <img
                src="https://via.placeholder.com/100"
                alt="User Avatar"
                class="rounded-full w-24 h-24 mb-4"
              />
              <h3 class="text-xl font-semibold text-teal-900">Jacob Jones</h3>
              <p class="text-gray-600">Dispute center</p>
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
                <a href="#" class="text-lg font-medium">
                  Trade History
                </a>
              </li>
              <hr class="border-gray-400" />

              <li class="flex items-center space-x-2">
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
