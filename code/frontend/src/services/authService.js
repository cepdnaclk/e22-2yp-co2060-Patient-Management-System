// src/services/authService.js
// All auth-related API calls live here.
// Components call these functions — they do not talk to axios directly.

import api from "./axiosClient";

export const authService = {
  signup: async (firstName, lastName, email, password) => {
    const { data } = await api.post("/api/auth/signup", {
      firstName,
      lastName,
      email,
      password,
    });
    return data; // { token, user }
  },

  login: async (email, password) => {
    const { data } = await api.post("/api/auth/login", {
      email,
      password,
    });
    return data; // { token, user }
  },

  // Save to localStorage after successful login/signup
  saveSession: (token, user) => {
    localStorage.setItem("prms_token", token);
    localStorage.setItem("prms_user", JSON.stringify(user));
  },

  // Remove everything on logout
  clearSession: () => {
    localStorage.removeItem("prms_token");
    localStorage.removeItem("prms_user");
  },

  // Get current user from localStorage (survives page refresh)
  getCurrentUser: () => {
    const raw = localStorage.getItem("prms_user");
    return raw ? JSON.parse(raw) : null;
  },

  isLoggedIn: () => !!localStorage.getItem("prms_token"),
};
