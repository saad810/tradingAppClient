import { createContext, useEffect, useState } from "react";
// import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
export const TradingContext = createContext();

const TradingProvider = ({ children }) => {
  const { setAuth } = useAuth();
  const [demoBalance, setDemoBalance] = useState(1000);
  const [accType, setAccType] = useState("Demo");
  useEffect(() => {
    if (demoBalance <= 0) {
      setAuth((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          demoAllowed: false,
        },
      }));
      setDemoBalance(0);
    }
  }, [demoBalance]);

  const getAccountType = () => {};

  const getRealBalance = () => {};

  return (
    <TradingContext.Provider
      value={{
        demoBalance,
        setDemoBalance,
        accType,

      }}
    >
      {children}
    </TradingContext.Provider>
  );
};

export default TradingProvider;
