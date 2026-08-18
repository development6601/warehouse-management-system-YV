import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    createOrderApi,
    getCustomerOrdersApi,
    getCustomerOrderTrackingApi,
    cancelCustomerOrderApi,
} from "../../../api/order.api";


export const createOrder = createAsyncThunk(
    "order/createOrder",
    async (items, { rejectWithValue }) => {
        try {
            const response = await createOrderApi(items);

            console.log("CREATE ORDER RESPONSE:", response.data);

            return response.data;
        } catch (error) {
            console.log(
                "CREATE ORDER ERROR:",
                error.response?.data
            );

            console.log(
                "CREATE ORDER STATUS:",
                error.response?.status
            );

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to create order"
            );
        }
    }
);


export const getCustomerOrders = createAsyncThunk(
    "order/getCustomerOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getCustomerOrdersApi();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to get customer orders"
            );
        }
    }
);


export const getCustomerOrderTracking = createAsyncThunk(
    "order/getCustomerOrderTracking",
    async (id, { rejectWithValue }) => {
        try {
            const response =
                await getCustomerOrderTrackingApi(id);

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to get order tracking"
            );
        }
    }
);


export const cancelCustomerOrder = createAsyncThunk(
    "order/cancelCustomerOrder",
    async (id, { rejectWithValue }) => {
        try {
            const response =
                await cancelCustomerOrderApi(id);

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to cancel order"
            );
        }
    }
);



