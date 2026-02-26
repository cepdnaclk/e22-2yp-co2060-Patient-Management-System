// src/features/auth/AuthContext.jsx
// React Context makes data available to every component without prop-drilling.
// "Prop drilling" = passing data down 5 levels of components — messy.
// Context = declare once at the top, use anywhere below.

import { createContext, useContext, useState } from "react";
import { authService } from "../../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Initialize from localStorage so user stays logged in on page refresh.
  const [user, setUser] = useState(() => authService.getCurrentUser());

  const saveLogin = (token, userData) => {
    authService.saveSession(token, userData);
    setUser(userData);
  };

  const logout = () => {
    authService.clearSession();
    setUser(null);
  };

  // Computed role booleans — use in components to show/hide UI
  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
  const isDoctor = user?.role === "DOCTOR";
  const isNurse = user?.role === "NURSE";
  const isPatient = user?.role === "PATIENT";

  return (
    <AuthContext.Provider
      value={{
        user, // { id, firstName, lastName, email, role }
        saveLogin, // call after login/signup
        logout, // call on logout button click
        isLoggedIn: !!user,
        isAdmin,
        isDoctor,
        isNurse,
        isPatient,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook — import this in any component
// const { user, isDoctor, logout } = useAuth();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
