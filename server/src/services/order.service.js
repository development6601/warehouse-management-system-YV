import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import mongoose from "mongoose";

export const createOrderService = async (customerId, items) => {

    if (!items || !Array.isArray(items) || items.length === 0) {
        throw new Error("Order must contain at least one product");
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
        if (!item.product || !item.quantity) {
            throw new Error("Product and quantity are required");
        }

        if (item.quantity < 1) {
            throw new Error("Quantity must be at least 1");
        }

        const product = await Product.findOne({
            _id: item.product,
            isActive: true,
        });

        if (!product) {
            throw new Error(`Product not found: ${item.product}`);
        }

        if (product.quantity < item.quantity) {
            throw new Error(
                `Insufficient quantity for product: ${product.name}. Available: ${product.quantity}`
            );
        }

        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;

        orderItems.push({
            product: product._id,
            quantity: item.quantity,
            price: product.price,
        });

        product.quantity -= item.quantity;
        await product.save();
    }

    const order = await Order.create({
        customer: customerId,
        items: orderItems,
        totalAmount,
        status: "pending",
    });

    return order;
};

export const getCustomerOrdersService = async (customerId) => {
    const orders = await Order.find({
        customer: customerId,
    })
        .populate({
            path: "items.product",
            select: "name sku price image",
            populate: {
                path: "category",
                select: "name slug",
            },
        })
        .sort({ createdAt: -1 });

    return orders;
};

export const getSupplierOrdersService = async (supplierId) => {
    const orders = await Order.aggregate([
        // Break each order into individual items
        {
            $unwind: "$items",
        },

        // Get the product belonging to the order item
        {
            $lookup: {
                from: "products",
                localField: "items.product",
                foreignField: "_id",
                as: "product",
            },
        },

        {
            $unwind: "$product",
        },

        // Only products created by this supplier
        {
            $match: {
                "product.createdBy": supplierId,
                "product.creatorRole": "SUPPLIER",
            },
        },

        // Get customer information
        {
            $lookup: {
                from: "users",
                localField: "customer",
                foreignField: "_id",
                as: "customer",
            },
        },
        {
            $unwind: "$customer",
        },
        // Select the fields we want to return
        {
            $project: {
                _id: 1,
                status: 1,
                createdAt: 1,
                customer: {
                    _id: "$customer._id",
                    firstName: "$customer.firstName",
                    lastName: "$customer.lastName",
                    email: "$customer.email",
                },
                product: {
                    _id: "$product._id",
                    name: "$product.name",
                    sku: "$product.sku",
                    price: "$items.price",
                    image: "$product.image",
                },
                quantity: "$items.quantity",
                itemTotal: {
                    $multiply: [
                        "$items.price",
                        "$items.quantity",
                    ],
                },
            },
        },
        // Latest orders first
        {
            $sort: {
                createdAt: -1,
            },
        },
    ]);

    return orders;
};

export const getAllOrdersService = async (status) => {
    const allowedStatuses = [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
    ];

    if (status && !allowedStatuses.includes(status)) {
        throw new Error("Invalid order status");
    }

    const pipeline = [];

    if (status) {
        pipeline.push({
            $match: {
                status,
            },
        });
    }

    pipeline.push(
        {
            $unwind: "$items",
        },

        {
            $lookup: {
                from: "products",
                localField: "items.product",
                foreignField: "_id",
                as: "product",
            },
        },

        {
            $unwind: "$product",
        },

        {
            $lookup: {
                from: "users",
                localField: "customer",
                foreignField: "_id",
                as: "customer",
            },
        },

        {
            $unwind: "$customer",
        },

        {
            $lookup: {
                from: "users",
                localField: "product.createdBy",
                foreignField: "_id",
                as: "creator",
            },
        },

        {
            $unwind: "$creator",
        },

        {
            $project: {
                _id: 1,
                status: 1,
                createdAt: 1,
                updatedAt: 1,

                customer: {
                    _id: "$customer._id",
                    firstName: "$customer.firstName",
                    lastName: "$customer.lastName",
                    email: "$customer.email",
                },

                product: {
                    _id: "$product._id",
                    name: "$product.name",
                    sku: "$product.sku",
                    price: "$items.price",
                    image: "$product.image",
                },

                productCreator: {
                    _id: "$creator._id",
                    firstName: "$creator.firstName",
                    lastName: "$creator.lastName",
                    email: "$creator.email",
                    role: "$product.creatorRole",
                },

                quantity: "$items.quantity",

                itemTotal: {
                    $multiply: [
                        "$items.price",
                        "$items.quantity",
                    ],
                },
            },
        },

        {
            $sort: {
                createdAt: -1,
            },
        }
    );

    const orders = await Order.aggregate(pipeline);
    return orders;
};

