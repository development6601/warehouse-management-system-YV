import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAdminProfileApi, getAdminUpdateAvatarApi, getAdminUpdateProfileApi } from "../../../api/profile.api";


export const getAdminProfile = createAsyncThunk(
    "admin/profile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAdminProfileApi();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);

export const getAdminUpdateProfile = createAsyncThunk(
    "admin/updateProfile",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await getAdminUpdateProfileApi(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);

export const getAdminUpdateAvatar = createAsyncThunk(
    "admin/updateAvatar",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await getAdminUpdateAvatarApi(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);