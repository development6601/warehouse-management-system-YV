import mongoose from "mongoose";
import Product from "../models/product.model.js";
import stockHistoryModel from "../models/stockHistory.model.js";
import { createStockHistoryService } from "./stockHistory.service.js";

// Get all products
export const getProductsService = async ({
    page = 1,
    limit = 7,
    search = "",
    category
}) => {

    const pageNumber = Math.max(Number(page), 1)
    const limitNumber = Math.min(Math.max(Number(limit), 1), 100)

    const skip = (pageNumber - 1) * limitNumber

    const filter = {}
    if (search?.trim()) {
        filter.$or = [
            {
                name: {
                    $regex: search.trim(),
                    $options: "i"
                }
            },
        ]
    }

    if (category) {
        if (!mongoose.Types.ObjectId.isValid(category)) {
            throw new Error("Invalid category ID");
        }

        filter.category = category;
    }

    const [products, total] = await Promise.all([
        Product.find(filter)
            .populate("category", "name")
            .populate("createdBy", "firstName lastName email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNumber),

        Product.countDocuments(filter)
    ]);


    return {
        products,
        pagination: {
            page: pageNumber,
            limit: limitNumber,
            total,
            totalPages: Math.ceil(
                total / limitNumber
            )
        }
    };

};

// get all producat by catagories
export const getProductsByCategoryService = async (categoryId) => {
    return await Product.find({
        category: categoryId,
    })
        .populate("category", "name slug")
        .sort({ createdAt: -1 });
};

// Create product
export const createProductService = async (data, userId, userRole) => {
    const product = await Product.create({
        ...data,
        createdBy: userId,
        creatorRole: userRole,
    });
    return product;
};


// Get single product
export const getProductByIdService = async (id) => {
    const product = await Product.findById(id)
        .populate("category", "name slug")
        .populate("createdBy", "firstName lastName email");

    if (!product) {
        throw new Error(
            "Product not found"
        );
    }
    return product;
};

// Update product
export const updateProductService = async (id, data, userId) => {
    const product = await Product.findById(id);

    if (!product) {
        throw new Error(
            "Product not found"
        );
    }

    const oldQuantity = product.quantity;
    const newQuantity = Number(data.quantity);
    product.name = data.name;
    product.price = data.price;
    product.quantity = newQuantity;

    await product.save();
    // create history only quantity changes
    if (oldQuantity !== newQuantity) {

        await createStockHistoryService({
            product: product._id,

            previousQuantity: oldQuantity,

            newQuantity: newQuantity,

            change: newQuantity - oldQuantity,

            type: newQuantity > oldQuantity
                ?
                "STOCK_IN"
                :
                "STOCK_OUT",
            updatedBy: userId
        });
    }

    return product;
};


// Delete product
export const deleteProductService = async (id) => {

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        throw new Error(
            "Product not found"
        );
    }
    return {
        message:
            "Product deleted successfully"
    };
};

// Out of stock
export const getOutOfStockService = async () => {
    return await Product.find({
        quantity: 0
    });
};




