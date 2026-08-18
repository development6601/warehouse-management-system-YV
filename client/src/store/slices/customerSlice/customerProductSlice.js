import { createSlice } from "@reduxjs/toolkit";

import {
    getCustomerProducts,
    getCustomerProductById,
    getCustomerProductsByCategory,
    searchCustomerProducts
} from "../../thunks/customerThunk/customerProductThunk";


const initialState = {
    products: [],
    pagination: {
        page: 1,
        limit: 7,
        total: 0,
        totalPages: 0
    },
    selectedProduct: null,

    loading: false,
    detailsLoading: false,

    error: null,
    detailsError: null,
};



const customerProductSlice = createSlice({
    name: "customerProduct",
    initialState,
    reducers: {
        clearCustomerProductError: (state) => {
            state.error = null;
        },
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
            state.detailsError = null;
        }

    },

    extraReducers: (builder) => {
        builder

            .addCase(
                getCustomerProducts.pending,
                (state) => {
                    state.loading = true;
                 
                }
            )

            .addCase(
                getCustomerProducts.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.products = action.payload.products || [];
                    state.pagination = action.payload.pagination || { page: 1, limit: 7, total: 0, totalPages: 0 };;
                }
            )

            .addCase(
                getCustomerProducts.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;

                }
            )

            .addCase(
                getCustomerProductById.pending,
                (state) => {
                    state.detailsLoading = true;
                    state.detailsError = null;
                    state.selectedProduct = null;
                }
            )

            .addCase(
                getCustomerProductById.fulfilled,
                (state, action) => {
                    state.detailsLoading = false;
                    state.selectedProduct =
                        action.payload.data;
                }
            )

            .addCase(
                getCustomerProductById.rejected,
                (state, action) => {
                    state.detailsLoading = false;
                    state.detailsError =
                        action.payload ||
                        "Failed to fetch product";
                }
            )

            .addCase(
                getCustomerProductsByCategory.pending,
                (state) => {
                    state.loading = true;
                }
            )

            .addCase(
                getCustomerProductsByCategory.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.products = action.payload.data;
                }
            )

            .addCase(
                getCustomerProductsByCategory.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )


            .addCase(
                searchCustomerProducts.pending,
                (state) => {
                    state.loading = true;
                }
            )

            .addCase(
                searchCustomerProducts.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.products = action.payload.data;
                }
            )

            .addCase(
                searchCustomerProducts.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    }
});


export const {
    clearCustomerProductError,
    clearSelectedProduct
} = customerProductSlice.actions;


export default customerProductSlice.reducer;