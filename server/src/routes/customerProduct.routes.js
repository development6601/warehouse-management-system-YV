import express from "express";
import { createProduct, getProductById, getProducts, getProductsByCategory, updateProduct } from "../controllers/product.controller.js";
import { getProductStockHistory } from "../controllers/stockHistory.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { getCustomerDashboard } from "../controllers/dashboard.controller.js";
import { getAllCategories } from "../controllers/category.controller.js"

const router = express.Router();

router.use(
    authMiddleware,
    roleMiddleware("CUSTOMER")
);

router.get(
    "/dashboard",
    getCustomerDashboard
)

router.get(
    "/category/:id/products",
    getProductsByCategory
);

router.get(
    "/products/:id",
    getProductById
);

router.get(
    "/products",
    getProducts
);

router.get(
    "/categories",
    getAllCategories
);



export default router;