import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getSupplierProductsApi,
    createSupplierProductApi,
    getSupplierProductByIdApi,
    updateSupplierProductApi,
    deleteSupplierProductApi,
    updateSupplierStockApi,
    getSupplierProductsByCategoryApi,
    getSupplierStockHistoryApi
} from "../../../api/product.api";

// Get Supplier Products
export const getSupplierProducts = createAsyncThunk(
    "supplierProduct/getAll",
    async ({
        page = 1,
        limit = 7,
        search = "",
        category = ""
    } = {}, { rejectWithValue }) => {
        try {
            const response = await getSupplierProductsApi({
                page,
                limit,
                search,
                category
            });
            return response.data;
        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch products"
            );
        }
    }
);

// Create Product
export const createSupplierProduct = createAsyncThunk(
    "supplierProduct/create",
    async (data, { rejectWithValue }) => {
        try {
            const response = await createSupplierProductApi(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create product"
            );
        }
    }
);

// Get Single Product
export const getSupplierProductById = createAsyncThunk(
    "supplierProduct/getOne",
    async (id, { rejectWithValue }) => {
        try {
            const response = await getSupplierProductByIdApi(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch product"
            );
        }
    }
);

// Update Product
export const updateSupplierProduct = createAsyncThunk(
    "supplierProduct/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await updateSupplierProductApi(id, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update product"
            );
        }
    }
);

// Delete Product
export const deleteSupplierProduct = createAsyncThunk(
    "supplierProduct/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await deleteSupplierProductApi(id);

            return {
                id,
                ...response.data
            };

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete product"
            );
        }
    }
);

// Update Stock
export const updateSupplierStock = createAsyncThunk(
    "supplierProduct/updateStock",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await updateSupplierStockApi(id, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update stock"
            );
        }
    }
);

// Products By Category
export const getSupplierProductsByCategory = createAsyncThunk(
    "supplierProduct/category",
    async (categoryId, { rejectWithValue }) => {
        try {
            const response = await getSupplierProductsByCategoryApi(categoryId);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to load category products"
            );
        }
    }
);

// Stock History
export const getSupplierStockHistory = createAsyncThunk(
    "supplierProduct/stockHistory",
    async (id, { rejectWithValue }) => {
        try {
            const response = await getSupplierStockHistoryApi(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to load stock history"
            );
        }
    }
);