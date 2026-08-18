import { createSlice } from "@reduxjs/toolkit";
import {
    getSupplierProfile,
    getSupplierUpdateProfile,
    getSupplierUpdateAvatar,
} from "../../thunks/supplierThunk/supplierProfileThunk";

const initialState = {
    profile: null,
    loading: false,
    updateLoading: false,
    avatarLoading: false,
    error: null,
    updateSuccess: false,
    avatarSuccess: false,
};

const supplierProfileSlice = createSlice({
    name: "supplierProfile",
    initialState,

    reducers: {
        clearSupplierProfileError: (state) => {
            state.error = null;
        },

        clearSupplierProfileSuccess: (state) => {
            state.updateSuccess = false;
            state.avatarSuccess = false;
        },
    },

    extraReducers: (builder) => {
        builder

            .addCase(getSupplierProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getSupplierProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload?.data ?? action.payload;
            })

            .addCase(getSupplierProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getSupplierUpdateProfile.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
                state.updateSuccess = false;
            })

            .addCase(getSupplierUpdateProfile.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.updateSuccess = true;

                state.profile =
                    action.payload?.data ??
                    action.payload ??
                    state.profile;
            })

            .addCase(getSupplierUpdateProfile.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload;
            })

            .addCase(getSupplierUpdateAvatar.pending, (state) => {
                state.avatarLoading = true;
                state.error = null;
                state.avatarSuccess = false;
            })

            .addCase(getSupplierUpdateAvatar.fulfilled, (state, action) => {
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

            .addCase(getSupplierUpdateAvatar.rejected, (state, action) => {
                state.avatarLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    clearSupplierProfileError,
    clearSupplierProfileSuccess,
} = supplierProfileSlice.actions;

export default supplierProfileSlice.reducer;