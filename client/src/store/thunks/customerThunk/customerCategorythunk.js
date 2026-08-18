import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCustomerCategoriesApi } from "../../../api/category.api";

export const fetchCustomerCategories = createAsyncThunk(
    "category/fetchCustomerCategories",
    async ({
            search = ""
        } = {}, { rejectWithValue }) => {
        try {
            const response = await getCustomerCategoriesApi({search});
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch categories"
            );
        }
    }
);