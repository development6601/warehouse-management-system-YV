import api from "./axios";

// Signup
export const signupApi = (data) => {
  return api.post("/auth/signup", data);
};

// Login
export const loginApi = (data) => {
  return api.post("/auth/login", data);
};

// Logout
export const logoutApi = (data)=>{
  return api.post("/auth/logout")
}

// Forgot Password
export const forgotPasswordApi = (data) => {
   console.log("Sending:", data);
  return api.post("/auth/forgot-password", data);
};

// Reset Password
export const resetPasswordApi = (token, data) => {
  return api.post(`/auth/reset-password/${token}`, data);
};