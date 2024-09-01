import { useState, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("auth", null);
  const [currentAccount, setCurrentAccount] = useState("demo"); // Initialize with "demo" or "real"

  console.log("auth", auth);

  return (
    <AuthContext.Provider value={{ auth, setAuth, currentAccount, setCurrentAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
