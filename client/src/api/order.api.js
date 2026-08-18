import axios from "./axios";


export const createOrderApi = (items) => {
    return axios.post("/customer/order/create", {
        items,
    });
};

export const getCustomerOrdersApi = () => {
    return axios.get("/customer/order/my-orders");
};

export const getCustomerOrderTrackingApi = (id) => {
    return axios.get(
        `/customer/order/${id}/tracking`
    );
};

export const cancelCustomerOrderApi = (id) => {
    return axios.patch(
        `/customer/order/${id}/cancel`
    );
};



export const getAdminOrdersApi = (status) => {
    if (status) {
        return axios.get(
            `/admin/orders?status=${status}`
        );
    }
    return axios.get("/admin/orders");
};


export const getAdminOrderByIdApi = (id) => {
    return axios.get(`/admin/order/${id}`);
};


export const updateAdminOrderStatusApi = (orderId, status) => {
    return axios.patch(
        `/admin/orders/${orderId}/status`,
        {
            status,
        }
    );
};


export const cancelAdminOrderApi = (orderId) => {
    return axios.patch(
        `/admin/orders/${orderId}/cancel`
    );
};

export const editAdminOrderApi = (orderId, data) => {
    return axios.patch(
        `/admin/orders/${orderId}/edit`,
        data
    );
};


export const getSupplierOrdersApi = () => {
    return axios.get("/supplier/order");
};

export const getSupplierOrderByIdApi = (id) => {
    return axios.get(`/supplier/order/${id}`);
};