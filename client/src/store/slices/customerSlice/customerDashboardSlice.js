import { createSlice } from "@reduxjs/toolkit";
import { getCustomerDashboard } from "../../thunks/customerThunk/customerDashboardthunk";

const initialState = {
    dashboard: null,
    loading: false,
    error: null,
};


const customerDashboardSlice = createSlice({
    name: "customerDashboard",
    initialState,

    reducers: {
        clearCustomerDashboardError: (state) => {
            state.error = null;
        },

        clearCustomerDashboard: (state) => {
            state.dashboard = null;
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

            .addCase(
                getCustomerDashboard.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getCustomerDashboard.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.dashboard = action.payload?.data ?? action.payload;
                }
            )

            .addCase(
                getCustomerDashboard.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to load dashboard";
                }
            );
    },
});


export const {
    clearCustomerDashboardError,
    clearCustomerDashboard,
} = customerDashboardSlice.actions;


export default customerDashboardSlice.reducer;
