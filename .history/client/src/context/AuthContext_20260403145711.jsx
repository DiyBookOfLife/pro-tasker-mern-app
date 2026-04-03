import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // useEffect(() => {
  //   const loadUser = async () => {
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const { data } = await API.get("/users/me");
  //       setUser(data);
  //     } catch {
  //       localStorage.removeItem("token");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadUser();
  // }, []);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
