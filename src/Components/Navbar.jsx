import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiSolidDollarCircle } from "react-icons/bi";
import { FaArrowDown, FaArrowUp, FaRobot } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Deposit from "./Payments/Deposit";
import WithDraw from "./Payments/WithDraw";
import SideBar from "./SideBar";
import useDemoTrade from "../hooks/useDemoTrade";
import { RiListSettingsFill } from "react-icons/ri";

const Navbar = () => {
  const { auth } = useAuth();
  const { demoBalance } = useDemoTrade();
  const navigate = useNavigate();
  const [showSideBar, setShowSideBar] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  const toggleMobileNav = () => {
    setShowMobileNav(!showMobileNav);
  };
  const toggleDeposit = () => {
    setShowDeposit(!showDeposit);
  };
  const toggleWithdraw = () => {
    setShowWithdraw(!showWithdraw);
  };
  const handleAccountSwith = () => {
    const currAcc = auth.currAccType;
    if (auth && auth.user && auth.user.verified && auth.user.realTrade) {
      let updatedAccountType;
      // toggle the account type
      if (currAcc === "demo") {
        updatedAccountType = "real";
      } else if (currAcc === "real") {
        updatedAccountType = "demo";
      } else {
        updatedAccountType = "demo";
      }

      // update the local auth obj
      const updatedAuth = {
        ...auth,
        currAccType: updatedAccountType,
      };

      // update the local storage

      localStorage.setItem("auth", JSON.stringify(updatedAuth));
    } else {
      navigate("/verify");
    }
  };
  const navigateLogin = () => {
    navigate("/auth");
  };

  const navigateSignup = () => {
    navigate("/auth/signup");
  };

  return (
    <>
      <nav className="flex items-center justify-between px-12 bg-primary py-3">
        <div className="flex items-center gap-4">
          <button onClick={toggleSideBar}>
            <RxHamburgerMenu className="text-3xl text-white" />
          </button>

          <div className="hidden lg:block ">
            <ul className="flex items-center gap-4">
              <li className="text-white text-base">
                <Link to="/">Home</Link>
              </li>
              <li className="text-primaryblue-200 text-base">
                <Link to="/chat" className="flex items-center gap-2">
                  Chat <FaRobot className="text-lg" />
                </Link>
              </li>
              {auth && auth.user ? (
                <li className="text-white text-base">
                  <Link to="markets">Markets</Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-4">
          {auth && auth.user ? (
            <div className="flex flex-row gap-2">
              {auth && auth.currAccType === "demo" ? null : (
                <FundsActions
                  onDeposit={toggleDeposit}
                  onWithdraw={toggleWithdraw}
                />
              )}
              {/* current account must be demo */}
              <Balance
                demo={auth.currAccType === "demo" ? true : false}
                demoBalance={demoBalance}
                balance={
                  auth.currAccType === "real" ? auth.wallet.balance : null
                }
              />

              <SwitchSelection onSwitch={handleAccountSwith} />
            </div>
          ) : (
            <AuthActions onLogin={navigateLogin} onSignUp={navigateSignup} />
          )}
        </div>
        <button onClick={toggleMobileNav} className="block lg:hidden">
          <RiListSettingsFill className="text-2xl text-primaryblue-100" />
        </button>
      </nav>

      {showSideBar && <SideBar />}
      {showMobileNav && (
        <MobileNav
          auth={auth}
          toggleDeposit={toggleDeposit}
          toggleWithdraw={toggleWithdraw}
          onSwitch={handleAccountSwith}
          demoBalance={demoBalance}
          onLogin={navigateLogin}
          onSignUp={navigateSignup}
        />
      )}
      {showDeposit && <Deposit onClose={() => setShowDeposit(false)} />}
      {showWithdraw && <WithDraw onClose={() => setShowWithdraw(false)} />}
    </>
  );
};

const MobileNav = ({
  auth,
  toggleDeposit,
  toggleWithdraw,
  onSwitch,
  demoBalance,
  onLogin,
  onSignUp,
}) => (
  <nav className="bg-primary p-3 flex items-center flex-col px-16">
    <div>
      <ul className="py-2 flex flex-col gap-2">
        <li className="text-white text-base">
          <Link to="/">Home</Link>
        </li>
        <li className="text-primaryblue-200 text-base">
          <Link to="/chat" className="flex items-center gap-2">
            Chat <FaRobot className="text-lg" />
          </Link>
        </li>
        {auth && auth.user ? (
          <li className="text-white text-base">
            <Link to="markets">Markets</Link>
          </li>
        ) : null}
      </ul>
    </div>
    <div>
      {auth && auth.user ? (
        <div className="flex flex-row gap-2">
          {auth && auth.currAccType === "demo" ? null : (
            <FundsActions
              onDeposit={toggleDeposit}
              onWithdraw={toggleWithdraw}
            />
          )}
          {/* current account must be demo */}
          <Balance
            demo={auth.currAccType === "demo" ? true : false}
            demoBalance={demoBalance}
            balance={auth.currAccType === "real" ? auth.wallet.balance : null}
          />

          <SwitchSelection onSwitch={onSwitch} />
        </div>
      ) : (
        <AuthActions onLogin={onLogin} onSignUp={onSignUp} />
      )}
    </div>
  </nav>
);

const Balance = ({ balance, demo, demoBalance }) => (
  <div>
    <button className="flex items-center gap-2 px-3 py-1.5 text-base text-primaryblue-50 border border-primaryblue-100 rounded">
      <span className="font-bold ">
        {demo
          ? `Demo: ${parseFloat(demoBalance.toFixed(2))}`
          : `Trade: ${parseFloat(balance.toFixed(2))}`}
      </span>
      <BiSolidDollarCircle className="text-2xl" />
    </button>
  </div>
);

const SwitchSelection = ({ onSwitch }) => (
  <button
    className="bg-white p-2 px-3 text-base text-primary rounded flex items-center gap-2 w-min"
    onClick={onSwitch}
  >
    Switch
  </button>
);

const FundsActions = ({ onDeposit, onWithdraw }) => (
  <div className="flex items-center gap-3">
    <button
      className="bg-white p-2 text-base text-primary rounded flex items-center gap-2"
      onClick={onDeposit}
    >
      Deposit <FaArrowDown className="text-primary" />
    </button>
    <button
      className="bg-secondary p-2 text-base text-white rounded flex items-center gap-2"
      onClick={onWithdraw}
    >
      WithDraw <FaArrowUp className="text-white" />
    </button>
  </div>
);

const AuthActions = ({ onLogin, onSignUp }) => (
  <div className="flex items-center gap-3">
    <button
      className="bg-white py-1 px-3 text-base text-primary rounded"
      onClick={onLogin}
    >
      Login
    </button>
    <button
      className="bg-secondary py-1 px-3 text-base text-white rounded"
      onClick={onSignUp}
    >
      Signup
    </button>
  </div>
);

export default Navbar;
