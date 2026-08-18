import { createSlice } from "@reduxjs/toolkit";
import {
    getAdminProfile,
    getAdminUpdateProfile,
    getAdminUpdateAvatar,
} from "../../thunks/adminThunk/adminProfileThunk";

const initialState = {
    profile: null,
    loading: false,
    updateLoading: false,
    avatarLoading: false,
    error: null,
    updateSuccess: false,
    avatarSuccess: false,
};

const adminProfileSlice = createSlice({
    name: "adminProfile",
    initialState,

    reducers: {
        clearAdminProfileError: (state) => {
            state.error = null;
        },

        clearAdminProfileSuccess: (state) => {
            state.updateSuccess = false;
            state.avatarSuccess = false;
        },
    },

    extraReducers: (builder) => {
        builder

            .addCase(getAdminProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getAdminProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload?.data ?? action.payload;
            })

            .addCase(getAdminProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getAdminUpdateProfile.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
                state.updateSuccess = false;
            })

            .addCase(getAdminUpdateProfile.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.updateSuccess = true;

                state.profile =
                    action.payload?.data ??
                    action.payload ??
                    state.profile;
            })

            .addCase(getAdminUpdateProfile.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload;
            })

            
            .addCase(getAdminUpdateAvatar.pending, (state) => {
                state.avatarLoading = true;
                state.error = null;
                state.avatarSuccess = false;
            })

            .addCase(getAdminUpdateAvatar.fulfilled, (state, action) => {
                state.avatarLoading = false;
                state.avatarSuccess = true;

                const updatedProfile =
                    action.payload?.data ?? action.payload;

                if (updatedProfile) {
                    state.profile = {
                        ...state.profile,
                        ...updatedProfile,
                    };
                }
            })

            .addCase(getAdminUpdateAvatar.rejected, (state, action) => {
                state.avatarLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    clearAdminProfileError,
    clearAdminProfileSuccess,
} = adminProfileSlice.actions;

export default adminProfileSlice.reducer;