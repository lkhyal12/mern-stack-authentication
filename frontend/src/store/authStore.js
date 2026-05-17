import axios from "axios";
import { create } from "zustand";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  console.log({ accessToken });
  if (accessToken) {
    console.log("hhhhhhhhhhhhhh");
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log({ originalRequest });

    if (
      error?.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/refresh"
    ) {
      originalRequest._retry = true;
      try {
        const response = await api.get("/refresh", {
          withCredentials: true,
        });
        const newAccessToken = response.data.accessToken;
        useAuthStore.setState({ accessToken: newAccessToken });

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        useAuthStore.setState({
          accessToken: null,
          user: null,
        });

        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);
export const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: false,
  isCheckingAuth: false,
  accessToken: null,
  error: "some error occured",

  // sign up function
  signUp: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/signup", { name, email, password });
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
      console.log({ response });
      set({ accessToken: response.data.accessToken, user: response.data.user });
      return { success: true };
    } catch (err) {
      set({
        error: err.response?.data?.message || "Something went wrong",
      });
      return {
        success: false,
        message: err.response?.data?.message || "something went wrong",
      };
    } finally {
      set({ isLoading: false });
    }
  },
  // logout function
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/logout");
      return { success: true };
    } catch (err) {
      console.log(err?.response?.data?.message || "Something went wrong");
      set({ error: err?.response?.data?.message || "Something went wrong" });
      return { success: false };
    } finally {
      set({ isLoading: false });
    }
  },
  //   verify email function
  verifyEmail: async (email, code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/verify-email", { email, code });
      set({ isLoading: false });
      return { success: true };
    } catch (err) {
      set({
        error: err?.response?.data?.message || "Something went wrong",
        isLoading: false,
      });
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
  resetPassword: async (password, code, id) => {
    set({ isLoading: true, error: null });
    try {
      const resetPassword = await api.post(`/reset-password/${code}`, {
        id,
        password,
      });
      set({ isLoading: false });
      return { success: true };
    } catch (err) {
      set({ error: err.response?.data?.message || "Something went wrong" });
      return { success: false };
    }
  },
  // getUser function
  getUser: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${get().accessToken}`,
          "Content-Type": "application/json",
        },
      });
      set({ user: response.data.user, accessToken: response.data.accessToken });
      return { success: true };
    } catch (err) {
      console.log(err?.response?.data?.message || err);
      set({ error: err?.response?.data?.message || "Something went wrong" });
      return { success: false };
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
