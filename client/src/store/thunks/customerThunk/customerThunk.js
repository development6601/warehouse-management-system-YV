import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getCustomerApi,
    getCustomerByIdApi,
    updateCustomerApi,
    disableCustomerApi
} from "../../../api/customer.api";



// GET ALL

export const fetchCustomer = createAsyncThunk(
    "customer/fetchCustomer",
    async (_, { rejectWithValue }) => {
        try {
            const response =
                await getCustomerApi();
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch suppliers"
            );
        }
    }
);



// GET ONE

export const getCustomerById = createAsyncThunk(
    "customer/getCustomerById",
    async (id, { rejectWithValue }) => {
        try {
            const response =
                await getCustomerByIdApi(id);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Supplier not found"
            );
        }
    }
);



// UPDATE

export const updateCustomer = createAsyncThunk(
    "customer/updateCustomer",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await updateCustomerApi(id, data);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Update failed"
            );
        }
    }
);



// DISABLE
export const disableCustomer = createAsyncThunk(
    "customer/disableCustomer",
    async (id, { rejectWithValue }) => {
        try {
            const response =
                await disableCustomerApi(id);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to disable supplier"
            );
        }
    }
);