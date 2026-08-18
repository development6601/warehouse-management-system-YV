import {

    getProductsService,
    getProductsByCategoryService,
    createProductService,
    getProductByIdService,
    updateProductService,
    deleteProductService,
    getOutOfStockService,

} from "../services/product.service.js";
import User from "../models/User.js";




// GET ALL
export const getProducts = async (req, res) => {
    try {
        const {
            page,
            limit,
            search,
            category
        } = req.query;

        const result = await getProductsService({
                page,
                limit,
                search,
                category
            });
        res.json({
            success: true,
            ...result
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// get by catagory 
export const getProductsByCategory = async (req, res) => {
    try {
        const products = await getProductsByCategoryService(req.params.id);
        res.json({
            success: true,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// CREATE
export const createProduct =
    async (req, res) => {

        try {
            const product = await createProductService(
                req.body,
                req.user._id,
                req.user.role
            );

            res.status(201).json({
                success: true,
                data: product
            });
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    };


// GET BY ID
export const getProductById = async (req, res) => {

    try {
        const product =
            await getProductByIdService(
                req.params.id
            );
        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};


// UPDATE
export const updateProduct = async (req, res) => {
    try {

        const product = await updateProductService(
            req.params.id,
            req.body,
            req.user._id
        );
        console.log("USER ID:", req.user._id);
        res.json({
            success: true,
            data: product
        });

    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }

};


// DELETE
export const deleteProduct = async (req, res) => {

    try {

        const result = await deleteProductService(
            req.params.id
        );

        res.json({
            success: true,
            ...result
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


// OUT OF STOCK
export const outOfStock = async (req, res) => {

    const products = await getOutOfStockService();

    res.json({
        success: true,
        data: products
    });

};

//product history
export const getStockHistory = async (req, res) => {
    try {
        const history =
            await getStockHistoryService(
                req.params.id
            );
        res.status(200).json({
            success: true,
            data: history
        });

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};