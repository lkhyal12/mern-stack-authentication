import axios from "axios";
import { create } from "zustand";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  isCheckingAuth: true,
  accessToken: null,
  error: null,
  signUp: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/sign-up", { name, email, password });
      set({ accessToken: response.data.accessToken, user: response.data.user });
      return { success: true };
    } catch (err) {
      set({
        error:
          err.response?.data?.message || "Something went wrong try again later",
      });
      return { success: false };
    } finally {
      set({ isLoading: false });
    }
  },
  //   login function
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/login", { email, password });
      set({ accessToken: response.data.accessToken, user: response.data.user });
      return { success: true };
    } catch (err) {
      set({ error: err.response?.data?.message || "Something went wrong" });
      return { success: false };
    } finally {
      set({ isLoading: false });
    }
  },
  //   verify email function
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/verify-email", { code });
      set({ isLoading: false });
    } catch (err) {
      set({ error: err?.response?.data?.message || "Something went wrong" });
      return { success: false };
    }
  },

  // forgot password function
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/forgot-password", { email });
      set({ isLoading: false });
      return { success: true };
    } catch (err) {
      set({ error: err?.response?.data?.message || "Something went wrong" });

      return { success: false };
    }
  },

  //   reset password function
  resetPassword: async (password, code, email) => {
    set({ isLoading: true, error: null });
    try {
      const resetPassword = await api.post(`/reset-password/${code}`, {
        email,
        password,
      });
      set({ isLoading: false });
      return { success: true };
    } catch (err) {
      set({ error: err.response?.data?.message || "Something went wrong" });
      return { success: false };
    }
  },
}));
