import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

// this wraps my app so I can access auth (user, login, logout) anywhere
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // stores logged-in user
  const [loading, setLoading] = useState(true); // used while checking auth on page load

  const login = (data) => {
    // save token so user stays logged in after refresh
    localStorage.setItem("token", data.token);
    setUser(data);
  };

  const logout = () => {
    // remove token and reset user
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    // runs once on app load to check if user is already logged in
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      // if no token, skip and stop loading
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // hit protected route to get current user
        const { data } = await API.get("/users/me");
        setUser(data);
      } catch {
        // if token is invalid, remove it
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    // makes auth data/functions available everywhere in my app
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook so I can easily use auth anywhere
export const useAuth = () => useContext(AuthContext);
