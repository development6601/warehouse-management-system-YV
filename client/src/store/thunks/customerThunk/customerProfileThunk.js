import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCustomerProfileApi, getCustomerUpdateAvatarApi, getCustomerUpdateProfileApi } from "../../../api/profile.api";



export const getCustomerProfile = createAsyncThunk(
    "customer/profile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getCustomerProfileApi();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);

export const getCustomerUpdateProfile = createAsyncThunk(
    "customer/updateProfile",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await getCustomerUpdateProfileApi(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);

export const getCustomerUpdateAvatar = createAsyncThunk(
    "customer/updateAvatar",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await getCustomerUpdateAvatarApi(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);