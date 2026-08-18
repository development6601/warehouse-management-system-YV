import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getCustomerProductsApi,
    getCustomerProductByIdApi,
    getCustomerProductsByCategoryApi,
    searchCustomerProductsApi
} from "../../../api/product.api";


// Get All Products
export const getCustomerProducts = createAsyncThunk(
    "customerProduct/getAll",
    async ({
        page = 1,
        limit = 7,
        search = "",
        category = ""
    } = {}, { rejectWithValue }) => {
        try {
            const response = await getCustomerProductsApi({
                page,
                limit,
                search,
                category
            });
            
            return response.data;
        } catch (error) {
            console.log("CUSTOMER API ERROR:", error.response?.data || error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch products"
            );
        }
    }
);


// Get Single Product
export const getCustomerProductById = createAsyncThunk(
    "customerProduct/getOne",
    async (id, { rejectWithValue }) => {
        try {
            const response =
                await getCustomerProductByIdApi(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch product"
            );
        }
    }
);


// Products By Category
export const getCustomerProductsByCategory =
    createAsyncThunk(
        "customerProduct/category",
        async (categoryId, { rejectWithValue }) => {
            try {
                const response =
                    await getCustomerProductsByCategoryApi(
                        categoryId
                    );
                return response.data;
            } catch (error) {
                return rejectWithValue(
                    error.response?.data?.message ||
                    "Failed to load category products"
                );
            }
        }
    );


// Search Products
export const searchCustomerProducts =
    createAsyncThunk(
        "customerProduct/search",
        async (keyword, { rejectWithValue }) => {
            try {
                const response = await searchCustomerProductsApi(
                    keyword
                );
                return response.data;
            } catch (error) {
                return rejectWithValue(
                    error.response?.data?.message ||
                    "Search failed"
                );
            }
        }
    );