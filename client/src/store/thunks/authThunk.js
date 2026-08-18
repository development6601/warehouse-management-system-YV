import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, signupApi, forgotPasswordApi, resetPasswordApi, logoutApi } from "../../api/auth.api";



export const login = createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {
            const response = await loginApi(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);



export const signup = createAsyncThunk(
    "auth/signup",
    async (data, { rejectWithValue }) => {
        try {
            const response = await signupApi(data);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Signup failed"
            );
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await logoutApi();
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "logout failed"
            );
        }
    }
)


export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (data , { rejectWithValue }) => {
        console.log("THUNK DATA:", data);
        try {
            const response = await forgotPasswordApi(data);
            console.log("API RESPONSE:", response.data);
            return response.data;
        } catch (error) {
            console.log("API ERROR:", error.response);
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to send reset email"
            );
        }
    }
);

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async ( { token, data } , { rejectWithValue }) => {
        try {
            const response = await resetPasswordApi(token, data);
            console.log("API RESPONSE:", response.data);
            return response.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Password reset failed"
            );

        }
    }
);


