import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSupplierDashboardApi } from "../../../api/dashboard.api";



export const getSupplierDashboard = createAsyncThunk(
    "supplierDashboard/getDashboard",
    async (_, { rejectWithValue }) => {
        try {
            const response =await getSupplierDashboardApi();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to load supplier dashboard"
            );
        }
    }
);
