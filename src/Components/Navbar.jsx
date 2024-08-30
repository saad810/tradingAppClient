import React, { useState, useEffect, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaAngleDown } from "react-icons/fa";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [auth, setAuth] = useState({ accessToken: "null" });
  const [demoAllowed, setDemoAllowed] = useState(true); // Set demoAllowed to true for testing
  const [selectedAccount, setSelectedAccount] = useState("Select Account"); // Default button text
  const dropdownRef = useRef(null);

  const toggleSidebar = () => {
    setShow(!show);
  };

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const handleAccountSelection = (accountType) => {
    setSelectedAccount(accountType);
    setShowDropDown(false); // Close dropdown after selection
  };

  const navigateLogin = () => {
    navigate("/auth");
  };

  const navigateSignup = () => {
    navigate("/auth/signup");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="container mx-auto px-10 bg-primary py-3">
        <div className="flex items-center justify-between">
          <button onClick={toggleSidebar}>
            <RxHamburgerMenu className="text-3xl text-white" />
          </button>

          {auth.accessToken ? (
            <div className="relative flex gap-2 items-center">
              {selectedAccount === "Funding Account" && <FundsActions />}
              {demoAllowed ? (
                <>
                  {/* Show account selection dropdown */}
                  <button
                    className="bg-white py-2 px-4 text-base text-primary rounded"
                    onClick={toggleDropDown}
                  >
                    {selectedAccount} <FaAngleDown className="inline-block" />
                  </button>
                  {showDropDown && (
                    <DropDown
                      ref={dropdownRef}
                      onSelect={handleAccountSelection}
                    />
                  )}
                </>
              ) : (
                <FundsActions />
              )}

              {/* Show funds actions if a funding account is selected */}
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <button
                className="bg-white py-2 px-4 text-base text-primary rounded"
                onClick={navigateLogin}
              >
                Login
              </button>
              <button
                className="bg-secondary py-2 px-4 text-base text-white rounded"
                onClick={navigateSignup}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>
      {show && <SideBar />}
    </>
  );
};

const FundsActions = () => {
  return (
    <div className="flex items-center gap-3 ">
      <button className="bg-white py-2 px-4 text-base text-primary rounded">
        Deposit
      </button>
      <button className="bg-secondary py-2 px-4 text-base text-white rounded">
        Withdraw
      </button>
    </div>
  );
};

const DropDown = React.forwardRef(({ onSelect }, ref) => {
  return (
    <div
      ref={ref}
      className="absolute top-11 right-0 w-36 bg-gray-100 px-1 shadow-lg"
    >
      <ul>
        <li
          className="py-2 px-1 hover:bg-gray-200 cursor-pointer"
          onClick={() => onSelect("Demo Account")}
        >
          Demo Account
        </li>
        <li
          className="py-2 px-1 hover:bg-gray-200 cursor-pointer"
          onClick={() => onSelect("Funding Account")}
        >
          Funding Account
        </li>
      </ul>
    </div>
  );
});

export default Navbar;
