import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getSupplierCategoriesApi,
    getSupplierCategoryByIdApi,
} from "../../../api/category.api"

export const fetchSupplierCategories = createAsyncThunk(
    "category/fetchSupplierCategories",
    async ({
            search = ""
        } = {}, { rejectWithValue }) => {
        try {
            const response = await getSupplierCategoriesApi({search});
             console.log(
                "SUPPLIER CATEGORY API RESPONSE:",
                response.data
            );
            return response.data;
        } catch (error) {
            console.log(
                "SUPPLIER CATEGORY API ERROR:",
                error.response?.data
            );
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch categories"
            );
        }
    }
);

export const getSupplierCategoryById = createAsyncThunk(
    "category/getSupplierCategoryById",
    async (id, { rejectWithValue }) => {
        try {
            const response =
                await getSupplierCategoryByIdApi(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Category not found"
            );
        }
    }
);


