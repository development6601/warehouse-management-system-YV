import {
    createAsyncThunk
} from "@reduxjs/toolkit";
import {

    getAdminProductsApi,
    createAdminProductApi,
    getAdminProductByIdApi,
    updateAdminProductApi,
    deleteAdminProductApi,
    getOutOfStockApi,
    getAdminStockHistoryApi

} from "../../../api/product.api";



export const getProducts = createAsyncThunk(
    "product/getAll",
    async (
        {
            page = 1,
            limit = 7,
            search = "",
            category = ""
        } = {},
        { rejectWithValue }
    ) => {
        try {
            const res = await getAdminProductsApi({
                page,
                limit,
                search,
                category
            });

            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch products"
            );
        }
    }
);



export const createProduct = createAsyncThunk(
    "product/create",
    async (data, { rejectWithValue }) => {
        try {
            const res =
                await createAdminProductApi(data);
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            );
        }
    });

export const deleteProduct = createAsyncThunk(
    "product/delete",
    async (id, { rejectWithValue }) => {
        try {
            const res =
                await deleteAdminProductApi(id);
            return {
                id,
                ...res.data
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            );
        }
    });

export const getProductById = createAsyncThunk(
    "product/getProductById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await getAdminProductByIdApi(id);
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);

export const updateProduct = createAsyncThunk(
    "product/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await updateAdminProductApi(id, data);
            return res.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);


export const getStockHistory = createAsyncThunk(
    "product/stockHistory",
    async (id, { rejectWithValue }) => {

        try {
            const response = await getAdminStockHistoryApi(id);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to load stock history"
            );
        }
    }
);