import { createSlice } from "@reduxjs/toolkit";

import {
    getAdminOrders,
    getAdminOrderById,
    updateAdminOrderStatus,
    cancelAdminOrder,
    editAdminOrder,
} from "../../thunks/adminThunk/adminOrderThunk";


const initialState = {
    orders: [],
    selectedOrder: null,
    loading: false,
    detailsLoading: false,
    actionLoading: false,
    error: null,
    detailsError: null,
    actionError: null,
    successMessage: null,
};


const adminOrderSlice = createSlice({
    name: "adminOrder",
    initialState,
    reducers: {
        clearSelectedAdminOrder: (state) => {
            state.selectedOrder = null;
            state.detailsError = null;
        },

        clearAdminOrderError: (state) => {
            state.error = null;
            state.detailsError = null;
            state.actionError = null;
        },

        clearAdminOrderSuccess: (state) => {
            state.successMessage = null;
        },
    },


    extraReducers: (builder) => {
        builder

            .addCase(
                getAdminOrders.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getAdminOrders.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.orders = action.payload.orders || [];
                }
            )

            .addCase(
                getAdminOrders.rejected,
                (state, action) => {

                    state.loading = false;
                    state.error = action.payload || "Failed to fetch orders";
                }
            )


            .addCase(
                getAdminOrderById.pending,
                (state) => {
                    state.detailsLoading = true;
                    state.detailsError = null;
                    state.selectedOrder = null;
                }
            )

            .addCase(
                getAdminOrderById.fulfilled,
                (state, action) => {
                    state.detailsLoading = false;
                    state.selectedOrder = action.payload.order;
                }
            )

            .addCase(
                getAdminOrderById.rejected,
                (state, action) => {
                    state.detailsLoading = false;
                    state.detailsError = action.payload || "Failed to fetch order";
                }
            )

            .addCase(
                updateAdminOrderStatus.pending,
                (state) => {
                    state.actionLoading = true;
                    state.actionError = null;
                }
            )

            .addCase(
                updateAdminOrderStatus.fulfilled,
                (state, action) => {

                    state.actionLoading = false;
                    state.successMessage = action.payload.message || "Order status updated successfully";

                    // Update selected order
                    if (state.selectedOrder) {
                        state.selectedOrder.status = action.payload.order?.status;
                    }
                }
            )

            .addCase(
                updateAdminOrderStatus.rejected,
                (state, action) => {

                    state.actionLoading = false;
                    state.actionError = action.payload || "Failed to update status";
                }
            )

            .addCase(
                cancelAdminOrder.pending,
                (state) => {
                    state.actionLoading = true;
                    state.actionError = null;
                }
            )

            .addCase(
                cancelAdminOrder.fulfilled,
                (state, action) => {
                    state.actionLoading = false;
                    state.successMessage = action.payload.message || "Order cancelled successfully";

                    if (state.selectedOrder) {
                        state.selectedOrder.status = "cancelled";
                    }
                }
            )

            .addCase(
                cancelAdminOrder.rejected,
                (state, action) => {
                    state.actionLoading = false;
                    state.actionError = action.payload || "Failed to cancel order";
                }
            )

            .addCase(
                editAdminOrder.pending,
                (state) => {
                    state.actionLoading = true;
                    state.actionError = null;
                }
            )

            .addCase(
                editAdminOrder.fulfilled,
                (state, action) => {

                    state.actionLoading = false;
                    state.successMessage = action.payload.message || "Order updated successfully";
                    state.selectedOrder = action.payload.order;
                }
            )

            .addCase(
                editAdminOrder.rejected,
                (state, action) => {
                    state.actionLoading = false;
                    state.actionError = action.payload || "Failed to edit order";
                }
            );
    },
});


export const {
    clearSelectedAdminOrder,
    clearAdminOrderError,
    clearAdminOrderSuccess,
} = adminOrderSlice.actions;


export default adminOrderSlice.reducer;