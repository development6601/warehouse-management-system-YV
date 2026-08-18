import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getSupplierOrdersApi,
    getSupplierOrderByIdApi,
} from "../../../api/order.api";


// ==============================
// GET SUPPLIER ORDERS
// ==============================

export const getSupplierOrders = createAsyncThunk(
    "supplierOrder/getSupplierOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response =
                await getSupplierOrdersApi();

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch supplier orders"
            );
        }
    }
);


// ==============================
// GET SUPPLIER ORDER BY ID
// ==============================

export const getSupplierOrderById = createAsyncThunk(
    "supplierOrder/getSupplierOrderById",
    async (id, { rejectWithValue }) => {
        try {
            const response =
                await getSupplierOrderByIdApi(id);

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch order details"
            );
        }
    }
);