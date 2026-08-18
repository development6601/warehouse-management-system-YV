import { createSlice } from "@reduxjs/toolkit";
import {
    fetchCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    changeCategoryStatus
} from "../../thunks/adminThunk/categoryThunk";


const initialState = {
    categories: [],
    selectedCategory: null,
    loading: false,
    error: null,
    success: false,
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        clearCategoryError: (state) => {
            state.error = null;
        },
        clearSelectedCategory: (state) => {
            state.selectedCategory = null;
        },
        clearCategorySuccess: (state) => {
            state.success = false;
        }
    },

    extraReducers: (builder) => {

        builder
            // GET ALL CATEGORIES
            .addCase(
                fetchCategories.pending,
                (state) => {
                    state.loading = true;
                }
            )

            .addCase(
                fetchCategories.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.error = null;

                    state.categories =
                        action.payload.data || [];
                }
            )



            .addCase(
                fetchCategories.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )

            // GET CATEGORY BY ID
            .addCase(
                getCategoryById.pending,
                (state) => {
                    state.loading = true;
                }
            )

            .addCase(
                getCategoryById.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.selectedCategory = action.payload;
                }
            )

            .addCase(
                getCategoryById.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )

            // CREATE CATEGORY
            .addCase(
                createCategory.pending,
                (state) => {
                    state.loading = true;
                }
            )

            .addCase(
                createCategory.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.success = true;
                    state.categories.unshift(
                        action.payload
                    );
                }
            )

            .addCase(
                createCategory.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )

            // UPDATE CATEGORY
            .addCase(
                updateCategory.pending,
                (state) => {
                    state.loading = true;
                }
            )

            .addCase(
                updateCategory.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.success = true;
                    const index =
                        state.categories.findIndex(
                            item =>
                                item._id === action.payload._id
                        );
                    if (index !== -1) {
                        state.categories[index] =
                            action.payload;
                    }
                }
            )

            .addCase(
                updateCategory.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )

            // DELETE CATEGORY
            .addCase(
                deleteCategory.pending,
                (state) => {
                    state.loading = true;
                }
            )

            .addCase(
                deleteCategory.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.success = true;
                    state.categories =
                        state.categories.filter(
                            item =>
                                item._id !== action.payload.id
                        );
                }
            )

            .addCase(
                deleteCategory.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )
            // CHANGE STATUS
            .addCase(
                changeCategoryStatus.fulfilled,
                (state, action) => {
                    const index =
                        state.categories.findIndex(
                            item =>
                                item._id === action.payload._id
                        );
                    if (index !== -1) {
                        state.categories[index] =
                            action.payload;
                    }
                }
            )
    }
});


export const {
    clearCategoryError,
    clearSelectedCategory,
    clearCategorySuccess

} = categorySlice.actions;



export default categorySlice.reducer;