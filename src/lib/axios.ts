import config from "@/config";
import axios, { type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

let isRefreshing = false;

let pendingQueue: {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
  pendingQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null);
    }
  });

  pendingQueue = [];
};

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      const msg = (error.response?.data?.message as string) ?? "";

      if (msg.includes("expired")) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            pendingQueue.push({ resolve, reject });
          })
            .then(() => axiosInstance(originalRequest))
            .catch((error) => Promise.reject(error));
        }

        isRefreshing = true;
        try {
          const refreshRes = await axiosInstance.post("/auth/refresh-token");
          const newToken = refreshRes.data?.data?.accessToken;
          if (newToken) {
            sessionStorage.setItem("token", newToken);
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }

          processQueue(null);

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          sessionStorage.removeItem("token");
          window.location.href = "/login";
          processQueue(refreshError);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      sessionStorage.removeItem("token");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
