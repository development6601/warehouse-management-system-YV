import { createSlice } from "@reduxjs/toolkit";
import {
    getProducts,
    createProduct,
    deleteProduct,
    getStockHistory,
    getProductById,
    updateProduct,
} from "../../thunks/adminThunk/adminProductThunk";

const initialState = {
    products: [],

    pagination: {
        page: 1,
        limit: 7,
        total: 0,
        totalPages: 0
    },
    selectedProduct: null,
    stockHistory: [],

    loading: false,
    detailsLoading: false,

    error: null,
    detailsError: null,
};


const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
            state.detailsError = null;
        },
    },

    extraReducers: (builder) => {
        builder

            .addCase(
                getProducts.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getProducts.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.products = action.payload.products;
                    state.pagination = action.payload.pagination;
                }
            )


            .addCase(
                getProducts.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to fetch products";
                }
            )

            .addCase(
                createProduct.fulfilled,
                (state, action) => {
                    state.products.unshift(
                        action.payload.data
                    );
                }
            )

            .addCase(
                getProductById.pending,
                (state) => {
                    state.detailsLoading = true;
                    state.detailsError = null;
                    state.selectedProduct = null;
                }
            )

            .addCase(
                getProductById.fulfilled,
                (state, action) => {
                    state.detailsLoading = false;
                    state.selectedProduct = action.payload.data;
                }
            )

            .addCase(
                getProductById.rejected,
                (state, action) => {
                    state.detailsLoading = false;
                    state.detailsError = action.payload || "Failed to fetch product";
                }
            )

            .addCase(
                updateProduct.fulfilled,
                (state, action) => {
                    const updatedProduct = action.payload.data;
                    state.selectedProduct = updatedProduct;
                    state.products = state.products.map(
                        (product) => product._id ===
                            updatedProduct._id
                            ? updatedProduct
                            : product
                    );
                }
            )

            .addCase(
                deleteProduct.fulfilled,
                (state, action) => {
                    state.products = state.products.filter(
                        (item) =>
                            item._id !==
                            action.payload.id
                    );
                    if (state.selectedProduct?._id === action.payload.id) {
                        state.selectedProduct = null;
                    }
                }
            )

            .addCase(
                getStockHistory.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getStockHistory.fulfilled,
                (state, action) => {
                    state.loading = false;

                    state.stockHistory =
                        action.payload.data;
                }
            )

            .addCase(
                getStockHistory.rejected,
                (state, action) => {
                    state.loading = false;

                    state.error =
                        action.payload ||
                        "Failed to load stock history";
                }
            );
    },
});

export const {
    clearSelectedProduct,
} = productSlice.actions;

export default productSlice.reducer;
