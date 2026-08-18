import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getCategoriesApi,
    getCategoryByIdApi,
    createCategoryApi,
    updateCategoryApi,
    deleteCategoryApi,
    updateCategoryStatusApi
} from "../../../api/category.api";


// GET ALL CATEGORIES
export const fetchCategories = createAsyncThunk(
    "category/getAll",
    async ( {
            search = ""
        } = {}, { rejectWithValue }) => {
        try {
            const response = await getCategoriesApi({search});
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch categories"
            );
        }
    }
);


// GET SINGLE CATEGORY
export const getCategoryById = createAsyncThunk(
    "category/getCategoryById",
    async (id, { rejectWithValue }) => {
        try {
            const response =
                await getCategoryByIdApi(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Category not found"
            );
        }
    }
);



// CREATE CATEGORY
export const createCategory = createAsyncThunk(
    "category/createCategory",
    async (data, { rejectWithValue }) => {
        try {
            const response = await createCategoryApi(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Category creation failed"
            );
        }
    }
);



// UPDATE CATEGORY
export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response =
                await updateCategoryApi(id, data);
            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Category update failed"
            );
        }
    }
);



// DELETE CATEGORY
export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (id, { rejectWithValue }) => {
        try {
            const response =
                await deleteCategoryApi(id);
            return {
                id,
                ...response.data
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Delete failed"
            );
        }
    }
);



// CHANGE STATUS
export const changeCategoryStatus = createAsyncThunk(
    "category/changeStatus",
    async (id, { rejectWithValue }) => {
        try {
            const response =
                await updateCategoryStatusApi(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Status update failed"
            );
        }
    }
);