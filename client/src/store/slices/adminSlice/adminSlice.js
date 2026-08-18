import { createSlice } from "@reduxjs/toolkit";
import { getAdminDashboard } from "../../thunks/adminThunk/adminThunk";

const initialState = {
    dashboard: null,
    loading: false,
    error: null,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,

    reducers: {
        clearAdminError: (state) => {
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
                    state.dashboard = action.payload;
                }
            )

            .addCase(
                getAdminDashboard.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    },
});

export const {
    clearAdminError,
} = adminSlice.actions;

export default adminSlice.reducer;