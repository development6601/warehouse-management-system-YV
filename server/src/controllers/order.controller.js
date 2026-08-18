import {
    cancelOrderService,
    createOrderService,
    customerCancelOrderService,
    editOrderService,
    getAdminOrderByIdService,
    getAllOrdersService,
    getCustomerOrdersService,
    getCustomerOrderTrackingService,
    getSupplierOrderByIdService,
    getSupplierOrdersService,
    updateOrderStatusService
} from "../services/order.service.js";

export const createOrder = async (req, res) => {
    try {
        const customerId = req.user._id;
        const { items } = req.body;

        const order = await createOrderService(customerId, items);

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order,
        });
    } catch (error) {
        console.error("Create order error:", error);

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getCustomerOrders = async (req, res) => {
    try {
        const customerId = req.user._id;
        const orders = await getCustomerOrdersService(customerId);
        return res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error("Get customer orders error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getSupplierOrders = async (req, res) => {
    try {
        const supplierId = req.user._id;
        const orders = await getSupplierOrdersService(
            supplierId
        );
        return res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error("Get supplier orders error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const { status } = req.query;
        const orders = await getAllOrdersService(status);

        return res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error("Get all orders error:", error);

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required",
            });
        }

        const order = await updateOrderStatusService(
            orderId,
            status
        );

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order,
        });
    } catch (error) {
        console.error("Update order status error:", error);

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await cancelOrderService(orderId);

        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            order,
        });
    } catch (error) {
        console.error("Cancel order error:", error);

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getCustomerOrderTracking = async (req, res) => {
    try {
        const { id } = req.params;
        const customerId = req.user._id;
        const tracking = await getCustomerOrderTrackingService(
            id,
            customerId
        );
        return res.status(200).json({
            success: true,
            tracking,
        });
    } catch (error) {
        console.error(
            "Get customer order tracking error:",
            error
        );
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const cancelCustomerOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const customerId = req.user._id;

        const order = await customerCancelOrderService(
            id,
            customerId
        );

        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            order,
        });
    } catch (error) {
        console.error(
            "Cancel customer order error:",
            error
        );

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getSupplierOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const supplierId = req.user._id;

        const order = await getSupplierOrderByIdService(
            id,
            supplierId
        );

        return res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error(
            "Get supplier order error:",
            error
        );

        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAdminOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await getAdminOrderByIdService(id);

        return res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error(
            "Get admin order error:",
            error
        );

        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const editAdminOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await editOrderService(
            id,
            req.body
        );
        return res.status(200).json({
            success: true,
            message: "Order updated successfully",
            order,
        });
    } catch (error) {
        console.error(
            "Edit admin order error:",
            error
        );

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
