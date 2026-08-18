import axios from "axios";
import { store } from "../utils/injectors/storeInjector";
import {
  updateAccessToken,
  clearCredentials,
} from "../store/slices/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshArray = [];

const processQueue = (error, token = null) => {
  refreshArray.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  refreshArray = [];
};

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    // Never refresh the refresh-token request itself
    if (originalRequest.url === "/auth/refresh-token") {
      store.dispatch(clearCredentials());
      return Promise.reject(error);
    }


    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshArray.push({
          resolve,
          reject,
        });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;

          return api(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;

    const currentRefreshToken =
      store.getState().auth.refreshToken;

    if (!currentRefreshToken) {
      store.dispatch(clearCredentials());
      return Promise.reject(error);
    }

    isRefreshing = true;

    try {
      console.log("Refreshing token...");

      const response = await api.post("/auth/refresh-token", {
        refreshToken: currentRefreshToken,
      });

      const {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      } = response.data.data;


      if (!newAccessToken) {
        throw new Error("Refresh API did not return accessToken");
      }

      store.dispatch(
        updateAccessToken({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        })
      );

      processQueue(null, newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
    
      processQueue(refreshError, null);
      store.dispatch(clearCredentials());
      
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
