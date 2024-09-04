import { useState, createContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "../api/axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("auth", null);
  const [currentAccount, setCurrentAccount] = useState("demo");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/auth/login/success", { withCredentials: true })
      .then((response) => {
        if (response.data.success) {
          setAuth(response.data.user); // Update with user data
        } else {
          setAuth("");
        }
        setLoading(false);
      })
      .catch(() => {
        setAuth("");
        setLoading(false);
      });
  }, []);

  const logout = () => {
    axios.get("/auth/logout", { withCredentials: true }).then(() => {
      setAuth(null);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        currentAccount,
        setCurrentAccount,
        logout,
      }}
    >
      {!loading ? children : null}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
