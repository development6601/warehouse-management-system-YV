import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSupplierProfileApi, getSupplierUpdateAvatarApi, getSupplierUpdateProfileApi } from "../../../api/profile.api";


export const getSupplierProfile = createAsyncThunk(
    "supplier/profile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getSupplierProfileApi();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);

export const getSupplierUpdateProfile = createAsyncThunk(
    "supplier/updateProfile",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await getSupplierUpdateProfileApi(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);

export const getSupplierUpdateAvatar = createAsyncThunk(
    "supplier/updateAvatar",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await getSupplierUpdateAvatarApi(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);