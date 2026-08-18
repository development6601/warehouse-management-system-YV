import { createAsyncThunk } from "@reduxjs/toolkit";
import {getAdminDashboardApi,} from "../../../api/dashboard.api";


export const getAdminDashboard = createAsyncThunk(
    "adminDashboard/getDashboard",

    async (_, { rejectWithValue }) => {
        try {
            const response =
                await getAdminDashboardApi();

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to load admin dashboard"
            );
        }
    }
);
