import { createSlice } from "@reduxjs/toolkit";
import {
    fetchSupplierCategories,
    getSupplierCategoryById,
} from "../../thunks/supplierThunk/supplierCategoryThunk"


const initialState = {
    categories: [],
    selectedCategory: null,
    loading: false,
    error: null,
    success: false,
};

const supplierCategorySlice = createSlice({
    name: "supplierCategory",
    initialState,

    reducers: {
        clearCategoryError: (state) => {
            state.error = null;
        },

        clearSelectedCategory: (state) => {
            state.selectedCategory = null;
        },

        clearCategorySuccess: (state) => {
            state.success = false;
        },
    },

    extraReducers: (builder) => {
        builder

            // GET ALL CATEGORIES
            .addCase(
                fetchSupplierCategories.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                fetchSupplierCategories.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.error = null;
                    state.categories = action.payload.data;
                    
                }
            )

            .addCase(
                fetchSupplierCategories.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )

            // GET CATEGORY BY ID
            .addCase(
                getSupplierCategoryById.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getSupplierCategoryById.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.selectedCategory =
                        action.payload.data;
                }
            )

            .addCase(
                getSupplierCategoryById.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    },
});

export const {
    clearCategoryError,
    clearSelectedCategory,
    clearCategorySuccess,
} = supplierCategorySlice.actions;

export default supplierCategorySlice.reducer;