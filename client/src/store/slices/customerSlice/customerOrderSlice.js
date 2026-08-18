import { createSlice } from "@reduxjs/toolkit";
import {
    createOrder,
    getCustomerOrders,
    getCustomerOrderTracking,
    cancelCustomerOrder,
} from "../../thunks/customerThunk/customerOrderThunks";


const initialState = {
    
    customerOrders: [],
    customerOrderTracking: null,
    createdOrder: null,
    loading: false,
    error: null,
    success: false,
    message: null,
};


const orderSlice = createSlice({
    name: "order",
    initialState,

    reducers: {

        clearOrderError: (state) => {
            state.error = null;
        },

        clearOrderSuccess: (state) => {
            state.success = false;
            state.message = null;
        },

        clearCreatedOrder: (state) => {
            state.createdOrder = null;
        },

        clearCustomerOrderTracking: (state) => {
            state.customerOrderTracking = null;
        },


        clearOrderState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.message = null;
        },
    },


    extraReducers: (builder) => {

        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;

                state.createdOrder =
                    action.payload.order;

                state.message =
                    action.payload.message;
            })

            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });

        builder
            .addCase(getCustomerOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(
                getCustomerOrders.fulfilled,
                (state, action) => {
                    state.loading = false;

                    state.customerOrders =
                        action.payload.orders || [];
                }
            )

            .addCase(
                getCustomerOrders.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );


        builder
            .addCase(
                getCustomerOrderTracking.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getCustomerOrderTracking.fulfilled,
                (state, action) => {
                    state.loading = false;

                    state.customerOrderTracking =
                        action.payload.tracking;
                }
            )

            .addCase(
                getCustomerOrderTracking.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );

        builder
            .addCase(
                cancelCustomerOrder.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                cancelCustomerOrder.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.success = true;

                    state.message =
                        action.payload.message;

                    const cancelledOrder =
                        action.payload.order;

                    state.customerOrders =
                        state.customerOrders.map(
                            (order) =>
                                order._id ===
                                    cancelledOrder._id
                                    ? {
                                        ...order,
                                        status:
                                            cancelledOrder.status,
                                    }
                                    : order
                        );
                }
            )

            .addCase(
                cancelCustomerOrder.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    },
});


export const {
    clearOrderError,
    clearOrderSuccess,
    clearCreatedOrder,
    clearCustomerOrderTracking,
    clearOrderState,
} = orderSlice.actions;


export default orderSlice.reducer;