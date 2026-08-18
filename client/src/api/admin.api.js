import api from "./axios";


export const getAdminDashboardApi = () => {
    return api.get(
        "/admin/dashboard"
    );
};