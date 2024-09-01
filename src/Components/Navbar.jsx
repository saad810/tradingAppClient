import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useDemoTrade from "../hooks/useDemoTrade";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, currentAccount, setCurrentAccount } = useAuth();
  const { demoBalance } = useDemoTrade();
  const [show, setShow] = useState(false);

  const demoAllowed = auth && auth.user && auth.user.demoAllowed;

  const toggleSidebar = () => {
    setShow(!show);
  };

  const navigateLogin = () => {
    navigate("/auth");
  };

  const navigateSignup = () => {
    navigate("/auth/signup");
  };

  const handleSwitchAccount = () => {
    if (auth && auth.user && auth.user.verified) {
      if (currentAccount === "demo") {
        setCurrentAccount("real");
      } else {
        setCurrentAccount("demo");
      }
    } else {
      navigate("/verify");
    }
  };

  return (
    <>
      <nav className="container mx-auto px-10 bg-primary py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button onClick={toggleSidebar}>
              <RxHamburgerMenu className="text-3xl text-white" />
            </button>
            <ul className="flex items-center gap-4">
              <li className="text-white text-base">
                <Link to="/">Home</Link>
              </li>
              <li className="text-primaryblue-200 text-base">
                <Link to="/chat">Chat with AI</Link>
              </li>
              {auth && auth.user ? (
                <li className="text-white text-base">
                  <Link to="markets">Markets</Link>
                </li>
              ) : null}
            </ul>
          </div>
          {auth && auth.token ? (
            <div className="relative flex gap-2 items-center">
              {demoAllowed ? (
                <>
                  {currentAccount === "demo" ? (
                    <div className="flex items-center gap-2 mr-3">
                      <span className="font-medium text-base text-primaryblue-200">
                        Balance
                      </span>
                      <span className="font-semibold text-lg text-primaryblue-200">
                        {parseFloat(demoBalance.toFixed(2))} USD
                      </span>
                    </div>
                  ) : (
                    <FundsActions />
                  )}
                  <button
                    className="bg-white py-1 px-2 text-base text-primary rounded"
                    onClick={handleSwitchAccount}
                  >
                    Switch Account
                  </button>
                </>
              ) : (
                <FundsActions />
              )}
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <button
                className="bg-white py-1 px-4 text-base text-primary rounded"
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

const FundsActions = () => (
  <div className="flex items-center gap-3">
    <button className="bg-white py-1 px-3 text-base text-primary rounded">
      Deposit
    </button>
    <button className="bg-secondary py-1 px-3 text-base text-white rounded">
      Withdraw
    </button>
  </div>
);

export default Navbar;
