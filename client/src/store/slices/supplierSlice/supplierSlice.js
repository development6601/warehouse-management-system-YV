import { createSlice } from "@reduxjs/toolkit";
import {
    fetchSuppliers,
    getSupplierById,
    updateSupplier,
    disableSupplier
} from "../../thunks/supplierThunk/supplierThunk";

const initialState = {
    suppliers: [],
    selectedSupplier: null,
    loading: false,
    error: null,
    success: false
};

const supplierSlice = createSlice({

    name: "supplier",
    initialState,
    reducers: {
        clearSupplierError: (state) => {
            state.error = null;
        },

        clearSelectedSupplier: (state) => {
            state.selectedSupplier = null;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchSuppliers.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchSuppliers.fulfilled, (state, action) => {
                state.loading = false;
                state.suppliers = action.payload;
            })

            .addCase(fetchSuppliers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getSupplierById.fulfilled, (state, action) => {
                state.selectedSupplier = action.payload;
            })

            .addCase(updateSupplier.fulfilled, (state, action) => {
                state.success = true;
                const index = state.suppliers.findIndex(
                    item => item._id === action.payload._id
                );
                if (index !== -1) {
                    state.suppliers[index] = action.payload;
                }
            })

            .addCase(disableSupplier.fulfilled, (state, action) => {
                const index = state.suppliers.findIndex(
                    item => item._id === action.payload._id
                );
                if (index !== -1) {
                    state.suppliers[index] = action.payload;
                }
            });
    }
});

export const {
    clearSupplierError,
    clearSelectedSupplier
} = supplierSlice.actions;

export default supplierSlice.reducer;