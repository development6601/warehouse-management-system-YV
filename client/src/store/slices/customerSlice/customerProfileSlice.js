import { createSlice } from "@reduxjs/toolkit";
import {
    getCustomerProfile,
    getCustomerUpdateProfile,
    getCustomerUpdateAvatar,
} from "../../thunks/customerThunk/customerProfileThunk";

const initialState = {
    profile: null,
    loading: false,
    updateLoading: false,
    avatarLoading: false,
    error: null,
    updateSuccess: false,
    avatarSuccess: false,
};

const customerProfileSlice = createSlice({
    name: "customerProfile",
    initialState,

    reducers: {
        clearCustomerProfileError: (state) => {
            state.error = null;
        },

        clearCustomerProfileSuccess: (state) => {
            state.updateSuccess = false;
            state.avatarSuccess = false;
        },
    },

    extraReducers: (builder) => {
        builder

            .addCase(getCustomerProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getCustomerProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload?.data ?? action.payload;
            })

            .addCase(getCustomerProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getCustomerUpdateProfile.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
                state.updateSuccess = false;
            })

            .addCase(getCustomerUpdateProfile.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.updateSuccess = true;

                state.profile =
                    action.payload?.data ??
                    action.payload ??
                    state.profile;
            })

            .addCase(getCustomerUpdateProfile.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload;
            })

            .addCase(getCustomerUpdateAvatar.pending, (state) => {
                state.avatarLoading = true;
                state.error = null;
                state.avatarSuccess = false;
            })

            .addCase(getCustomerUpdateAvatar.fulfilled, (state, action) => {
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

            .addCase(getCustomerUpdateAvatar.rejected, (state, action) => {
                state.avatarLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    clearCustomerProfileError,
    clearCustomerProfileSuccess,
} = customerProfileSlice.actions;

export default customerProfileSlice.reducer;