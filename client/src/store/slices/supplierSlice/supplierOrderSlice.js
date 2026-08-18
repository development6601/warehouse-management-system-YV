import { createSlice } from "@reduxjs/toolkit";

import {
    getSupplierOrders,
    getSupplierOrderById,
} from "../../thunks/supplierThunk/supplierOrderThunk";

const initialState = {
    orders: [],
    selectedOrder: null,

    loading: false,
    detailsLoading: false,

    error: null,
    detailsError: null,
};

const supplierOrderSlice = createSlice({
    name: "supplierOrder",

    initialState,

    reducers: {
        clearSelectedSupplierOrder: (state) => {
            state.selectedOrder = null;
            state.detailsError = null;
        },

        clearSupplierOrderError: (state) => {
            state.error = null;
            state.detailsError = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // ==================================
            // GET SUPPLIER ORDERS
            // ==================================

            .addCase(
                getSupplierOrders.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getSupplierOrders.fulfilled,
                (state, action) => {
                    state.loading = false;

                    state.orders =
                        action.payload.orders || [];
                }
            )

            .addCase(
                getSupplierOrders.rejected,
                (state, action) => {
                    state.loading = false;

                    state.error =
                        action.payload ||
                        "Failed to fetch orders";
                }
            )

            // ==================================
            // GET SUPPLIER ORDER BY ID
            // ==================================

            .addCase(
                getSupplierOrderById.pending,
                (state) => {
                    state.detailsLoading = true;
                    state.detailsError = null;
                }
            )

            .addCase(
                getSupplierOrderById.fulfilled,
                (state, action) => {
                    state.detailsLoading = false;

                    state.selectedOrder =
                        action.payload.order;
                }
            )

            .addCase(
                getSupplierOrderById.rejected,
                (state, action) => {
                    state.detailsLoading = false;

                    state.detailsError =
                        action.payload ||
                        "Failed to fetch order details";
                }
            );
    },
});

export const {
    clearSelectedSupplierOrder,
    clearSupplierOrderError,
} = supplierOrderSlice.actions;

export default supplierOrderSlice.reducer;