import { createSlice } from "@reduxjs/toolkit";
import { fetchCustomerCategories } from "../../thunks/customerThunk/customerCategorythunk";

const initialState = {
    categories: [],
    selectedCategory: null,
    loading: false,
    error: null,
    success: false,
};

const customerCategorySlice = createSlice({
    name: "customerCategory",
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
                fetchCustomerCategories.pending,
                (state) => {
                    state.loading = true;
                }
            )

            .addCase(
                fetchCustomerCategories.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.error = null;
                    state.categories = action.payload.data || [];
                    
                }
            )



            .addCase(
                fetchCustomerCategories.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )
    }
})

export const {
    clearCategoryError,
    clearSelectedCategory,
    clearCategorySuccess

} = customerCategorySlice.actions;



export default customerCategorySlice.reducer;