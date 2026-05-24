import { useCallback, useMemo, useState } from "react";
import api from "../lib/api";
import { AuthContext } from "./auth";

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(readStoredUser);

  const saveSession = useCallback((data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  }, []);

  const login = useCallback(async (payload) => {
    const { data } = await api.post("/api/auth/login", payload);
    if (data.success) saveSession(data);
    return data;
  }, [saveSession]);

  const register = useCallback(async (payload) => {
    const { data } = await api.post("/api/auth/register", payload);
    if (data.success) saveSession(data);
    return data;
  }, [saveSession]);

  const forgotPassword = useCallback(async (payload) => {
    const { data } = await api.post("/api/auth/forgot-password", payload);
    return data;
  }, []);

  const resetPassword = useCallback(async (payload) => {
    const { data } = await api.post("/api/auth/reset-password", payload);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      login,
      logout,
      forgotPassword,
      register,
      resetPassword,
      token,
      user,
    }),
    [forgotPassword, login, logout, register, resetPassword, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