export const updateOrderStatusService = async (orderId, status) => {
    const allowedStatuses = [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
        throw new Error("Invalid order status");
    }

    const order = await Order.findById(orderId);

    if (!order) {
        throw new Error("Order not found");
    }

    // Do not allow changing a completed/cancelled order
    if (
        order.status === "delivered" ||
        order.status === "cancelled"
    ) {
        throw new Error(
            `Cannot update order with status: ${order.status}`
        );
    }

    order.status = status;
    await order.save();
    return order;
};

export const cancelOrderService = async (orderId) => {
    const order = await Order.findById(orderId);

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.status === "cancelled") {
        throw new Error("Order is already cancelled");
    }

    if (
        order.status === "shipped" ||
        order.status === "delivered"
    ) {
        throw new Error(
            `Cannot cancel order with status: ${order.status}`
        );
    }

    // Restore product quantities
    for (const item of order.items) {
        const product = await Product.findById(item.product);

        if (!product) {
            throw new Error(
                `Product not found: ${item.product}`
            );
        }

        product.quantity += item.quantity;

        await product.save();
    }

    // Change order status
    order.status = "cancelled";
    await order.save();

    return order;
};

export const getCustomerOrderTrackingService = async (orderId, customerId) => {
    const order = await Order.findOne({
        _id: orderId,
        customer: customerId,
    })
        .populate({
            path: "items.product",
            select: "name sku image",
        })
        .populate({
            path: "customer",
            select: "firstName lastName email",
        });

    if (!order) {
        throw new Error(
            "Order not found or you are not authorized to view this order"
        );
    }

    return {
        orderId: order._id,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,

        customer: {
            id: order.customer._id,
            firstName: order.customer.firstName,
            lastName: order.customer.lastName,
            email: order.customer.email,
        },
        items: order.items,
        totalAmount: order.totalAmount,
    };
};

export const customerCancelOrderService = async (orderId, customerId) => {
    const order = await Order.findOne({
        _id: orderId,
        customer: customerId,
    });

    if (!order) {
        throw new Error(
            "Order not found or you are not authorized to cancel this order"
        );
    }

    if (order.status === "cancelled") {
        throw new Error("Order is already cancelled");
    }

    if (
        order.status === "shipped" ||
        order.status === "delivered"
    ) {
        throw new Error(
            `Cannot cancel order with status: ${order.status}`
        );
    }

    // Restore inventory here for now.
    // Transaction will be added in Step 18.

    for (const item of order.items) {
        const product = await Product.findById(item.product);

        if (!product) {
            throw new Error(
                `Product not found: ${item.product}`
            );
        }

        product.quantity += item.quantity;
        await product.save();
    }

    order.status = "cancelled";
    await order.save();
    return order;
};

export const getSupplierOrderByIdService = async (orderId, supplierId) => {
    const orders = await Order.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(orderId),
            },
        },

        {
            $unwind: "$items",
        },

        {
            $lookup: {
                from: "products",
                localField: "items.product",
                foreignField: "_id",
                as: "product",
            },
        },

        {
            $unwind: "$product",
        },

        {
            $match: {
                "product.createdBy":
                    new mongoose.Types.ObjectId(supplierId),

                "product.creatorRole": "SUPPLIER",
            },
        },

        {
            $lookup: {
                from: "users",
                localField: "customer",
                foreignField: "_id",
                as: "customer",
            },
        },

        {
            $unwind: "$customer",
        },

        {
            $group: {
                _id: "$_id",

                status: {
                    $first: "$status",
                },

                createdAt: {
                    $first: "$createdAt",
                },

                updatedAt: {
                    $first: "$updatedAt",
                },

                customer: {
                    $first: {
                        _id: "$customer._id",
                        firstName: "$customer.firstName",
                        lastName: "$customer.lastName",
                        email: "$customer.email",
                    },
                },

                items: {
                    $push: {
                        product: {
                            _id: "$product._id",
                            name: "$product.name",
                            sku: "$product.sku",
                            price: "$items.price",
                            image: "$product.image",
                        },

                        quantity: "$items.quantity",

                        itemTotal: {
                            $multiply: [
                                "$items.price",
                                "$items.quantity",
                            ],
                        },
                    },
                },
            },
        },
    ]);

    if (orders.length === 0) {
        throw new Error(
            "Order not found or you are not authorized to view this order"
        );
    }

    return orders[0];
};

