import api from "./axiosClient";

export const authService = {
  signup: async (firstName, lastName, email, password, mobileNumber) => {
    const { data } = await api.post("/api/auth/signup", {
      firstName,
      lastName,
      email,
      password,
      mobileNumber,
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

  saveSession: (token, user) => {
    localStorage.setItem("pms_token", token);
    localStorage.setItem("pms_user", JSON.stringify(user));
  },

  clearSession: () => {
    localStorage.removeItem("pms_token");
    localStorage.removeItem("pms_user");
  },

  getCurrentUser: () => {
    const raw = localStorage.getItem("pms_user");
    return raw ? JSON.parse(raw) : null;
  },

  isLoggedIn: () => !!localStorage.getItem("pms_token"),
};
