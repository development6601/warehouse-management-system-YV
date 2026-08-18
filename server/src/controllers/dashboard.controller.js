import { getAdminDashboardService, getCustomerDashboardService, getSupplierDashboardService } from "../services/dashboard.service.js";

export const getAdminDashboard = async (req, res) => {
    try {
        const dashboard =
            await getAdminDashboardService();

        return res.status(200).json({
            success: true,
            message: "Admin dashboard fetched successfully",
            data: dashboard,
        });
    } catch (error) {
        console.error(
            "Admin dashboard error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch admin dashboard",
        });
    }
};

export const getSupplierDashboard = async (req, res) => {
    try {
        const supplierId = req.user._id;
        const dashboard = await getSupplierDashboardService(supplierId);
        return res.status(200).json({
            success: true,
            message: "Supplier dashboard fetched successfully",
            data: dashboard,
        });
    } catch (error) {
        console.error("Supplier dashboard error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch supplier dashboard",
        });
    }
};

export const getCustomerDashboard = async (req, res) => {
    try {
        const customerId = req.user._id;
        const dashboard = await getCustomerDashboardService(customerId);
        return res.status(200).json({
            success: true,
            message: "Customer dashboard fetched successfully",
            data: dashboard,
        });
    } catch (error) {
        console.error("Customer dashboard error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch customer dashboard",
        });
    }
};