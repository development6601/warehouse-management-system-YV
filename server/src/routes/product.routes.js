import express from "express";

import {

    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    outOfStock,
    getProductById,

} from "../controllers/product.controller.js";

import {
    authMiddleware
} from "../middleware/auth.middleware.js";

import {
    roleMiddleware
} from "../middleware/role.middleware.js";



const router = express.Router();

router.use(
    authMiddleware,
    roleMiddleware("ADMIN")
);

router.get(
    "/products",
    getProducts
);

router.post(
    "/products/create",
    createProduct
);

router.get(
    "/products/:id",
    getProductById
);

router.put(
    "/products/:id/edit",
    updateProduct
);

router.delete(
    "/products/:id/delete",
    deleteProduct
);

router.get(
    "/products/out-of-stock",
    outOfStock
);


export default router;