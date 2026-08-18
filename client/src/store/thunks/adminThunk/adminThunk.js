import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAdminDashboardApi } from "../../../api/admin.api";


export const getAdminDashboard = createAsyncThunk(
    "admin/dashboard",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAdminDashboardApi();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);