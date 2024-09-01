import { useState, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("auth", null);
  console.log("auth", auth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
