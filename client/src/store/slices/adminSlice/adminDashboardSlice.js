import { createSlice } from "@reduxjs/toolkit";
import { getAdminDashboard, } from "../../thunks/adminThunk/adminDashboardThunk";

const initialState = {
    dashboard: null,
    loading: false,
    error: null,
};

const adminDashboardSlice = createSlice({
    name: "adminDashboard",
    initialState,

    reducers: {
        clearAdminDashboardError: (state) => {
            state.error = null;
        },

        clearAdminDashboard: (state) => {
            state.dashboard = null;
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

            .addCase(
                getAdminDashboard.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getAdminDashboard.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.dashboard = action.payload?.data ?? action.payload;
                }
            )

            .addCase(
                getAdminDashboard.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to load dashboard";
                }
            );
    },
});


export const {
    clearAdminDashboardError,
    clearAdminDashboard,
} = adminDashboardSlice.actions;


export default adminDashboardSlice.reducer;
