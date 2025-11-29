// src/context/AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("authToken", token);
  };

  const register = (name, email, password) => {
    // 🆕 Mock register logic
    setUser({
      name,
      email,
      password,
      roles: ["Client", "Contributor"],
      activeRole: "Contributor",
      needsOnboarding: true, // New users require onboarding
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
  };

  const completeOnboarding = () => {
    setUser((prev) => ({ ...prev, needsOnboarding: false }));
  };

  const switchRole = (newRole) => {
    setUser((prev) => ({
      ...prev,
      activeRole: newRole,
    }));
  };

  return (
    <AuthContext.Provider value={{ user, login, setUser, register, logout, switchRole, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// export function useAuth() {
//   return useContext(AuthContext);
// }
