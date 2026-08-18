import axios from "./axios";

/* ============================
   ADMIN PRODUCT APIs
============================ */

export const getAdminProductsApi = ({
    page = 1,
    limit = 7,
    search = "",
    category = ""
} = {}) => {
    return axios.get("/admin/products", {
        params: {
            page,
            limit,
            search,
            category
        }
    });
};


export const createAdminProductApi = (data) => {
    return axios.post("/admin/products/create", data);
};

export const getAdminProductByIdApi = (id) => {
    return axios.get(`/admin/products/${id}`);
};

export const updateAdminProductApi = (id, data) => {
    return axios.put(`/admin/products/${id}/edit`, data);
};

export const deleteAdminProductApi = (id) => {
    return axios.delete(`/admin/products/${id}/delete`);
};

export const getOutOfStockApi = () => {
    return axios.get("/admin/products/out-of-stock");
};

export const getAdminStockHistoryApi = (id) => {
    return axios.get(`/admin/products/${id}/stock-history`);
};


/* ============================
   SUPPLIER PRODUCT APIs
============================ */

export const getSupplierProductsApi = (
    {
        page = 1,
        limit = 7,
        search = "",
        category = ""
    } = {}
) => {
    return axios.get("/supplier/products", {
        params: {
            page,
            limit,
            search,
            category
        }
    });
};

export const createSupplierProductApi = (data) => {
    return axios.post("/supplier/products/create", data);
};

export const getSupplierProductByIdApi = (id) => {
    return axios.get(`/supplier/products/${id}`);
};

export const updateSupplierProductApi = (id, data) => {
    return axios.put(`/supplier/products/${id}`, data);
};

export const deleteSupplierProductApi = (id) => {
    return axios.delete(`/supplier/products${id}`);
};

export const updateSupplierStockApi = (id, data) => {
    return axios.patch(
        `/supplier/products/${id}/update-stock`,
        data
    );
};

export const getSupplierProductsByCategoryApi = (categoryId) => {
    return axios.get(
        `/supplier/products/categories/${categoryId}`
    );
};

export const getSupplierStockHistoryApi = (id) => {
    return axios.get(
        `/supplier/products/${id}/stock-history`
    );
};


/* ============================
   CUSTOMER PRODUCT APIs
============================ */

export const getCustomerProductsApi = (
    {
        page = 1,
        limit = 7,
        search = "",
        category = ""
    } = {}
) => {
    return axios.get("/customer/products", {
        params: {
            page,
            limit,
            search,
            category
        }
    });
};

export const getCustomerProductByIdApi = (id) => {
    return axios.get(`/customer/products/${id}`);
};

export const getCustomerProductsByCategoryApi = (categoryId) => {
    return axios.get(
        `/customer/products/category/${categoryId}`
    );
};

export const searchCustomerProductsApi = (keyword) => {
    return axios.get(
        `/customer/products/search?keyword=${keyword}`
    );
};