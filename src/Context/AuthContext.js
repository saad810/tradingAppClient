import { useState, createContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "../api/axios";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // const navigate = useNavigate();
  const [auth, setAuth] = useLocalStorage("auth", null);
  const [currentAccount, setCurrentAccount] = useState("demo");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/auth/login/success", {
          withCredentials: true,
        });
        if (response.data.success) {
          console.log(response.data.user);
          setAuth(response.data.user); // Update with user data
        } else {
          setAuth(null); // Set to null if not authenticated
        }
      } catch (error) {
        setAuth(null); // Handle error by setting auth to null
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setAuth]);

  const logout = async () => {
    try {
      const response = await axios.get("/auth/logout", {
        withCredentials: true,
      });
      console.log(response.data);
      if (response.data.success) {
        setAuth(""); // Clear auth state
        toast.success("Logged out successfully", { autoClose: 2000 });
        window.location.href = "http://localhost:3000/auth";
        // Redirect to login or another appropriate page
      } else {
        toast.error("Logout failed", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed", { autoClose: 2000 });
    }
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
