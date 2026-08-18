import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import User from "../models/User.js";

export const getAdminDashboardService = async () => {
    const [
        totalProducts,
        totalCustomers,
        totalSuppliers,
        totalOrders,
        pendingOrders,
        completedOrders,
        lowStockProducts,
        recentOrders,
    ] = await Promise.all([
        Product.countDocuments(),

        User.countDocuments({
            role: "CUSTOMER",
        }),

        User.countDocuments({
            role: "SUPPLIER",
        }),

        Order.countDocuments(),

        Order.countDocuments({
            status: "pending",
        }),

        Order.countDocuments({
            status: "delivered",
        }),

        Product.find({
            stock: {
                $lte: 10,
            },
        })
            .sort({ stock: 1 })
            .limit(10)
            .lean(),

        Order.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate("customer", "firstName lastName email")
            .lean(),
    ]);

    return {
        stats: {
            totalProducts,
            totalCustomers,
            totalSuppliers,
            totalOrders,
            pendingOrders,
            completedOrders,
        },

        inventory: {
            lowStockCount: lowStockProducts.length,
            lowStockProducts,
        },

        recentOrders,
    };
};

export const getSupplierDashboardService = async (supplierId) => {
    const [
        totalProducts,
        pendingOrders,
        completedOrders,
        recentOrders,
    ] = await Promise.all([
        Product.countDocuments({
            creatorRole: "SUPPLIER",
        }),

        Order.countDocuments({
            creatorRole: "SUPPLIER",
            status: "pending",
        }),

        Order.countDocuments({
            creatorRole: "SUPPLIER",
            status: "delivered",
        }),

        Order.find({
            creatorRole: "SUPPLIER",
        })
            .sort({ createdAt: -1 })
            .limit(10)
            .lean(),
    ]);

    return {
        stats: {
            totalProducts,
            pendingOrders,
            completedOrders,
        },

        recentOrders,
    };
};

export const getCustomerDashboardService = async (customerId) => {
    const [
        totalOrders,
        pendingOrders,
        completedOrders,
        cancelledOrders,
        recentOrders,
    ] = await Promise.all([
        Order.countDocuments({
            customer: customerId,
        }),

        Order.countDocuments({
            customer: customerId,
            status: "pending",
        }),

        Order.countDocuments({
            customer: customerId,
            status: "delivered",
        }),

        Order.countDocuments({
            customer: customerId,
            status: "cancelled",
        }),

        Order.find({
            customer: customerId,
        })
            .sort({ createdAt: -1 })
            .limit(10)
            .lean(),
    ]);

    return {
        stats: {
            totalOrders,
            pendingOrders,
            completedOrders,
            cancelledOrders,
        },

        recentOrders,
    };
};