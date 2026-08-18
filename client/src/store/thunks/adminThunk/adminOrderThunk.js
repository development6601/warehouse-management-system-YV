import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAdminOrdersApi,
    getAdminOrderByIdApi,
    updateAdminOrderStatusApi,
    cancelAdminOrderApi,
    editAdminOrderApi,
} from "../../../api/order.api";


export const getAdminOrders = createAsyncThunk(
    "adminOrder/getAdminOrders",
    async (status, { rejectWithValue }) => {
        try {
            const response = await getAdminOrdersApi(status);
            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch orders"
            );
        }
    }
);



export const getAdminOrderById = createAsyncThunk(
    "adminOrder/getAdminOrderById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await getAdminOrderByIdApi(id);
            return response.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch order details"
            );
        }
    }
);


export const updateAdminOrderStatus = createAsyncThunk(
    "adminOrder/updateOrderStatus",
    async (
        { orderId, status },
        { rejectWithValue }
    ) => {
        try {
            const response = await updateAdminOrderStatusApi(orderId, status);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to update order status"
            );
        }
    }
);

export const cancelAdminOrder = createAsyncThunk(
    "adminOrder/cancelOrder",
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await cancelAdminOrderApi(orderId);
            return response.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to cancel order"
            );
        }
    }
);


export const editAdminOrder = createAsyncThunk(
    "adminOrder/editOrder",
    async (
        { orderId, data },
        { rejectWithValue }
    ) => {
        try {
            const response = await editAdminOrderApi(orderId, data);
            return response.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to edit order"
            );
        }
    }
);