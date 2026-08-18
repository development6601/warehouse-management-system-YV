import { createSlice } from "@reduxjs/toolkit";
import { getSupplierDashboard } from "../../thunks/supplierThunk/supplierDashboardThunk";

const initialState = {
    dashboard: null,
    loading: false,
    error: null,
};

const supplierDashboardSlice = createSlice({
    name: "supplierDashboard",
    initialState,

    reducers: {
        clearSupplierDashboardError: (state) => {
            state.error = null;
        },

        clearSupplierDashboard: (state) => {
            state.dashboard = null;
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

            .addCase(
                getSupplierDashboard.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getSupplierDashboard.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.dashboard = action.payload?.data ?? action.payload;
                }
            )

            .addCase(
                getSupplierDashboard.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to load dashboard";
                }
            );
    },
});


export const {
    clearSupplierDashboardError,
    clearSupplierDashboard,
} = supplierDashboardSlice.actions;


export default supplierDashboardSlice.reducer;