export const getAdminOrderByIdService = async (orderId) => {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        throw new Error("Invalid order ID");
    }

    const orders = await Order.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(orderId),
            },
        },
        {
            $unwind: "$items",
        },

        {
            $lookup: {
                from: "products",
                localField: "items.product",
                foreignField: "_id",
                as: "product",
            },
        },

        {
            $unwind: "$product",
        },

        {
            $lookup: {
                from: "users",
                localField: "customer",
                foreignField: "_id",
                as: "customer",
            },
        },

        {
            $unwind: "$customer",
        },

        {
            $lookup: {
                from: "users",
                localField: "product.createdBy",
                foreignField: "_id",
                as: "supplier",
            },
        },

        {
            $unwind: "$supplier",
        },

        {
            $group: {
                _id: "$_id",

                status: {
                    $first: "$status",
                },

                createdAt: {
                    $first: "$createdAt",
                },

                updatedAt: {
                    $first: "$updatedAt",
                },

                totalAmount: {
                    $first: "$totalAmount",
                },

                customer: {
                    $first: {
                        _id: "$customer._id",
                        firstName: "$customer.firstName",
                        lastName: "$customer.lastName",
                        email: "$customer.email",
                    },
                },

                items: {
                    $push: {
                        product: {
                            _id: "$product._id",
                            name: "$product.name",
                            sku: "$product.sku",
                            image: "$product.image",
                        },

                        quantity: "$items.quantity",

                        price: "$items.price",

                        itemTotal: {
                            $multiply: [
                                "$items.price",
                                "$items.quantity",
                            ],
                        },

                        supplier: {
                            _id: "$supplier._id",
                            firstName: "$supplier.firstName",
                            lastName: "$supplier.lastName",
                            email: "$supplier.email",
                        },
                    },
                },
            },
        },
    ]);

    if (orders.length === 0) {
        throw new Error("Order not found");
    }

    return orders[0];
};

export const editOrderService = async (orderId, updates) => {
    const allowedStatuses = [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
    ];

    const order = await Order.findById(orderId);

    if (!order) {
        throw new Error("Order not found");
    }

    const { status, items } = updates;

    // --------------------------------
    // STATUS UPDATE
    // --------------------------------

    if (status !== undefined) {
        if (!allowedStatuses.includes(status)) {
            throw new Error("Invalid order status");
        }

        if (
            order.status === "delivered" ||
            order.status === "cancelled"
        ) {
            throw new Error(
                `Cannot edit order with status: ${order.status}`
            );
        }

        order.status = status;
    }

    // --------------------------------
    // QUANTITY UPDATE
    // --------------------------------

    if (items !== undefined) {
        if (!Array.isArray(items) || items.length === 0) {
            throw new Error(
                "Order must contain at least one item"
            );
        }

        for (const updatedItem of items) {
            if (
                !updatedItem.product ||
                updatedItem.quantity === undefined
            ) {
                throw new Error(
                    "Product and quantity are required"
                );
            }

            if (updatedItem.quantity < 1) {
                throw new Error(
                    "Quantity must be at least 1"
                );
            }

            const existingItem = order.items.find(
                (item) =>
                    item.product.toString() ===
                    updatedItem.product.toString()
            );

            if (!existingItem) {
                throw new Error(
                    `Product is not part of this order: ${updatedItem.product}`
                );
            }

            const oldQuantity = existingItem.quantity;
            const newQuantity = updatedItem.quantity;

            const difference =
                newQuantity - oldQuantity;

            // Quantity increased
            if (difference > 0) {
                const product = await Product.findOne({
                    _id: updatedItem.product,
                    isActive: true,
                });

                if (!product) {
                    throw new Error(
                        `Product not found: ${updatedItem.product}`
                    );
                }

                if (product.quantity < difference) {
                    throw new Error(
                        `Insufficient quantity for product: ${product.name}. Available: ${product.quantity}`
                    );
                }

                product.quantity -= difference;

                await product.save();
            }

            // Quantity decreased
            if (difference < 0) {
                const product = await Product.findById(
                    updatedItem.product
                );

                if (!product) {
                    throw new Error(
                        `Product not found: ${updatedItem.product}`
                    );
                }
                product.quantity += Math.abs(difference);
                await product.save();
            }

            existingItem.quantity = newQuantity;
        }

        // Recalculate total amount
        order.totalAmount = order.items.reduce(
            (total, item) => {
                return total + item.price * item.quantity;
            },
            0
        );
    }

    await order.save();

    return order;
};