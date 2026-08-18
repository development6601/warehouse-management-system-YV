import api from "./axios";


export const getCategoriesApi = ({
    search = ""
} = {}) => {
    return api.get(
        "/admin/categories", {
        params: {
            search
        }
    });
};


export const createCategoryApi = (data) => {
    return api.post(
        "/admin/categories/create",
        data
    );
};


export const getCategoryByIdApi = (id) => {
    return api.get(
        `/admin/categories/${id}`
    );
};


export const updateCategoryApi = (id, data) => {
    return api.put(
        `/admin/categories/${id}/edit`,
        data
    );

};


export const deleteCategoryApi = (id) => {
    return api.delete(
        `/admin/categories/${id}/delete`
    );

};

export const updateCategoryStatusApi = (id) => {
    return api.patch(
        `/admin/categories/${id}/status`
    );

};



/* ============================
   SUPPLIER Category APIs
============================ */

export const getSupplierCategoriesApi = (
    {
        search = ""
    } = {}
) => {
    return api.get(
        "/supplier/categories", {
        params: {
            search
        }
    }
    );
}


export const getSupplierCategoryByIdApi = (id) => {
    return api.get(
        `/supplier/categories/${id}`
    );
};

// CUSTOMER 
export const getCustomerCategoriesApi = ({
    search = ""
} = {}) => {
    return api.get(
        "/customer/categories", {
        params: {
            search
        }
    }
    );
}