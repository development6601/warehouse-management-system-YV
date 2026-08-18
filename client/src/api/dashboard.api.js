import axios from "./axios";


export const getAdminDashboardApi = () => {
    return axios.get("/admin/dashboard");
};

export const getSupplierDashboardApi = () => {
    return axios.get("/supplier/dashboard");
};

export const getCustomerDashboardApi = () => {
    return axios.get("/customer/dashboard");
};
