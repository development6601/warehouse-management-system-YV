import { createSlice } from "@reduxjs/toolkit";
import {
    getSupplierProducts,
    createSupplierProduct,
    getSupplierProductById,
    updateSupplierProduct,
    deleteSupplierProduct,
    updateSupplierStock,
    getSupplierProductsByCategory,
    getSupplierStockHistory
} from "../../thunks/supplierThunk/supplierProductThunk";


const initialState = {
    products: [],
    pagination: {
        page: 1,
        limit: 7,
        total: 0,
        totalPages: 0
    },
    selectedProduct: null,
    product: null,
    stockHistory: [],
    detailsLoading: false,
    loading: false,
    error: null,
    detailsError: null,
};

const supplierProductSlice = createSlice({
    name: "supplierProduct",
    initialState,
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
            state.detailsError = null;
        },
        clearProductError: (state) => {
            state.error = null;
        }
    },

    extraReducers: (builder) => {

        builder
            .addCase(getSupplierProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSupplierProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.pagination = action.payload.pagination;
            })
            .addCase(getSupplierProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createSupplierProduct.fulfilled, (state, action) => {
                state.products.unshift(action.payload.data);
            })

            .addCase(getSupplierProductById.pending, (state) => {
                state.detailsLoading = true;
                state.detailsError = null;
                state.selectedProduct = null;
            })

            .addCase(getSupplierProductById.fulfilled, (state, action) => {
                state.detailsLoading = false;
                state.selectedProduct = action.payload.data;
            })

            .addCase(getSupplierProductById.rejected, (state, action) => {
                state.detailsLoading = false;
                state.detailsError = action.payload;
            })

            .addCase(updateSupplierProduct.fulfilled, (state, action) => {

                const index = state.products.findIndex(
                    item => item._id === action.payload.data._id
                );

                if (index !== -1) {
                    state.products[index] = action.payload.data;
                }

                state.product = action.payload.data;

            })


            .addCase(deleteSupplierProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(
                    item => item._id !== action.payload.id
                );
            })


            .addCase(updateSupplierStock.fulfilled, (state, action) => {

                const index = state.products.findIndex(
                    item => item._id === action.payload.data._id
                );

                if (index !== -1) {
                    state.products[index] = action.payload.data;
                }

            })


            .addCase(getSupplierProductsByCategory.fulfilled, (state, action) => {
                state.products = action.payload.data;
            })


            .addCase(getSupplierStockHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSupplierStockHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.stockHistory = action.payload.data;
            })
            .addCase(getSupplierStockHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    }
});

export const {
    clearProductError,
    clearSelectedProduct
} = supplierProductSlice.actions;

export default supplierProductSlice.reducer;