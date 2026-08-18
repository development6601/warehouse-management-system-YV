import { createSlice } from "@reduxjs/toolkit";
import {
    fetchCustomer,
    getCustomerById,
    updateCustomer,
    disableCustomer
} from "../../thunks/customerThunk/customerThunk";

const initialState = {
    customer: [],
    selectedCustomer: null,
    loading: false,
    error: null,
    success: false
};

const customerSlice = createSlice({

    name: "customer",
    initialState,
    reducers: {
        clearCustomerError: (state) => {
            state.error = null;
        },

        clearSelectedCustomer: (state) => {
            state.selectedCustomer = null;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomer.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.customer = action.payload;
            })

            .addCase(fetchCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getCustomerById.fulfilled, (state, action) => {
                state.selectedCustomer = action.payload;
            })

            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.success = true;
                const index = state.customer.findIndex(
                    item => item._id === action.payload._id
                );
                if (index !== -1) {
                    state.customer[index] = action.payload;
                }
            })

            .addCase(disableCustomer.fulfilled, (state, action) => {
                const index = state.customer.findIndex(
                    item => item._id === action.payload._id
                );
                if (index !== -1) {
                    state.customer[index] = action.payload;
                }
            });
    }
});

export const {
    clearCustomerError,
    clearSelectedCustomer
} = customerSlice.actions;

export default customerSlice.reducer;