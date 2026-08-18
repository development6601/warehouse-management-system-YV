import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getSuppliersApi,
    getSupplierByIdApi,
    updateSupplierApi,
    disableSupplierApi
} from "../../../api/supplier.api";



// GET ALL

export const fetchSuppliers = createAsyncThunk(
    "supplier/fetchSuppliers",
    async (_, { rejectWithValue }) => {
        try {
            const response =
                await getSuppliersApi();
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

export const getSupplierById = createAsyncThunk(
    "supplier/getSupplierById",
    async (id, { rejectWithValue }) => {
        try {
            const response =
                await getSupplierByIdApi(id);
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

export const updateSupplier = createAsyncThunk(
    "supplier/updateSupplier",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await updateSupplierApi(id, data);
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
export const disableSupplier = createAsyncThunk(
    "supplier/disableSupplier",
    async (id, { rejectWithValue }) => {
        try {
            const response =
                await disableSupplierApi(id);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to disable supplier"
            );
        }
    }
);