import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCustomerDashboardApi } from "../../../api/dashboard.api";


export const getCustomerDashboard = createAsyncThunk(
    "customerDashboard/getDashboard",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getCustomerDashboardApi();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to load customer dashboard"
            );
        }
    }
);
